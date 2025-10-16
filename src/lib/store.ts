'use client'

import { create } from 'zustand'
import { Asset } from '@/components/screens/Assets/types'

export interface FilterState {
  searchQuery: string
  category: string
  status: string
  location: string
  dateRange: {
    start: string
    end: string
  }
}

export interface AppState {
  // Filters
  filters: FilterState
  setFilters: (filters: Partial<FilterState>) => void
  
  // Assets
  assets: Asset[]
  setAssets: (assets: Asset[]) => void
  
  // Language
  language: 'en' | 'ar'
  setLanguage: (lang: 'en' | 'ar') => void
  
  // Notification
  showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Filters
  filters: {
    searchQuery: '',
    category: 'all',
    status: 'all',
    location: 'all',
    dateRange: {
      start: '',
      end: ''
    }
  },
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  
  // Assets
  assets: [],
  setAssets: (assets) => set({ assets }),
  
  // Language
  language: 'ar',
  setLanguage: (lang) => set({ language: lang }),
  
  // Notification
  showNotification: (message, type) => {
    // This will be handled by the layout component
    const event = new CustomEvent('notification', { detail: { message, type } })
    window.dispatchEvent(event)
  }
}))

// Hook for filtered assets
export const useFilteredAssets = () => {
  const assets = useAppStore((state) => state.assets)
  const filters = useAppStore((state) => state.filters)
  
  return assets.filter(asset => {
    // Search filter
    if (filters.searchQuery && !asset.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false
    }
    
    // Category filter
    if (filters.category !== 'all' && asset.category !== filters.category) {
      return false
    }
    
    // Status filter
    if (filters.status !== 'all' && asset.status !== filters.status) {
      return false
    }
    
    // Location filter
    if (filters.location !== 'all' && asset.location !== filters.location) {
      return false
    }
    
    return true
  })
}