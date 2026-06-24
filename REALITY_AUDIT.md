# Vibe Right Now Reality Audit

Audit date: 2026-06-24

## 1. Feature Inventory

| Feature / Screen | Current Data Source | Real or Mock? | Persistence? | Auth Required? | Backend Needed? | Risk | Recommended Fix |
|---|---|---:|---:|---:|---:|---|---|
| Landing (`/`) | Static marketing copy | REAL | N/A | No | No | Low | Keep static, update copy when product readiness changes. |
| Home feed (`/home`) | `postsRepo.getFeed()` -> Supabase `posts`, previously auto-fell back to `src/mock/posts` by default | PARTIAL | Yes when Supabase configured | No for reading | Yes | High | Make production mode real-data-only by default, add explicit loading/error/empty states and retry. |
| Create post / camera flow | Supabase `posts` + Storage `post-media`; previously used store fallback user id and object URLs in mock mode | PARTIAL | Yes when authed/configured | Yes | Yes | High | Require authoritative Supabase auth for writes, validate input, surface auth/storage/db failures. |
| Comments | `commentsRepo` -> Supabase `comments`, mock fallback existed | PARTIAL | Yes when Supabase configured | Yes for writes | Yes | Medium | Keep real reads, add write UI hardening in follow-up. |
| Likes / saves | Supabase `post_likes` / `saved_posts` | PARTIAL | Yes | Yes | Yes | Medium | Server-side RLS exists; UI needs fuller mutation error/rollback audit. |
| Explore venues | Google Places edge function -> `locations` table -> mock fallback | PARTIAL | External/service-backed; local DB optional | No | Yes | Medium | Keep fallback only in explicit demo mode; document required `GOOGLE_PLACES_API_KEY`. |
| Venue profile | Supabase posts/locations + several demo analytics/social modules | PARTIAL/MOCK | Mixed | Mixed | Yes | High | Prioritize venue posts persistence; move analytics/social demos behind disabled/demo states. |
| My Places | `user_places` with mock fallback visible when signed out/empty | PARTIAL | Yes when authed | Yes | Yes | High | Protect route, show real empty states instead of fake saved places. |
| Trips | Supabase `trips`, `trip_members`, realtime messages/ideas; mock fallback in repo | PARTIAL | Yes when authed | Yes | Yes | Medium | Protect route and keep realtime cleanup; further membership write tests needed. |
| Messages | Supabase conversations/messages with `mockVenueData` fallback | PARTIAL | Yes when authed | Yes | Yes | High | Protect route; remove production fallback in real mode. |
| Notifications dropdown | Hardcoded demo notifications | MOCK | No | Should be yes | Yes | Medium | Replace with `notificationsRepo` or mark disabled until wired. |
| Settings preferences | Supabase `user_preferences`; signed-out localStorage fallback | PARTIAL | Yes when authed; local-only signed out | Yes for durable settings | Yes | Medium | Protect settings, keep local draft only for unauthenticated UX if intended. |
| Points / rewards | `points_ledger` partly real; rewards hardcoded | PARTIAL/MOCK | Points yes; rewards no | Yes | Yes | Medium | Protect points; create rewards table later if production rewards are needed. |
| Advertising / Meta AI screens | Static/mock campaign objects and local forms | MOCK | No | Should be yes | Yes/external | High | Gate as beta/demo or build real campaign backend. |
| External social aggregation | Platform services return `socialMedia/mockData` unless keys exist | MOCK/PARTIAL | No | Venue auth needed | Yes/external APIs | High | Move platform demos out of production path; require server-side provider tokens. |
| AI voice/search assistants | Supabase Edge Functions with canned fallback responses | PARTIAL | N/A | Mixed | Yes/external APIs | Medium | Keep graceful degradation, but label unavailable external integrations clearly. |

## 2. Data Flow Map

### Home feed
- UI: `src/pages/Index.tsx` -> `src/components/PostFeed.tsx` -> `src/components/post/PostCard.tsx`.
- State/hook layer: local component state with guarded async effect and retry.
- API/data layer: `postsRepo.getFeed()`, `commentsRepo.getForPost()`.
- Database: `posts`, `comments`, joined `profiles`.
- Auth/permission: public posts are readable by RLS; writes require `auth.uid()` ownership.
- Loading/error/empty: skeleton loading, explicit error card with retry, real empty state.
- Realtime/cache: no feed realtime; mutation callers must refetch/append locally.
- Failure modes: missing Supabase env, RLS failure, missing migration, network failure.

