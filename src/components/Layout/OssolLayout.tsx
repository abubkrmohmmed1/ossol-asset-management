'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Home, 
  Package, 
  ClipboardList, 
  TrendingUp, 
  Brain, 
  Settings,
  Search,
  Bell,
  User,
  Menu,
  Globe,
  X,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useTranslation } from '@/lib/locales'
import { NotificationContainer } from '@/components/ui/notification'

interface OssolLayoutProps {
  children: React.ReactNode
  currentScreen: string
  onScreenChange: (screen: string) => void
}

interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'warning' | 'success'
  time: string
  read: boolean
}

export default function OssolLayout({ children, currentScreen, onScreenChange }: OssolLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const { language, setLanguage, filters, setFilters } = useAppStore()
  const t = useTranslation(language)
  
  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'assets', label: t.assets, icon: Package },
    { id: 'work-orders', label: t.workOrders, icon: ClipboardList },
    { id: 'financial-reports', label: t.financialReports, icon: TrendingUp },
    { id: 'predictive-analytics', label: t.predictiveAnalytics, icon: Brain },
    { id: 'settings', label: t.settings, icon: Settings },
  ]
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: language === 'ar' ? 'صيانة مجدولة' : 'Scheduled Maintenance',
      message: language === 'ar' ? 'الخادم الرئيسي يحتاج صيانة خلال 3 أيام' : 'Main server needs maintenance in 3 days',
      type: 'warning' as const,
      time: language === 'ar' ? 'منذ ساعتين' : '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: language === 'ar' ? 'أمر عمل جديد' : 'New Work Order',
      message: language === 'ar' ? 'تم إنشاء أمر عمل جديد للرافعة الشوكية #3' : 'New work order created for Forklift #3',
      type: 'info' as const,
      time: language === 'ar' ? 'منذ 4 ساعات' : '4 hours ago',
      read: false
    },
    {
      id: 3,
      title: language === 'ar' ? 'اكتملت الصيانة' : 'Maintenance Completed',
      message: language === 'ar' ? 'تم الانتهاء من صيانة وحدة التكييف الرئيسية' : 'Maintenance completed for main AC unit',
      type: 'success' as const,
      time: language === 'ar' ? 'منذ يوم' : '1 day ago',
      read: true
    }
  ])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Update global search filter
    setFilters({ searchQuery: query })
  }

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className={`flex h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 shadow-lg`}>
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            {sidebarOpen && <h1 className="text-2xl font-bold mr-3">OSSOL</h1>}
          </div>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentScreen === item.id ? "default" : "ghost"}
                className={`w-full justify-start mb-2 ${currentScreen === item.id ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
                onClick={() => onScreenChange(item.id)}
              >
                <Icon className="w-5 h-5 ml-3" />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pr-10 pl-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Language Switcher */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant={language === 'en' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleLanguageChange('en')}
                >
                  EN
                </Button>
                <Button 
                  variant={language === 'ar' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleLanguageChange('ar')}
                >
                  ع
                </Button>
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-semibold">{t.notifications}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={markAllNotificationsAsRead}
                      >
                        {t.markAllRead}
                      </Button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                            onClick={() => markNotificationAsRead(notif.id)}
                          >
                            <div className="flex items-start space-x-3 space-x-reverse">
                              {getNotificationIcon(notif.type)}
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{notif.title}</h4>
                                <p className="text-sm text-gray-600">{notif.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                              </div>
                              {!notif.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          {t.noNotifications}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">{language === 'ar' ? 'سلطان الأحمد' : 'Sultan Ahmed'}</div>
                  <div className="text-sm text-gray-500">{language === 'ar' ? 'مدير أصول' : 'Asset Manager'}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        />
      )}

      {/* Global Notification Container */}
      <NotificationContainer />
    </div>
  )
}