'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, TrendingUp, Clock, Wrench, Activity, Zap, AlertCircle } from 'lucide-react'
import FailureProbabilityChart from '@/components/charts/FailureProbabilityChart'

export default function PredictiveAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  const criticalAlerts = [
    {
      id: 1,
      asset: 'الخادم الرئيسي - دلتا',
      issue: 'ارتفاع درجة الحرارة غير طبيعي',
      probability: 85,
      timeFrame: 'خلال 24 ساعة',
      recommendation: 'إيقاف التشغيل وفحص نظام التبريد',
      priority: 'critical',
      impact: 'عالي',
      cost: 25000,
      estimatedDowntime: '4-6 ساعات'
    },
    {
      id: 2,
      asset: 'مولد الطاقة #002',
      issue: 'انخفاض ضغط الزيت',
      probability: 72,
      timeFrame: 'خلال 3 أيام',
      recommendation: 'فحص مستوى الزيت وتغيير الفلتر',
      priority: 'high',
      impact: 'متوسط',
      cost: 8000,
      estimatedDowntime: '2-3 ساعات'
    },
    {
      id: 3,
      asset: 'رافعة شوكية #3',
      issue: 'اهتزاز غير طبيعي في المحرك',
      probability: 65,
      timeFrame: 'خلال أسبوع',
      recommendation: 'جدولة فحص شامل للمحرك',
      priority: 'medium',
      impact: 'منخفض',
      cost: 5000,
      estimatedDowntime: '1-2 ساعات'
    },
    {
      id: 4,
      asset: 'نظام التكييف المركزي',
      issue: 'انخفاض كفاءة التبريد',
      probability: 58,
      timeFrame: 'خلال 10 أيام',
      recommendation: 'تنظيف المكثفات وفحص غاز التبريد',
      priority: 'medium',
      impact: 'متوسط',
      cost: 12000,
      estimatedDowntime: 'ساعة واحدة'
    }
  ]

  const assetFailureProbability = [
    { 
      asset: 'الخادم الرئيسي', 
      probability: 85, 
      status: 'critical',
      lastMaintenance: '2025-10-01',
      nextMaintenance: '2025-11-01',
      healthScore: 35
    },
    { 
      asset: 'مولد الطاقة #002', 
      probability: 72, 
      status: 'high',
      lastMaintenance: '2025-09-20',
      nextMaintenance: '2025-10-20',
      healthScore: 45
    },
    { 
      asset: 'رافعة شوكية #3', 
      probability: 65, 
      status: 'medium',
      lastMaintenance: '2025-10-15',
      nextMaintenance: '2025-11-15',
      healthScore: 55
    },
    { 
      asset: 'نظام التكييف', 
      probability: 45, 
      status: 'low',
      lastMaintenance: '2025-10-05',
      nextMaintenance: '2025-11-05',
      healthScore: 70
    },
    { 
      asset: 'مضخة المياه الرئيسية', 
      probability: 38, 
      status: 'low',
      lastMaintenance: '2025-09-15',
      nextMaintenance: '2025-10-15',
      healthScore: 75
    },
    { 
      asset: 'الإضاءة الطارئة', 
      probability: 25, 
      status: 'very-low',
      lastMaintenance: '2025-08-01',
      nextMaintenance: '2025-11-01',
      healthScore: 85
    },
  ]

  const predictiveInsights = [
    {
      title: 'صيانة وقائية مقترحة',
      value: 23,
      unit: 'أصل',
      trend: 'up',
      description: 'أصل يحتاج لصيانة خلال 30 يوم',
      icon: Wrench,
      color: 'blue'
    },
    {
      title: 'تكلفة الصيانة المتوقعة',
      value: 156000,
      unit: 'ريال',
      trend: 'down',
      description: 'تكلفة الصيانة للشهر القادم',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'دقة التنبؤات',
      value: 89,
      unit: '%',
      trend: 'up',
      description: 'معدل دقة تنبؤات النظام',
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'توفير التكاليف',
      value: 245000,
      unit: 'ريال',
      trend: 'up',
      description: 'التوفير المتوقع من الصيانة الوقائية',
      icon: Zap,
      color: 'yellow'
    }
  ]

  const maintenanceSchedule = [
    { 
      asset: 'الخادم الرئيسي - دلتا',
      type: 'صيانة عاجلة',
      date: '2025-10-17',
      priority: 'عالية',
      estimatedCost: 25000,
      duration: '4-6 ساعات'
    },
    { 
      asset: 'مولد الطاقة #002',
      type: 'فحص الزيوت',
      date: '2025-10-19',
      priority: 'عالية',
      estimatedCost: 8000,
      duration: '2-3 ساعات'
    },
    { 
      asset: 'رافعة شوكية #3',
      type: 'فحص المحرك',
      date: '2025-10-23',
      priority: 'متوسطة',
      estimatedCost: 5000,
      duration: '1-2 ساعات'
    },
    { 
      asset: 'نظام التكييف المركزي',
      type: 'صيانة دورية',
      date: '2025-10-26',
      priority: 'متوسطة',
      estimatedCost: 12000,
      duration: 'ساعة واحدة'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-red-600 bg-red-100'
    if (probability >= 60) return 'text-orange-600 bg-orange-100'
    if (probability >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'حرج'
      case 'high': return 'عالي'
      case 'medium': return 'متوسط'
      case 'low': return 'منخفض'
      case 'very-low': return 'منخفض جداً'
      default: return status
    }
  }

  const handleTakeAction = (alertId: number) => {
    alert(`سيتم اتخاذ إجراء للتنبيه رقم ${alertId}`)
  }

  const handleScheduleMaintenance = (asset: string) => {
    alert(`سيتم جدولة صيانة لـ ${asset}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">التحليلات والتنبؤات الاستباقية</h1>
        <div className="flex items-center space-x-4 space-x-reverse">
          <select 
            value={selectedTimeRange} 
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="7d">آخر 7 أيام</option>
            <option value="30d">آخر 30 يوم</option>
            <option value="90d">آخر 90 يوم</option>
            <option value="1y">آخر سنة</option>
          </select>
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 ml-2" />
            تحديث التوقعات
          </Button>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictiveInsights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${insight.color}-100`}>
                    <Icon className={`w-6 h-6 text-${insight.color}-600`} />
                  </div>
                  <div className={`flex items-center text-sm ${
                    insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ml-1 ${
                      insight.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {insight.trend === 'up' ? 'زيادة' : 'انخفاض'}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {typeof insight.value === 'number' ? 
                    insight.value.toLocaleString('ar-SA') : insight.value}
                  <span className="text-sm text-gray-500 mr-1">{insight.unit}</span>
                </div>
                <div className="text-sm text-gray-600">{insight.description}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Critical Alerts and Asset Probability */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center">
                <AlertTriangle className="w-5 h-5 ml-2" />
                التنبيهات النشطة الحرجة ({criticalAlerts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${getPriorityColor(alert.priority)} hover:shadow-md transition-shadow`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-lg ml-2">{alert.asset}</h3>
                          <Badge variant="destructive" className="ml-2">
                            {alert.probability}% احتمالية
                          </Badge>
                          <Badge variant="outline" className="mr-2">
                            التأثير: {alert.impact}
                          </Badge>
                        </div>
                        
                        <p className="text-sm mb-2">{alert.issue}</p>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4 space-x-reverse">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 ml-1" />
                            <span>{alert.timeFrame}</span>
                          </div>
                          <div className="flex items-center">
                            <AlertCircle className="w-4 h-4 ml-1" />
                            <span>تكلفة: {alert.cost.toLocaleString('ar-SA')} ريال</span>
                          </div>
                          <div className="flex items-center">
                            <Activity className="w-4 h-4 ml-1" />
                            <span>توقف: {alert.estimatedDowntime}</span>
                          </div>
                        </div>
                        
                        <div className="bg-white/50 rounded p-3">
                          <p className="text-sm font-medium mb-1">التوصية:</p>
                          <p className="text-sm">{alert.recommendation}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 space-x-reverse">
                      <Button 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleTakeAction(alert.id)}
                      >
                        <Wrench className="w-4 h-4 ml-1" />
                        اتخاذ إجراء عاجل
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleScheduleMaintenance(alert.asset)}
                      >
                        جدولة الصيانة
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Failure Probability */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>احتمالية فشل الأصول</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <FailureProbabilityChart />
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {assetFailureProbability.map((asset, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                      selectedAsset === asset.asset ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedAsset(asset.asset === selectedAsset ? null : asset.asset)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-sm font-medium truncate">{asset.asset}</div>
                        <div className="text-xs text-gray-500">
                          آخر صيانة: {asset.lastMaintenance}
                        </div>
                      </div>
                      <div className="mr-3 text-left">
                        <div className="text-sm font-bold">{asset.probability}%</div>
                        <Badge variant="outline" className="text-xs">
                          {getStatusText(asset.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProbabilityColor(asset.probability)}`}
                            style={{ width: `${asset.probability}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-2 rounded-full ml-2" 
                             style={{ backgroundColor: getHealthScoreColor(asset.healthScore) }} />
                        <span className="text-xs text-gray-500">{asset.healthScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 ml-2" />
            جدولة الصيانة المقترحة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4">الأصل</th>
                  <th className="text-right py-3 px-4">نوع الصيانة</th>
                  <th className="text-right py-3 px-4">التاريخ</th>
                  <th className="text-right py-3 px-4">الأولوية</th>
                  <th className="text-right py-3 px-4">التكلفة المقدرة</th>
                  <th className="text-right py-3 px-4">المدة المتوقعة</th>
                  <th className="text-right py-3 px-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceSchedule.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.asset}</td>
                    <td className="py-3 px-4">{item.type}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        item.priority === 'عالية' ? 'destructive' : 'secondary'
                      }>
                        {item.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{item.estimatedCost.toLocaleString('ar-SA')} ريال</td>
                    <td className="py-3 px-4">{item.duration}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline">
                          تأكيد
                        </Button>
                        <Button size="sm" variant="outline">
                          تعديل
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-800">ملخص جدولة الصيانة</h4>
                <p className="text-sm text-blue-600">
                  إجمالي التكلفة المتوقعة: {maintenanceSchedule.reduce((sum, item) => sum + item.estimatedCost, 0).toLocaleString('ar-SA')} ريال
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                تأكيد الجدولة الكاملة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 ml-2" />
            توصيات الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                تحسين كفاءة الطاقة
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                يمكن توفير 15% من استهلاك الطاقة من خلال تحديث أنظمة التكييف وتركيب أجهزة استشعار ذكية.
              </p>
              <div className="text-sm font-semibold text-green-600">
                توفير متوقع: 45,000 ريال سنوياً
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                دمج الصيانة الوقائية
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                دمج مهام الصيانة للأصول المجاورة يمكن تقليل التكاليف بنسبة 20% وزمن التوقف بنسبة 35%.
              </p>
              <div className="text-sm font-semibold text-blue-600">
                توفير متوقع: 28,000 ريال شهرياً
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></div>
                تحسين مخزون قطع الغيار
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                تطبيق نظام مخزون ذكي يمكن تقليل تكاليف التخزين بنسبة 30% وتجنب النقص في قطع الغيار الهامة.
              </p>
              <div className="text-sm font-semibold text-yellow-600">
                توفير متوقع: 120,000 ريال سنوياً
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full ml-2"></div>
                تدريب الفريق التقني
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                استثمار في تدريب الفريق يمكن زيادة الكفاءة بنسبة 25% وتقليل الأخطاء بنسبة 40%.
              </p>
              <div className="text-sm font-semibold text-purple-600">
                عائد الاستثمار: 200% في السنة الأولى
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}