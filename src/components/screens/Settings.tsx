'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Bell, 
  Globe, 
  Shield, 
  Database, 
  Link, 
  CheckCircle, 
  AlertCircle, 
  Settings as SettingsIcon, 
  RefreshCw,
  Key,
  Server,
  Cloud,
  TestTube
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useTranslation } from '@/lib/locales'

interface ERPSystem {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  status: 'connected' | 'disconnected' | 'configured' | 'error'
  lastSync?: string
  features: string[]
  configFields: {
    apiUrl: string
    apiKey: string
    username: string
    password: string
    database: string
  }
}

export default function SettingsComponent() {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedERP, setSelectedERP] = useState<ERPSystem | null>(null)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [isTestConnectionOpen, setIsTestConnectionOpen] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)
  const { language } = useAppStore()
  const t = useTranslation(language)

  const [erpSystems, setErpSystems] = useState<ERPSystem[]>([
    {
      id: 'sap-eam',
      name: 'SAP EAM',
      description: language === 'ar' ? 'نظام إدارة أصول المؤسسات من SAP' : 'Enterprise Asset Management from SAP',
      icon: <Server className="w-6 h-6" />,
      status: 'disconnected',
      features: [
        language === 'ar' ? 'إدارة الأصول' : 'Asset Management',
        language === 'ar' ? 'الصيانة الوقائية' : 'Preventive Maintenance',
        language === 'ar' ? 'المخزون' : 'Inventory',
        language === 'ar' ? 'المشتريات' : 'Procurement'
      ],
      configFields: {
        apiUrl: '',
        apiKey: '',
        username: '',
        password: '',
        database: ''
      }
    },
    {
      id: 'oracle-eam',
      name: 'Oracle EAM',
      description: language === 'ar' ? 'حل إدارة الأصول من أوراكل' : 'Asset Management Solution from Oracle',
      icon: <Database className="w-6 h-6" />,
      status: 'disconnected',
      features: [
        language === 'ar' ? 'إدارة دورة حياة الأصول' : 'Asset Lifecycle Management',
        language === 'ar' ? 'الصيانة' : 'Maintenance',
        language === 'ar' ? 'الموارد' : 'Resources',
        language === 'ar' ? 'التحليلات' : 'Analytics'
      ],
      configFields: {
        apiUrl: '',
        apiKey: '',
        username: '',
        password: '',
        database: ''
      }
    },
    {
      id: 'ibm-maximo',
      name: 'IBM Maximo',
      description: language === 'ar' ? 'نظام إدارة الأصول من IBM' : 'Asset Management System from IBM',
      icon: <Cloud className="w-6 h-6" />,
      status: 'configured',
      lastSync: '2025-10-16 14:30',
      features: [
        language === 'ar' ? 'إدارة الأصول' : 'Asset Management',
        language === 'ar' ? 'إدارة العمل' : 'Work Management',
        language === 'ar' ? 'المخزون' : 'Inventory',
        language === 'ar' ? 'المشتريات' : 'Procurement',
        language === 'ar' ? 'التحليلات المتقدمة' : 'Advanced Analytics'
      ],
      configFields: {
        apiUrl: 'https://maximo.company.com/api',
        apiKey: '****',
        username: 'admin',
        password: '****',
        database: 'MAXDB'
      }
    },
    {
      id: 'odoo',
      name: 'Odoo EAM',
      description: language === 'ar' ? 'نظام إدارة الأصول مفتوح المصدر' : 'Open Source Asset Management System',
      icon: <SettingsIcon className="w-6 h-6" />,
      status: 'connected',
      lastSync: '2025-10-16 15:45',
      features: [
        language === 'ar' ? 'إدارة الأصول' : 'Asset Management',
        language === 'ar' ? 'الصيانة' : 'Maintenance',
        language === 'ar' ? 'المخزون' : 'Inventory',
        language === 'ar' ? 'المشتريات' : 'Procurement',
        language === 'ar' ? 'تقارير مخصصة' : 'Custom Reports'
      ],
      configFields: {
        apiUrl: 'https://odoo.company.com',
        apiKey: '****',
        username: 'api_user',
        password: '****',
        database: 'production'
      }
    }
  ])

  const [erpConfig, setErpConfig] = useState({
    apiUrl: '',
    apiKey: '',
    username: '',
    password: '',
    database: ''
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">{language === 'ar' ? 'متصل' : 'Connected'}</Badge>
      case 'configured':
        return <Badge className="bg-blue-100 text-blue-800">{language === 'ar' ? 'مهيأ' : 'Configured'}</Badge>
      case 'disconnected':
        return <Badge className="bg-gray-100 text-gray-800">{language === 'ar' ? 'غير متصل' : 'Disconnected'}</Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800">{language === 'ar' ? 'خطأ' : 'Error'}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'configured':
        return <SettingsIcon className="w-5 h-5 text-blue-600" />
      case 'disconnected':
        return <AlertCircle className="w-5 h-5 text-gray-600" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const handleConfigureERP = (erp: ERPSystem) => {
    setSelectedERP(erp)
    setErpConfig(erp.configFields)
    setIsConfigDialogOpen(true)
  }

  const handleSaveConfig = () => {
    if (selectedERP) {
      setErpSystems(erpSystems.map(erp => 
        erp.id === selectedERP.id 
          ? { ...erp, configFields: erpConfig, status: 'configured' as const }
          : erp
      ))
      setIsConfigDialogOpen(false)
      setSelectedERP(null)
    }
  }

  const handleTestConnection = async (erp: ERPSystem) => {
    setIsTestConnectionOpen(true)
    setSelectedERP(erp)
    
    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% success rate for demo
      setTestResult(success ? 'success' : 'error')
      
      if (success) {
        setErpSystems(erpSystems.map(sys => 
          sys.id === erp.id 
            ? { ...sys, status: 'connected' as const, lastSync: new Date().toLocaleString() }
            : sys
        ))
      }
    }, 2000)
  }

  const handleSync = (erpId: string) => {
    setErpSystems(erpSystems.map(erp => 
      erp.id === erpId 
        ? { ...erp, lastSync: new Date().toLocaleString() }
        : erp
    ))
    alert(language === 'ar' ? 'تم بدء المزامنة مع نظام ERP' : 'Started sync with ERP system')
  }

  const handleDisconnect = (erpId: string) => {
    setErpSystems(erpSystems.map(erp => 
      erp.id === erpId 
        ? { ...erp, status: 'disconnected' as const, lastSync: undefined }
        : erp
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t.settings}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">{t.account}</TabsTrigger>
          <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
          <TabsTrigger value="language">{t.appearance}</TabsTrigger>
          <TabsTrigger value="erp">{t.erpIntegration}</TabsTrigger>
          <TabsTrigger value="system">{t.security}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 ml-2" />
                {t.account}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
                  <Input id="name" defaultValue={language === 'ar' ? 'سلطان الأحمد' : 'Sultan Ahmed'} />
                </div>
                <div>
                  <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <Input id="email" defaultValue="sultan.ahmed@ossol.com" />
                </div>
                <div>
                  <Label htmlFor="phone">{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</Label>
                  <Input id="phone" defaultValue="+966 50 123 4567" />
                </div>
                <div>
                  <Label htmlFor="department">{language === 'ar' ? 'القسم' : 'Department'}</Label>
                  <Select defaultValue="assets">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assets">{language === 'ar' ? 'إدارة الأصول' : 'Asset Management'}</SelectItem>
                      <SelectItem value="maintenance">{language === 'ar' ? 'الصيانة' : 'Maintenance'}</SelectItem>
                      <SelectItem value="it">{language === 'ar' ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                      <SelectItem value="finance">{language === 'ar' ? 'المالية' : 'Finance'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="bio">{language === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
                <Textarea id="bio" placeholder={language === 'ar' ? 'ملاحظات إضافية...' : 'Additional notes...'} />
              </div>
              <Button>{t.save}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 ml-2" />
                {t.notifications}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}</Label>
                  <p className="text-sm text-gray-500">{language === 'ar' ? 'تلقي إشعارات هامة عبر البريد الإلكتروني' : 'Receive important notifications via email'}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'ar' ? 'إشعارات الصيانة' : 'Maintenance Notifications'}</Label>
                  <p className="text-sm text-gray-500">{language === 'ar' ? 'تنبيهات حول مواعيد الصيانة المجدولة' : 'Alerts about scheduled maintenance'}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'ar' ? 'التنبيهات العاجلة' : 'Urgent Alerts'}</Label>
                  <p className="text-sm text-gray-500">{language === 'ar' ? 'إشعارات فورية للمشكلات الحرجة' : 'Instant notifications for critical issues'}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'ar' ? 'التقارير الدورية' : 'Periodic Reports'}</Label>
                  <p className="text-sm text-gray-500">{language === 'ar' ? 'تلقي تقارير أسبوعية وشهرية' : 'Receive weekly and monthly reports'}</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 ml-2" />
                {t.appearance}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">{language === 'ar' ? 'اللغة المفضلة' : 'Preferred Language'}</Label>
                <Select defaultValue={language}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">{language === 'ar' ? 'العربية' : 'Arabic'}</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timezone">{language === 'ar' ? 'المنطقة الزمنية' : 'Timezone'}</Label>
                <Select defaultValue="utc+3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc+3">{language === 'ar' ? 'توقيت السعودية (UTC+3)' : 'Saudi Time (UTC+3)'}</SelectItem>
                    <SelectItem value="utc+2">{language === 'ar' ? 'توقيت مصر (UTC+2)' : 'Egypt Time (UTC+2)'}</SelectItem>
                    <SelectItem value="utc+2">{language === 'ar' ? 'توقيت السودان (UTC+2)' : 'Sudan Time (UTC+2)'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currency">{language === 'ar' ? 'عملة العرض' : 'Display Currency'}</Label>
                <Select defaultValue="sar">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sar">{language === 'ar' ? 'ريال سعودي (SAR)' : 'Saudi Riyal (SAR)'}</SelectItem>
                    <SelectItem value="sdg">{language === 'ar' ? 'جنيه سوداني (SDG)' : 'Sudanese Pound (SDG)'}</SelectItem>
                    <SelectItem value="egp">{language === 'ar' ? 'جنيه مصري (EGP)' : 'Egyptian Pound (EGP)'}</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="erp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="w-5 h-5 ml-2" />
                {t.erpIntegration}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 
                    'قم بتوصيل OSSOL بأنظمة إدارة الموارد المؤسسية الخاصة بك لمزامنة البيانات وتحسين الكفاءة.' :
                    'Connect OSSOL with your ERP systems to sync data and improve efficiency.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {erpSystems.map((erp) => (
                  <Card key={erp.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg ml-3">
                            {erp.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{erp.name}</h3>
                            <p className="text-sm text-gray-500">{erp.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(erp.status)}
                          {getStatusBadge(erp.status)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">{language === 'ar' ? 'المميزات:' : 'Features:'}</h4>
                        <div className="flex flex-wrap gap-1">
                          {erp.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {erp.lastSync && (
                        <div className="mb-4 p-2 bg-gray-50 rounded">
                          <div className="flex items-center text-sm text-gray-600">
                            <RefreshCw className="w-4 h-4 ml-2" />
                            {language === 'ar' ? 'آخر مزامنة:' : 'Last sync:'} {erp.lastSync}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleConfigureERP(erp)}
                        >
                          <Key className="w-4 h-4 ml-1" />
                          {language === 'ar' ? 'إعدادات' : 'Configure'}
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleTestConnection(erp)}
                        >
                          <TestTube className="w-4 h-4 ml-1" />
                          {language === 'ar' ? 'اختبار' : 'Test'}
                        </Button>

                        {erp.status === 'connected' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSync(erp.id)}
                            >
                              <RefreshCw className="w-4 h-4 ml-1" />
                              {language === 'ar' ? 'مزامنة' : 'Sync'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDisconnect(erp.id)}
                            >
                              {language === 'ar' ? 'قطع الاتصال' : 'Disconnect'}
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 ml-2" />
                {language === 'ar' ? 'حالة النظام' : 'System Status'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>{language === 'ar' ? 'حالة الاتصال بقاعدة البيانات' : 'Database Connection'}</span>
                  <Badge className="bg-green-100 text-green-800">{language === 'ar' ? 'متصل' : 'Connected'}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === 'ar' ? 'خدمة الإشعارات' : 'Notification Service'}</span>
                  <Badge className="bg-green-100 text-green-800">{language === 'ar' ? 'نشطة' : 'Active'}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === 'ar' ? 'النسخ الاحتياطي التلقائي' : 'Auto Backup'}</span>
                  <Badge className="bg-green-100 text-green-800">{language === 'ar' ? 'يعمل' : 'Running'}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === 'ar' ? 'آخر نسخ احتياطي' : 'Last Backup'}</span>
                  <span className="text-sm text-gray-500">{language === 'ar' ? 'منذ 6 ساعات' : '6 hours ago'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === 'ar' ? 'إصدار النظام' : 'System Version'}</span>
                  <span className="text-sm text-gray-500">v2.1.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ERP Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'إعدادات الاتصال' : 'Connection Settings'} - {selectedERP?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiUrl" className="text-right">
                {language === 'ar' ? 'رابط API' : 'API URL'}
              </Label>
              <Input
                id="apiUrl"
                value={erpConfig.apiUrl}
                onChange={(e) => setErpConfig({...erpConfig, apiUrl: e.target.value})}
                className="col-span-3"
                placeholder={language === 'ar' ? 'أدخل رابط API' : 'Enter API URL'}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                {language === 'ar' ? 'مفتاح API' : 'API Key'}
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={erpConfig.apiKey}
                onChange={(e) => setErpConfig({...erpConfig, apiKey: e.target.value})}
                className="col-span-3"
                placeholder={language === 'ar' ? 'أدخل مفتاح API' : 'Enter API Key'}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                {language === 'ar' ? 'اسم المستخدم' : 'Username'}
              </Label>
              <Input
                id="username"
                value={erpConfig.username}
                onChange={(e) => setErpConfig({...erpConfig, username: e.target.value})}
                className="col-span-3"
                placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                value={erpConfig.password}
                onChange={(e) => setErpConfig({...erpConfig, password: e.target.value})}
                className="col-span-3"
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="database" className="text-right">
                {language === 'ar' ? 'قاعدة البيانات' : 'Database'}
              </Label>
              <Input
                id="database"
                value={erpConfig.database}
                onChange={(e) => setErpConfig({...erpConfig, database: e.target.value})}
                className="col-span-3"
                placeholder={language === 'ar' ? 'أدخل اسم قاعدة البيانات' : 'Enter database name'}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 space-x-reverse">
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSaveConfig}>
              {t.saveConfiguration}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Test Connection Dialog */}
      <Dialog open={isTestConnectionOpen} onOpenChange={setIsTestConnectionOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'اختبار الاتصال' : 'Test Connection'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {!testResult ? (
              <div className="flex items-center justify-center py-6">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                <span className="mr-3">
                  {language === 'ar' ? 'جاري اختبار الاتصال...' : 'Testing connection...'}
                </span>
              </div>
            ) : testResult === 'success' ? (
              <div className="flex items-center justify-center py-6 text-green-600">
                <CheckCircle className="w-8 h-8 ml-3" />
                <span>
                  {language === 'ar' ? 'تم الاتصال بنجاح!' : 'Connection successful!'}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center py-6 text-red-600">
                <AlertCircle className="w-8 h-8 ml-3" />
                <span>
                  {language === 'ar' ? 'فشل الاتصال. يرجى التحقق من الإعدادات.' : 'Connection failed. Please check your settings.'}
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsTestConnectionOpen(false)}>
              {language === 'ar' ? 'موافق' : 'OK'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}