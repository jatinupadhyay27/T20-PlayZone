import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import navigationData from '@/data/navigation.json';
import type { NavLink, SidebarItem } from '@/types/navigation';

interface NavigationState {
  navLinks: NavLink[];
  sidebarItems: SidebarItem[];
  isSidebarOpen: boolean;
}

const initialState: NavigationState = {
  navLinks: navigationData.navLinks,
  sidebarItems: navigationData.sidebarItems,
  isSidebarOpen: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen } = navigationSlice.actions;
export default navigationSlice.reducer;
