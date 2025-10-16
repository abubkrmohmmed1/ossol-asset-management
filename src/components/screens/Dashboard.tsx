'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Package, CheckCircle, AlertTriangle, XCircle, TrendingUp, RefreshCw, Filter } from 'lucide-react'
import MaintenanceCostChart from '@/components/charts/MaintenanceCostChart'
import AssetDistributionChart from '@/components/charts/AssetDistributionChart'
import { useAppStore, useFilteredAssets } from '@/lib/store'
import { useTranslation } from '@/lib/locales'

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('month')
  const [isLoading, setIsLoading] = useState(false)
  
  const { language, filters, setFilters } = useAppStore()
  const filteredAssets = useFilteredAssets()
  const t = useTranslation(language)
  
  // Calculate KPI data based on filtered assets
  const kpiData = useMemo(() => {
    const totalAssets = filteredAssets.length
    const activeAssets = filteredAssets.filter(asset => asset.status === 'running').length
    const maintenanceAssets = filteredAssets.filter(asset => asset.status === 'maintenance').length
    const outOfServiceAssets = filteredAssets.filter(asset => asset.status === 'stopped').length
    
    // Use deterministic values to avoid hydration mismatch
    const getChangeValue = (base: number, index: number) => {
      // Use a simple hash function to generate consistent values
      const hash = (totalAssets + activeAssets + maintenanceAssets + outOfServiceAssets + index) % 20
      return hash > 10 ? `+${hash - 10}` : `-${10 - hash}`
    }
    
    return [
      {
        title: t.totalAssets,
        value: totalAssets.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US'),
        change: getChangeValue(totalAssets, 0),
        changeType: totalAssets > 100 ? 'positive' as const : 'negative' as const,
        icon: Package,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      },
      {
        title: t.activeAssets,
        value: activeAssets.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US'),
        change: getChangeValue(activeAssets, 1),
        changeType: activeAssets > 50 ? 'positive' as const : 'negative' as const,
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      },
      {
        title: t.maintenanceRequired,
        value: maintenanceAssets.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US'),
        change: getChangeValue(maintenanceAssets, 2),
        changeType: maintenanceAssets < 10 ? 'positive' as const : 'negative' as const,
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      },
      {
        title: t.outOfService,
        value: outOfServiceAssets.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US'),
        change: getChangeValue(outOfServiceAssets, 3),
        changeType: outOfServiceAssets < 5 ? 'positive' as const : 'negative' as const,
        icon: XCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-100'
      }
    ]
  }, [filteredAssets, language, t])

  const recentActivities = [
    { id: 1, text: language === 'ar' ? 'تم إتمام الصيانة الدورية للخادم الرئيسي' : 'Completed maintenance for main server', time: language === 'ar' ? 'منذ ساعتين' : '2 hours ago', type: 'success', asset: language === 'ar' ? 'الخادم الرئيسي' : 'Main Server' },
    { id: 2, text: language === 'ar' ? 'تسجيل أصل جديد: رافعة شوكية #004' : 'New asset registered: Forklift #004', time: language === 'ar' ? 'منذ 4 ساعات' : '4 hours ago', type: 'info', asset: language === 'ar' ? 'رافعة شوكية #004' : 'Forklift #004' },
    { id: 3, text: language === 'ar' ? 'أمر عمل جديد: فحص نظام التكييف' : 'New work order: AC system inspection', time: language === 'ar' ? 'منذ 6 ساعات' : '6 hours ago', type: 'warning', asset: language === 'ar' ? 'نظام التكييف' : 'AC System' },
    { id: 4, text: language === 'ar' ? 'تحديث بيانات الأصل: مولد الطاقة #002' : 'Asset data updated: Power Generator #002', time: language === 'ar' ? 'منذ 8 ساعات' : '8 hours ago', type: 'info', asset: language === 'ar' ? 'مولد الطاقة #002' : 'Power Generator #002' },
    { id: 5, text: language === 'ar' ? 'اكتمال تدريب الفريق على نظام السلامة الجديد' : 'Team training completed for new safety system', time: language === 'ar' ? 'منذ يوم واحد' : '1 day ago', type: 'success', asset: language === 'ar' ? 'التدريب' : 'Training' },
  ]

  const alerts = [
    { id: 1, text: language === 'ar' ? 'الخادم الرئيسي - دلتا يحتاج إلى صيانة عاجلة' : 'Main Server - Delta needs urgent maintenance', priority: 'high', asset: language === 'ar' ? 'الخادم الرئيسي' : 'Main Server', action: language === 'ar' ? 'جدولة الصيانة' : 'Schedule Maintenance' },
    { id: 2, text: language === 'ar' ? 'انتهاء صلاحية بطاريات نظام الطوارئ خلال 30 يوم' : 'Emergency system batteries expire in 30 days', priority: 'medium', asset: language === 'ar' ? 'نظام الطوارئ' : 'Emergency System', action: language === 'ar' ? 'طلب قطع غيار' : 'Order Parts' },
    { id: 3, text: language === 'ar' ? 'مستوى الوقود في المولد #002 منخفض' : 'Fuel level low in Generator #002', priority: 'low', asset: language === 'ar' ? 'مولد الطاقة #002' : 'Power Generator #002', action: language === 'ar' ? 'تعبئة الوقود' : 'Refuel' },
    { id: 4, text: language === 'ar' ? 'فحص سنوي لنظام إطفاء الحريق مستحق' : 'Annual fire suppression system inspection due', priority: 'medium', asset: language === 'ar' ? 'نظام السلامة' : 'Safety System', action: language === 'ar' ? 'جدولة الفحص' : 'Schedule Inspection' },
  ]

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'info': return 'ℹ️'
      default: return '📄'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t.welcome}</h1>
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Filter Controls */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select 
              value={filters.category} 
              onValueChange={(value) => setFilters({ category: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'ar' ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="electronics">{language === 'ar' ? 'إلكترونيات' : 'Electronics'}</SelectItem>
                <SelectItem value="machinery">{language === 'ar' ? 'معدات' : 'Machinery'}</SelectItem>
                <SelectItem value="vehicles">{language === 'ar' ? 'مركبات' : 'Vehicles'}</SelectItem>
                <SelectItem value="buildings">{language === 'ar' ? 'مباني' : 'Buildings'}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filters.status} 
              onValueChange={(value) => setFilters({ status: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'ar' ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="running">{language === 'ar' ? 'يعمل' : 'Running'}</SelectItem>
                <SelectItem value="maintenance">{language === 'ar' ? 'صيانة' : 'Maintenance'}</SelectItem>
                <SelectItem value="stopped">{language === 'ar' ? 'متوقف' : 'Stopped'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">{language === 'ar' ? 'يوم' : 'Day'}</SelectItem>
              <SelectItem value="week">{language === 'ar' ? 'أسبوع' : 'Week'}</SelectItem>
              <SelectItem value="month">{language === 'ar' ? 'شهر' : 'Month'}</SelectItem>
              <SelectItem value="year">{language === 'ar' ? 'سنة' : 'Year'}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ml-2 ${isLoading ? 'animate-spin' : ''}`} />
            {language === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${kpi.bgColor} ml-4`}>
                      <Icon className={`w-8 h-8 ${kpi.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                      <div className="text-sm text-gray-500">{kpi.title}</div>
                    </div>
                  </div>
                  <div className={`flex items-center text-sm ${
                    kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4 ml-1" />
                    {kpi.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.monthlyMaintenanceCosts}</CardTitle>
          </CardHeader>
          <CardContent>
            <MaintenanceCostChart data={filteredAssets} timeRange={timeRange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.assetDistribution}</CardTitle>
          </CardHeader>
          <CardContent>
            <AssetDistributionChart data={filteredAssets} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.recentActivity}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="text-lg">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">{activity.text}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <p className="text-xs text-blue-600">{activity.asset}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center">
              <AlertTriangle className="w-5 h-5 ml-2" />
              {t.proactiveAlerts}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{alert.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={
                          alert.priority === 'high' ? 'destructive' :
                          alert.priority === 'medium' ? 'secondary' : 'default'
                        } className="mt-1">
                          {alert.priority === 'high' ? (language === 'ar' ? 'عالية' : 'High') :
                           alert.priority === 'medium' ? (language === 'ar' ? 'متوسطة' : 'Medium') : (language === 'ar' ? 'منخفضة' : 'Low')}
                        </Badge>
                        <p className="text-xs text-blue-600">{alert.asset}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="w-full">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'إحصائيات سريعة' : 'Quick Stats'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <div className="text-sm text-gray-600">{language === 'ar' ? 'معدل التوافر' : 'Uptime Rate'}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">24</div>
              <div className="text-sm text-gray-600">{language === 'ar' ? 'صيانة مكتملة هذا الشهر' : 'Maintenance Completed This Month'}</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">156K</div>
              <div className="text-sm text-gray-600">{language === 'ar' ? 'تكلفة الصيانة (ريال)' : 'Maintenance Cost (SAR)'}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600">{language === 'ar' ? 'متوسط تقييم الأداء' : 'Performance Rating'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}