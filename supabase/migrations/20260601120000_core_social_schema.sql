-- Core social schema for Vibe Right Now
-- Adds the user/post/social tables the front-end expects (none existed before).
-- Reuses the existing public.update_updated_at_column() trigger function created in
-- the venue_audio_summaries migration. Apply on the owning Supabase account via
-- `supabase db push` or the dashboard SQL editor, then regenerate
-- src/integrations/supabase/types.ts.

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  name TEXT,
  email TEXT,
  avatar_url TEXT,
  bio TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  is_private BOOLEAN NOT NULL DEFAULT false,
  points INTEGER NOT NULL DEFAULT 0,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create a profile row whenever a new auth user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, name, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- posts
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  -- location_id is kept as TEXT (no FK) so it can reference either the public.locations
  -- table or external Google/Yelp place ids without friction.
  location_id TEXT,
  location_name TEXT,
  location_city TEXT,
  location_state TEXT,
  content TEXT NOT NULL DEFAULT '',
  media JSONB NOT NULL DEFAULT '[]'::jsonb,
  vibe_tags TEXT[] NOT NULL DEFAULT '{}',
  visibility TEXT NOT NULL DEFAULT 'public',
  is_venue_post BOOLEAN NOT NULL DEFAULT false,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_location ON public.posts(location_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON public.posts(created_at DESC);

-- ---------------------------------------------------------------------------
-- comments
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_comments_post ON public.comments(post_id);

-- ---------------------------------------------------------------------------
-- engagement: likes, saves, follows
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.post_likes (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.saved_posts (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.follows (
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  followee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, followee_id),
  CHECK (follower_id <> followee_id)
);

-- ---------------------------------------------------------------------------
-- check-ins + my places (visited / want-to-visit)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.check_ins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  location_id TEXT,
  location_name TEXT,
  photo_url TEXT,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_check_ins_user ON public.check_ins(user_id);

CREATE TABLE IF NOT EXISTS public.user_places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  location_id TEXT NOT NULL,
  location_name TEXT,
  location_city TEXT,
  status TEXT NOT NULL DEFAULT 'want_to_visit', -- 'visited' | 'want_to_visit'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, location_id, status)
);
CREATE INDEX IF NOT EXISTS idx_user_places_user ON public.user_places(user_id);

-- ---------------------------------------------------------------------------
-- trips (parent table; trip_messages / trip_venue_ideas already reference trip_id)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.trip_members (
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- 'owner' | 'member'
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (trip_id, user_id)
);

-- ---------------------------------------------------------------------------
-- points ledger (gamification)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.points_ledger (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_points_ledger_user ON public.points_ledger(user_id);

-- ---------------------------------------------------------------------------
-- denormalized counter triggers
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.bump_post_likes_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;
DROP TRIGGER IF EXISTS trg_post_likes_count ON public.post_likes;
CREATE TRIGGER trg_post_likes_count
  AFTER INSERT OR DELETE ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION public.bump_post_likes_count();

CREATE OR REPLACE FUNCTION public.bump_post_comments_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;
DROP TRIGGER IF EXISTS trg_post_comments_count ON public.comments;
CREATE TRIGGER trg_post_comments_count
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.bump_post_comments_count();

-- updated_at triggers (reuse existing public.update_updated_at_column)
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_comments_updated_at BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_trips_updated_at BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_posts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_places   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_ledger ENABLE ROW LEVEL SECURITY;

-- profiles: world-readable, self-writable
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_self" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- posts: public ones readable by anyone, private/friends only by author; author writes own
CREATE POLICY "posts_select_visible" ON public.posts FOR SELECT
  USING (visibility = 'public' OR author_id = auth.uid());
CREATE POLICY "posts_insert_own" ON public.posts FOR INSERT WITH CHECK (author_id = auth.uid());
CREATE POLICY "posts_update_own" ON public.posts FOR UPDATE USING (author_id = auth.uid());
CREATE POLICY "posts_delete_own" ON public.posts FOR DELETE USING (author_id = auth.uid());

-- comments: readable by all, author writes own
CREATE POLICY "comments_select_all" ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_own" ON public.comments FOR INSERT WITH CHECK (author_id = auth.uid());
CREATE POLICY "comments_update_own" ON public.comments FOR UPDATE USING (author_id = auth.uid());
CREATE POLICY "comments_delete_own" ON public.comments FOR DELETE USING (author_id = auth.uid());

-- likes / saves / follows: readable by all, user manages own rows
CREATE POLICY "post_likes_select_all" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "post_likes_write_own" ON public.post_likes FOR ALL
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "saved_posts_select_own" ON public.saved_posts FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "saved_posts_write_own" ON public.saved_posts FOR ALL
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "follows_select_all" ON public.follows FOR SELECT USING (true);
CREATE POLICY "follows_write_own" ON public.follows FOR ALL
  USING (follower_id = auth.uid()) WITH CHECK (follower_id = auth.uid());

-- check-ins / user_places: readable by all, owner writes own
CREATE POLICY "check_ins_select_all" ON public.check_ins FOR SELECT USING (true);
CREATE POLICY "check_ins_write_own" ON public.check_ins FOR ALL
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_places_select_own" ON public.user_places FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "user_places_write_own" ON public.user_places FOR ALL
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- trips: visible to owner + members; owner writes
CREATE POLICY "trips_select_member" ON public.trips FOR SELECT
  USING (owner_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.trip_members m WHERE m.trip_id = id AND m.user_id = auth.uid()
  ));
CREATE POLICY "trips_insert_own" ON public.trips FOR INSERT WITH CHECK (owner_id = auth.uid());
CREATE POLICY "trips_update_own" ON public.trips FOR UPDATE USING (owner_id = auth.uid());
CREATE POLICY "trips_delete_own" ON public.trips FOR DELETE USING (owner_id = auth.uid());

CREATE POLICY "trip_members_select_member" ON public.trip_members FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.trips t WHERE t.id = trip_id AND t.owner_id = auth.uid()
  ));
CREATE POLICY "trip_members_write_owner" ON public.trip_members FOR ALL
  USING (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND t.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_id AND t.owner_id = auth.uid()));

-- points ledger: owner reads own
CREATE POLICY "points_ledger_select_own" ON public.points_ledger FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "points_ledger_insert_own" ON public.points_ledger FOR INSERT WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Storage buckets for media
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
  VALUES ('avatars', 'avatars', true)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public)
  VALUES ('post-media', 'post-media', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "avatars_public_read" ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
CREATE POLICY "avatars_auth_write" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "post_media_public_read" ON storage.objects FOR SELECT
  USING (bucket_id = 'post-media');
CREATE POLICY "post_media_auth_write" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'post-media' AND auth.role() = 'authenticated');