### Create post / check-in
- UI: `CreatePostDialog`, camera/check-in callers.
- State/hook layer: submit disabled while posting; local file previews are revoked.
- API/data layer: `createPost()` / `checkInAndPost()` -> `postsRepo.uploadMedia()` -> `postsRepo.create()`.
- Database/storage: Storage bucket `post-media`, `posts`, optional `check_ins`.
- Auth/permission: authoritative Supabase user required; RLS allows author-only insert/update/delete.
- Loading/error/empty: submit spinner and toast errors.
- Realtime/cache: no global cache; callers receive created post.
- Failure modes: no session, bucket missing, file upload failure, RLS insert failure.

### My Places
- UI: `src/pages/MyPlaces.tsx`.
- State/hook layer: local loading/error state.
- API/data layer: `listUserPlaces()` from `tripCollabService`.
- Database: `user_places`, `trips` for Trips tab.
- Auth/permission: route protected; RLS owner-only.
- Loading/error/empty: loading text, retry errors, real empty states.
- Realtime/cache: none.
- Failure modes: unauthenticated redirect, missing schema, network/RLS errors.

### Auth/session
- UI/provider: `SupabaseAuthProvider`, `ProtectedRoute`.
- Auth service: Supabase Auth.
- Store: syncs Supabase profile to Zustand for presentation only.
- Permission: server-enforced via RLS; client route gates are UX only.
- Failure modes: missing env, trigger lag for new profiles, expired session.

## 3. Mock Data Trace

Production-path mock/demo surfaces found:
- `src/services/data/config.ts` had mock fallback enabled by default.
- `src/mock/*` backs posts, users, comments, locations in fallback paths.
- `src/services/data/*Repo.ts` uses fallback wrappers for posts/profiles/comments/locations/messages/trips.
- `src/services/socialMedia/mockData.ts` and platform services are demo implementations.
- `src/components/messaging/mockVenueData.ts` backs messages fallback.
- `src/components/notifications/NotificationsDropdown.tsx` hardcodes `demo-*` notifications.
- `src/components/venue/events/eventsData.ts` and `UpcomingEvents.tsx` use sample events.
- Advertising analytics components contain `mockCampaigns`.
- Several AI/voice services include canned/local placeholder responses.
- `localStorage` persists some settings/API keys/chat state for demo or browser-only features.

Useful retained mocks should be kept only for explicit local demo mode, tests, seeds, or visibly disabled beta flows.

## 4. Production Readiness Gaps

- Auth: route-level protection was incomplete for user-private screens.
- Database schema: core social migrations exist; generated Supabase types are stale and need regeneration against the migrated DB.
- RLS/permissions: core owner policies exist; production requires applying migrations and verifying in the target Supabase project.
- API validation: frontend validates lightly; deeper DB constraints/check constraints are still needed for enum-like fields.
- Realtime: trip/message subscriptions exist but need multi-user deployed QA.
- Error handling: feed and My Places needed explicit error/empty states; many secondary mock screens still need hardening.
- Observability: no centralized production logging/error reporting.
- Deployment config: README/env docs previously described mock fallback as default; production env needs real Supabase/Edge Function secrets.
- Mobile UX: preserved; not fully screenshot-regressed in this pass.
- Security: direct browser LLM/API-key paths remain and should be removed or server-routed in a follow-up.
- Rate limits: not implemented for write-heavy user actions or Edge Functions.
- Rollback safety: migration rollback must be handled with Supabase backups or explicit reverse SQL before destructive changes.

## Production Slice Implemented In This Pass

This pass hardens the core authenticated social loop: auth-gated private routes, real-data-only default data layer, real post-write auth requirements, real feed/My Places loading/error/empty states, and updated deployment documentation. Remaining demo-heavy verticals are documented and no longer silently become the production default unless `VITE_USE_MOCK_FALLBACK=true` is explicitly set for local/demo environments.
