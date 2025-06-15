
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AppStore } from './types';
import { createUserSlice } from './userStore';
import { createVenueSlice } from './venueStore';
import { createLocationSlice } from './locationStore';
import { createChatSlice } from './chatStore';
import { createUISlice } from './uiStore';

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((set, get, api) => ({
        ...createUserSlice(set, get, api),
        ...createVenueSlice(set, get, api),
        ...createLocationSlice(set, get, api),
        ...createChatSlice(set, get, api),
        ...createUISlice(set, get, api),
      })),
      {
        name: 'vibe-app-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          followedVenues: state.followedVenues,
          ui: {
            currentTheme: state.ui.currentTheme,
            isSidebarOpen: state.ui.isSidebarOpen,
          },
          chatState: {
            chatMode: state.chatState.chatMode,
            messages: state.chatState.messages.slice(-50), // Keep only last 50 messages
          },
        }),
      }
    ),
    { name: 'vibe-app-store' }
  )
);
