'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, DollarSign, Calendar, Download, FileText } from 'lucide-react'
import BudgetComparisonChart from '@/components/charts/BudgetComparisonChart'
import DepreciationChart from '@/components/charts/DepreciationChart'

export default function FinancialReports() {
  const [yearFilter, setYearFilter] = useState('2025')
  const [periodFilter, setPeriodFilter] = useState('yearly')
  const [selectedReport, setSelectedReport] = useState('overview')

  const budgetData = [
    { category: 'الصيانة الوقائية', budget: 500000, actual: 420000, variance: -80000 },
    { category: 'الصيانة التصحيحية', budget: 300000, actual: 380000, variance: 80000 },
    { category: 'قطع الغيار', budget: 200000, actual: 180000, variance: -20000 },
    { category: 'المقاولين الخارجيين', budget: 150000, actual: 165000, variance: 15000 },
    { category: 'التدريب والتطوير', budget: 100000, actual: 95000, variance: -5000 },
  ]

  const depreciationData = [
    { year: '2021', value: 2800000, depreciation: 0 },
    { year: '2022', value: 2450000, depreciation: 350000 },
    { year: '2023', value: 2100000, depreciation: 350000 },
    { year: '2024', value: 1850000, depreciation: 250000 },
    { year: '2025', value: 1600000, depreciation: 250000 },
  ]

  const monthlyTrends = [
    { month: 'يناير', maintenance: 45000, parts: 12000, labor: 18000, total: 75000 },
    { month: 'فبراير', maintenance: 52000, parts: 15000, labor: 22000, total: 89000 },
    { month: 'مارس', maintenance: 38000, parts: 8000, labor: 15000, total: 61000 },
    { month: 'أبريل', maintenance: 61000, parts: 22000, labor: 28000, total: 111000 },
    { month: 'مايو', maintenance: 47000, parts: 14000, labor: 20000, total: 81000 },
    { month: 'يونيو', maintenance: 55000, parts: 18000, labor: 24000, total: 97000 },
    { month: 'يوليو', maintenance: 43000, parts: 11000, labor: 17000, total: 71000 },
    { month: 'أغسطس', maintenance: 58000, parts: 20000, labor: 26000, total: 104000 },
    { month: 'سبتمبر', maintenance: 49000, parts: 16000, labor: 21000, total: 86000 },
    { month: 'أكتوبر', maintenance: 42000, parts: 13000, labor: 19000, total: 74000 },
  ]

  const totalBudget = 1250000
  const totalActual = 1240000
  const totalVariance = -10000

  const assetValueData = [
    { category: 'معدات تقنية', value: 2800000, depreciation: 560000 },
    { category: 'معدات ثقيلة', value: 1200000, depreciation: 360000 },
    { category: 'معدات طاقة', value: 800000, depreciation: 200000 },
    { category: 'أنظمة تهوية', value: 600000, depreciation: 150000 },
    { category: 'مباني ومرافق', value: 2000000, depreciation: 200000 },
  ]

  const handleExportReport = (format: 'pdf' | 'excel') => {
    // Simulate export functionality
    console.log(`Exporting report as ${format}`)
    alert(`سيتم تصدير التقرير بصيغة ${format.toUpperCase()}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">التقارير المالية</h1>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">سنوي</SelectItem>
              <SelectItem value="quarterly">ربع سنوي</SelectItem>
              <SelectItem value="monthly">شهري</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExportReport('pdf')}>
            <Download className="w-4 h-4 ml-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport('excel')}>
            <FileText className="w-4 h-4 ml-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg ml-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">إجمالي الميزانية</div>
                <div className="text-2xl font-bold text-gray-900">
                  {totalBudget.toLocaleString('ar-SA')} ريال
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg ml-4">
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">الإنفاق الفعلي</div>
                <div className="text-2xl font-bold text-gray-900">
                  {totalActual.toLocaleString('ar-SA')} ريال
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ml-4 ${
                totalVariance < 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {totalVariance < 0 ? (
                  <TrendingDown className="w-8 h-8 text-green-600" />
                ) : (
                  <TrendingUp className="w-8 h-8 text-red-600" />
                )}
              </div>
              <div>
                <div className="text-sm text-gray-500">الفرق</div>
                <div className={`text-2xl font-bold ${
                  totalVariance < 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(totalVariance).toLocaleString('ar-SA')} ريال
                </div>
                <div className={`text-sm ${
                  totalVariance < 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {totalVariance < 0 ? 'تحت الميزانية' : 'تجاوز الميزانية'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg ml-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">متوسط الإنفاق الشهري</div>
                <div className="text-2xl font-bold text-gray-900">
                  {(totalActual / 10).toLocaleString('ar-SA')} ريال
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Reports */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="budget">الميزانية</TabsTrigger>
          <TabsTrigger value="assets">الأصول</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الميزانية مقابل الإنفاق الفعلي</CardTitle>
              </CardHeader>
              <CardContent>
                <BudgetComparisonChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توقعات إهلاك الأصول</CardTitle>
              </CardHeader>
              <CardContent>
                <DepreciationChart />
              </CardContent>
            </Card>
          </div>

          {/* Budget Table */}
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الميزانية حسب الفئة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">الفئة</th>
                      <th className="text-right py-3 px-4">الميزانية</th>
                      <th className="text-right py-3 px-4">الإنفاق الفعلي</th>
                      <th className="text-right py-3 px-4">الفرق</th>
                      <th className="text-right py-3 px-4">نسبة الاستخدام</th>
                      <th className="text-right py-3 px-4">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.map((item, index) => {
                      const usageRate = (item.actual / item.budget) * 100
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{item.category}</td>
                          <td className="py-3 px-4">{item.budget.toLocaleString('ar-SA')}</td>
                          <td className="py-3 px-4">{item.actual.toLocaleString('ar-SA')}</td>
                          <td className={`py-3 px-4 ${item.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.abs(item.variance).toLocaleString('ar-SA')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 ml-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    usageRate > 100 ? 'bg-red-500' : 
                                    usageRate > 80 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(usageRate, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm">{usageRate.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={item.variance < 0 ? 'default' : 'destructive'}>
                              {item.variance < 0 ? 'تحت الميزانية' : 'تجاوز الميزانية'}
                            </Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الميزانية التفصيلي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-gray-600">متوسط استخدام الميزانية</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600">فئات تحت الميزانية</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-gray-600">فئات تجاوزت الميزانية</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {budgetData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{item.category}</h3>
                      <Badge variant={item.variance < 0 ? 'default' : 'destructive'}>
                        {item.variance < 0 ? 'تحت الميزانية' : 'تجاوز الميزانية'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">الميزانية: </span>
                        <span className="font-medium">{item.budget.toLocaleString('ar-SA')} ريال</span>
                      </div>
                      <div>
                        <span className="text-gray-500">الفعلي: </span>
                        <span className="font-medium">{item.actual.toLocaleString('ar-SA')} ريال</span>
                      </div>
                      <div>
                        <span className="text-gray-500">الفرق: </span>
                        <span className={`font-medium ${item.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(item.variance).toLocaleString('ar-SA')} ريال
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قيمة الأصول والإهلاك</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">7.4M</div>
                  <div className="text-sm text-gray-600">إجمالي قيمة الأصول (ريال)</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">1.47M</div>
                  <div className="text-sm text-gray-600">إجمالي الإهلاك (ريال)</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">فئة الأصول</th>
                      <th className="text-right py-3 px-4">القيمة الحالية</th>
                      <th className="text-right py-3 px-4">الإهلاك التراكمي</th>
                      <th className="text-right py-3 px-4">نسبة الإهلاك</th>
                      <th className="text-right py-3 px-4">القيمة الدفترية</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetValueData.map((item, index) => {
                      const depreciationRate = (item.depreciation / (item.value + item.depreciation)) * 100
                      const bookValue = item.value
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{item.category}</td>
                          <td className="py-3 px-4">{item.value.toLocaleString('ar-SA')} ريال</td>
                          <td className="py-3 px-4">{item.depreciation.toLocaleString('ar-SA')} ريال</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-12 bg-gray-200 rounded-full h-2 ml-2">
                                <div 
                                  className="h-2 rounded-full bg-orange-500"
                                  style={{ width: `${depreciationRate}%` }}
                                />
                              </div>
                              <span className="text-sm">{depreciationRate.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold">{bookValue.toLocaleString('ar-SA')} ريال</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الاتجاهات الشهرية للتكاليف</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">86,000</div>
                  <div className="text-sm text-gray-600">متوسط التكلفة الشهرية (ريال)</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12%</div>
                  <div className="text-sm text-gray-600">معدل النمو السنوي</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4">الشهر</th>
                      <th className="text-right py-3 px-4">الصيانة</th>
                      <th className="text-right py-3 px-4">قطع الغيار</th>
                      <th className="text-right py-3 px-4">العمالة</th>
                      <th className="text-right py-3 px-4">الإجمالي</th>
                      <th className="text-right py-3 px-4">التغيير</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyTrends.map((month, index) => {
                      const prevMonthTotal = index > 0 ? monthlyTrends[index - 1].total : month.total
                      const change = ((month.total - prevMonthTotal) / prevMonthTotal) * 100
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{month.month}</td>
                          <td className="py-3 px-4">{month.maintenance.toLocaleString('ar-SA')}</td>
                          <td className="py-3 px-4">{month.parts.toLocaleString('ar-SA')}</td>
                          <td className="py-3 px-4">{month.labor.toLocaleString('ar-SA')}</td>
                          <td className="py-3 px-4 font-semibold">{month.total.toLocaleString('ar-SA')}</td>
                          <td className="py-3 px-4">
                            {index > 0 && (
                              <span className={`text-sm font-medium ${
                                change > 0 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {change > 0 ? '+' : ''}{change.toFixed(1)}%
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}