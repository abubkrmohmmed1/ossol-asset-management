'use client'

import { useEffect, useState } from 'react'
import OssolLayout from '@/components/Layout/OssolLayout'
import Dashboard from '@/components/screens/Dashboard'
import Assets from '@/components/screens/Assets'
import WorkOrders from '@/components/screens/WorkOrders'
import FinancialReports from '@/components/screens/FinancialReports'
import PredictiveAnalytics from '@/components/screens/PredictiveAnalytics'
import Settings from '@/components/screens/Settings'
import { useAppStore } from '@/lib/store'

type ScreenType = 'dashboard' | 'assets' | 'work-orders' | 'financial-reports' | 'predictive-analytics' | 'settings'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard')
  const { setAssets } = useAppStore()

  // Initialize sample data
  useEffect(() => {
    const sampleAssets = [
      {
        id: '1',
        name: 'Main Server',
        category: 'electronics',
        status: 'running',
        location: 'Data Center',
        purchaseDate: '2023-01-15',
        value: 150000,
        maintenanceCost: 45000
      },
      {
        id: '2', 
        name: 'Forklift #003',
        category: 'vehicles',
        status: 'maintenance',
        location: 'Warehouse A',
        purchaseDate: '2022-06-20',
        value: 75000,
        maintenanceCost: 12000
      },
      {
        id: '3',
        name: 'HVAC System',
        category: 'machinery',
        status: 'running',
        location: 'Building 1',
        purchaseDate: '2021-03-10',
        value: 120000,
        maintenanceCost: 28000
      },
      {
        id: '4',
        name: 'Backup Generator',
        category: 'machinery',
        status: 'stopped',
        location: 'Outside',
        purchaseDate: '2020-12-05',
        value: 200000,
        maintenanceCost: 35000
      },
      {
        id: '5',
        name: 'Office Building',
        category: 'buildings',
        status: 'running',
        location: 'Main Campus',
        purchaseDate: '2018-08-15',
        value: 2500000,
        maintenanceCost: 150000
      }
    ]
    setAssets(sampleAssets)
  }, [setAssets])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />
      case 'assets':
        return <Assets />
      case 'work-orders':
        return <WorkOrders />
      case 'financial-reports':
        return <FinancialReports />
      case 'predictive-analytics':
        return <PredictiveAnalytics />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <OssolLayout currentScreen={currentScreen} onScreenChange={setCurrentScreen}>
      {renderScreen()}
    </OssolLayout>
  )
}