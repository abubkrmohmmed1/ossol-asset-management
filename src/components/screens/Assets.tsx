'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Filter, Edit, Eye, Trash2, Power, AlertTriangle, Calendar, Clock, DollarSign, Wrench, Activity, TrendingUp, History, Settings } from 'lucide-react'

interface Asset {
  id: string
  name: string
  type: string
  status: 'نشط' | 'تحت الصيانة' | 'خارج الخدمة'
  location: string
  value: string
  lastMaintenance: string
  nextMaintenance: string
  description: string
  healthScore: number
  purchaseDate: string
  warrantyExpiry: string
  expectedLifespan: number
  currentAge: number
  maintenanceCost: number
  downtimeHours: number
  utilizationRate: number
}

interface LifecycleEvent {
  id: string
  date: string
  type: 'شراء' | 'صيانة' | 'عطل' | 'ترقية' | 'نقل'
  description: string
  cost: number
  performedBy: string
}

export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 'AST-001',
      name: 'الخادم الرئيسي - دلتا',
      type: 'معدات تقنية',
      status: 'نشط',
      location: 'مركز البيانات الرئيسي',
      value: '250,000 ريال',
      lastMaintenance: '2025-10-01',
      nextMaintenance: '2025-11-01',
      description: 'خادم رئيسي للشركة يحتوي على جميع التطبيقات الأساسية',
      healthScore: 85,
      purchaseDate: '2022-01-15',
      warrantyExpiry: '2025-01-15',
      expectedLifespan: 5,
      currentAge: 3.8,
      maintenanceCost: 15000,
      downtimeHours: 24,
      utilizationRate: 92
    },
    {
      id: 'AST-002',
      name: 'رافعة شوكية #3',
      type: 'معدات ثقيلة',
      status: 'تحت الصيانة',
      location: 'المستودع رقم 2',
      value: '85,000 ريال',
      lastMaintenance: '2025-10-15',
      nextMaintenance: '2025-11-15',
      description: 'رافعة شوكية كهربائية لرفع البضائع في المستودع',
      healthScore: 65,
      purchaseDate: '2021-06-20',
      warrantyExpiry: '2024-06-20',
      expectedLifespan: 10,
      currentAge: 4.3,
      maintenanceCost: 8500,
      downtimeHours: 48,
      utilizationRate: 78
    },
    {
      id: 'AST-003',
      name: 'مولد الطاقة #002',
      type: 'معدات طاقة',
      status: 'نشط',
      location: 'المبنى الإداري',
      value: '120,000 ريال',
      lastMaintenance: '2025-09-20',
      nextMaintenance: '2025-10-20',
      description: 'مولد طاقة احتياطي للطوارئ',
      healthScore: 72,
      purchaseDate: '2020-03-10',
      warrantyExpiry: '2023-03-10',
      expectedLifespan: 15,
      currentAge: 5.6,
      maintenanceCost: 12000,
      downtimeHours: 12,
      utilizationRate: 15
    },
    {
      id: 'AST-004',
      name: 'نظام التكييف المركزي',
      type: 'أنظمة تهوية',
      status: 'نشط',
      location: 'جميع الأقسام',
      value: '180,000 ريال',
      lastMaintenance: '2025-10-05',
      nextMaintenance: '2025-11-05',
      description: 'نظام تكييف مركزي للمباني الإدارية',
      healthScore: 90,
      purchaseDate: '2021-08-01',
      warrantyExpiry: '2024-08-01',
      expectedLifespan: 12,
      currentAge: 4.2,
      maintenanceCost: 18000,
      downtimeHours: 8,
      utilizationRate: 85
    },
    {
      id: 'AST-005',
      name: 'مضخة المياه الرئيسية',
      type: 'معدات المياه',
      status: 'خارج الخدمة',
      location: 'المبنى الرئيسي',
      value: '45,000 ريال',
      lastMaintenance: '2025-09-15',
      nextMaintenance: '2025-10-15',
      description: 'مضخة مياه رئيسية للطوارئ',
      healthScore: 25,
      purchaseDate: '2019-12-05',
      warrantyExpiry: '2022-12-05',
      expectedLifespan: 8,
      currentAge: 5.9,
      maintenanceCost: 6500,
      downtimeHours: 72,
      utilizationRate: 5
    }
  ])

  const [lifecycleEvents] = useState<LifecycleEvent[]>([
    {
      id: 'EVT-001',
      date: '2022-01-15',
      type: 'شراء',
      description: 'شراء الخادم الرئيسي من Dell',
      cost: 250000,
      performedBy: 'قسم المشتريات'
    },
    {
      id: 'EVT-002',
      date: '2025-10-01',
      type: 'صيانة',
      description: 'صيانة دورية للخادم وتحديث النظام',
      cost: 2500,
      performedBy: 'فريق IT'
    },
    {
      id: 'EVT-003',
      date: '2024-06-15',
      type: 'عطل',
      description: 'عطل في القرص الصلب وتغييره',
      cost: 8000,
      performedBy: 'فريق الصيانة'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const [newAsset, setNewAsset] = useState({
    name: '',
    type: '',
    location: '',
    value: '',
    description: '',
    purchaseDate: '',
    warrantyExpiry: '',
    expectedLifespan: 5
  })

  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || asset.type === typeFilter
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>
      case 'تحت الصيانة':
        return <Badge className="bg-yellow-100 text-yellow-800">تحت الصيانة</Badge>
      case 'خارج الخدمة':
        return <Badge className="bg-red-100 text-red-800">خارج الخدمة</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getLifecyclePhase = (asset: Asset) => {
    const agePercentage = (asset.currentAge / asset.expectedLifespan) * 100
    if (agePercentage < 25) return { phase: 'جديد', color: 'text-green-600', bgColor: 'bg-green-100' }
    if (agePercentage < 50) return { phase: 'نضج', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (agePercentage < 75) return { phase: 'شيخوخة', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    return { phase: 'نهاية العمر', color: 'text-red-600', bgColor: 'bg-red-100' }
  }

  const handleAddAsset = () => {
    const asset: Asset = {
      id: `AST-${String(assets.length + 1).padStart(3, '0')}`,
      name: newAsset.name,
      type: newAsset.type,
      status: 'نشط',
      location: newAsset.location,
      value: newAsset.value,
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: newAsset.description,
      healthScore: 100,
      purchaseDate: newAsset.purchaseDate,
      warrantyExpiry: newAsset.warrantyExpiry,
      expectedLifespan: newAsset.expectedLifespan,
      currentAge: 0,
      maintenanceCost: 0,
      downtimeHours: 0,
      utilizationRate: 0
    }
    setAssets([...assets, asset])
    setNewAsset({ 
      name: '', 
      type: '', 
      location: '', 
      value: '', 
      description: '',
      purchaseDate: '',
      warrantyExpiry: '',
      expectedLifespan: 5
    })
    setIsAddDialogOpen(false)
  }

  const handleEditAsset = () => {
    if (editingAsset) {
      setAssets(assets.map(asset => 
        asset.id === editingAsset.id ? editingAsset : asset
      ))
      setIsEditDialogOpen(false)
      setEditingAsset(null)
    }
  }

  const handleDeleteAsset = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الأصل؟')) {
      setAssets(assets.filter(asset => asset.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        const newStatus = asset.status === 'نشط' ? 'خارج الخدمة' : 'نشط'
        return { ...asset, status: newStatus }
      }
      return asset
    }))
  }

  const AssetCard = ({ asset }: { asset: Asset }) => {
    const lifecycle = getLifecyclePhase(asset)
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">{asset.name}</h3>
              <p className="text-sm text-gray-500">{asset.id}</p>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              {getStatusBadge(asset.status)}
              <div className={`text-sm font-bold ${getHealthScoreColor(asset.healthScore)}`}>
                {asset.healthScore}%
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">النوع:</span>
              <span>{asset.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">الموقع:</span>
              <span>{asset.location}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">القيمة:</span>
              <span>{asset.value}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">مرحلة العمر:</span>
              <Badge className={lifecycle.bgColor}>{lifecycle.phase}</Badge>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{asset.description}</p>
          
          <div className="flex space-x-2 space-x-reverse">
            <Button size="sm" variant="outline" onClick={() => setSelectedAsset(asset)}>
              <Eye className="w-4 h-4 ml-1" />
              عرض
            </Button>
            <Button size="sm" variant="outline" onClick={() => {
              setEditingAsset(asset)
              setIsEditDialogOpen(true)
            }}>
              <Edit className="w-4 h-4 ml-1" />
              تعديل
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleToggleStatus(asset.id)}
            >
              <Power className="w-4 h-4 ml-1" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleDeleteAsset(asset.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">قائمة الأصول</h1>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              onClick={() => setViewMode('table')}
            >
              جدول
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              onClick={() => setViewMode('cards')}
            >
              بطاقات
            </Button>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 ml-2" />
                إضافة أصل جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>إضافة أصل جديد</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">اسم الأصل</Label>
                  <Input
                    id="name"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">النوع</Label>
                  <Select value={newAsset.type} onValueChange={(value) => setNewAsset({...newAsset, type: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="معدات تقنية">معدات تقنية</SelectItem>
                      <SelectItem value="معدات ثقيلة">معدات ثقيلة</SelectItem>
                      <SelectItem value="معدات طاقة">معدات طاقة</SelectItem>
                      <SelectItem value="أنظمة تهوية">أنظمة تهوية</SelectItem>
                      <SelectItem value="معدات المياه">معدات المياه</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">الموقع</Label>
                  <Input
                    id="location"
                    value={newAsset.location}
                    onChange={(e) => setNewAsset({...newAsset, location: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="value" className="text-right">القيمة</Label>
                  <Input
                    id="value"
                    value={newAsset.value}
                    onChange={(e) => setNewAsset({...newAsset, value: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="purchaseDate" className="text-right">تاريخ الشراء</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={newAsset.purchaseDate}
                    onChange={(e) => setNewAsset({...newAsset, purchaseDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="warrantyExpiry" className="text-right">انتهاء الضمان</Label>
                  <Input
                    id="warrantyExpiry"
                    type="date"
                    value={newAsset.warrantyExpiry}
                    onChange={(e) => setNewAsset({...newAsset, warrantyExpiry: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expectedLifespan" className="text-right">العمر المتوقع (سنوات)</Label>
                  <Input
                    id="expectedLifespan"
                    type="number"
                    value={newAsset.expectedLifespan}
                    onChange={(e) => setNewAsset({...newAsset, expectedLifespan: parseInt(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">الوصف</Label>
                  <Textarea
                    id="description"
                    value={newAsset.description}
                    onChange={(e) => setNewAsset({...newAsset, description: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddAsset}>حفظ</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">فلترة:</span>
            </div>
            
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ابحث عن أصل..."
                className="pr-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الأنواع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="معدات تقنية">معدات تقنية</SelectItem>
                <SelectItem value="معدات ثقيلة">معدات ثقيلة</SelectItem>
                <SelectItem value="معدات طاقة">معدات طاقة</SelectItem>
                <SelectItem value="أنظمة تهوية">أنظمة تهوية</SelectItem>
                <SelectItem value="معدات المياه">معدات المياه</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="نشط">نشط</SelectItem>
                <SelectItem value="تحت الصيانة">تحت الصيانة</SelectItem>
                <SelectItem value="خارج الخدمة">خارج الخدمة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assets Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>الأصول ({filteredAssets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الأصل</TableHead>
                  <TableHead>اسم الأصل</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الموقع</TableHead>
                  <TableHead>القيمة</TableHead>
                  <TableHead>مؤشر الصحة</TableHead>
                  <TableHead>مرحلة العمر</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => {
                  const lifecycle = getLifecyclePhase(asset)
                  return (
                    <TableRow key={asset.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{asset.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{asset.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{asset.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{getStatusBadge(asset.status)}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                      <TableCell>{asset.value}</TableCell>
                      <TableCell>
                        <div className={`font-bold ${getHealthScoreColor(asset.healthScore)}`}>
                          {asset.healthScore}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={lifecycle.bgColor}>{lifecycle.phase}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline" onClick={() => setSelectedAsset(asset)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setEditingAsset(asset)
                            setIsEditDialogOpen(true)
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleToggleStatus(asset.id)}>
                            <Power className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Asset Details Dialog */}
      <Dialog open={!!selectedAsset && !isEditDialogOpen} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل الأصل - {selectedAsset?.name}</DialogTitle>
          </DialogHeader>
          {selectedAsset && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
                <TabsTrigger value="lifecycle">دورة الحياة</TabsTrigger>
                <TabsTrigger value="performance">الأداء</TabsTrigger>
                <TabsTrigger value="financial">المالية</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-right font-semibold">رقم الأصل</Label>
                    <p className="text-sm">{selectedAsset.id}</p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">الحالة</Label>
                    <div>{getStatusBadge(selectedAsset.status)}</div>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">النوع</Label>
                    <p className="text-sm">{selectedAsset.type}</p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">الموقع</Label>
                    <p className="text-sm">{selectedAsset.location}</p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">القيمة</Label>
                    <p className="text-sm">{selectedAsset.value}</p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">مؤشر الصحة</Label>
                    <p className={`text-sm font-bold ${getHealthScoreColor(selectedAsset.healthScore)}`}>
                      {selectedAsset.healthScore}%
                    </p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">آخر صيانة</Label>
                    <p className="text-sm">{selectedAsset.lastMaintenance}</p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">الصيانة القادمة</Label>
                    <p className="text-sm">{selectedAsset.nextMaintenance}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-right font-semibold">الوصف</Label>
                  <p className="text-sm mt-1">{selectedAsset.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="lifecycle" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-right font-semibold">تاريخ الشراء</Label>
                    <p className="text-sm">{selectedAsset.purchaseDate}</p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">انتهاء الضمان</Label>
                    <p className="text-sm">{selectedAsset.warrantyExpiry}</p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">العمر الحالي (سنوات)</Label>
                    <p className="text-sm">{selectedAsset.currentAge}</p>
                  </div>
                  <div>
                    <Label className="text-right font-semibold">العمر المتوقع (سنوات)</Label>
                    <p className="text-sm">{selectedAsset.expectedLifespan}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label className="text-right font-semibold mb-4 block">مراحل دورة الحياة</Label>
                  <div className="relative">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">جديد</span>
                      <span className="text-sm">نضج</span>
                      <span className="text-sm">شيخوخة</span>
                      <span className="text-sm">نهاية العمر</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${(selectedAsset.currentAge / selectedAsset.expectedLifespan) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2">
                      <Badge className={getLifecyclePhase(selectedAsset).bgColor}>
                        {getLifecyclePhase(selectedAsset).phase}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Label className="text-right font-semibold mb-4 block">سجل الأحداث</Label>
                  <div className="space-y-2">
                    {lifecycleEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-semibold">{event.description}</p>
                            <p className="text-xs text-gray-500">{event.date} • {event.performedBy}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold">{event.cost.toLocaleString()} ريال</p>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">معدل الاستخدام</p>
                          <p className="text-2xl font-bold">{selectedAsset.utilizationRate}%</p>
                        </div>
                        <Activity className="w-8 h-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">ساعات التوقف</p>
                          <p className="text-2xl font-bold">{selectedAsset.downtimeHours}</p>
                        </div>
                        <Clock className="w-8 h-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">مؤشرات الأداء</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>مؤشر الصحة</span>
                          <span>{selectedAsset.healthScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${selectedAsset.healthScore >= 80 ? 'bg-green-500' : selectedAsset.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${selectedAsset.healthScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>معدل الاستخدام</span>
                          <span>{selectedAsset.utilizationRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${selectedAsset.utilizationRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">القيمة الحالية</p>
                          <p className="text-2xl font-bold">{selectedAsset.value}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">تكلفة الصيانة</p>
                          <p className="text-2xl font-bold">{selectedAsset.maintenanceCost.toLocaleString()} ريال</p>
                        </div>
                        <Wrench className="w-8 h-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">تحليل التكلفة</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">تكلفة الشراء الأولية</span>
                        <span className="text-sm font-semibold">{selectedAsset.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">إجمالي تكاليف الصيانة</span>
                        <span className="text-sm font-semibold">{selectedAsset.maintenanceCost.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">التكلفة السنوية المتوسطة</span>
                        <span className="text-sm font-semibold">{Math.round(selectedAsset.maintenanceCost / selectedAsset.currentAge).toLocaleString()} ريال</span>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold">إجمالي التكلفة</span>
                        <span className="text-sm font-bold">{(parseInt(selectedAsset.value.replace(/[^0-9]/g, '')) + selectedAsset.maintenanceCost).toLocaleString()} ريال</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
          <div className="flex justify-end space-x-2 space-x-reverse mt-6">
            <Button variant="outline" onClick={() => setSelectedAsset(null)}>
              إغلاق
            </Button>
            <Button onClick={() => {
              setEditingAsset(selectedAsset)
              setIsEditDialogOpen(true)
            }}>
              <Edit className="w-4 h-4 ml-2" />
              تعديل الأصل
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Asset Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open)
        if (!open) setEditingAsset(null)
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>تعديل الأصل</DialogTitle>
          </DialogHeader>
          {editingAsset && (
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">اسم الأصل</Label>
                <Input
                  id="edit-name"
                  value={editingAsset.name}
                  onChange={(e) => setEditingAsset({...editingAsset, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">النوع</Label>
                <Select value={editingAsset.type} onValueChange={(value) => setEditingAsset({...editingAsset, type: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="معدات تقنية">معدات تقنية</SelectItem>
                    <SelectItem value="معدات ثقيلة">معدات ثقيلة</SelectItem>
                    <SelectItem value="معدات طاقة">معدات طاقة</SelectItem>
                    <SelectItem value="أنظمة تهوية">أنظمة تهوية</SelectItem>
                    <SelectItem value="معدات المياه">معدات المياه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">الموقع</Label>
                <Input
                  id="edit-location"
                  value={editingAsset.location}
                  onChange={(e) => setEditingAsset({...editingAsset, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">القيمة</Label>
                <Input
                  id="edit-value"
                  value={editingAsset.value}
                  onChange={(e) => setEditingAsset({...editingAsset, value: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">الحالة</Label>
                <Select value={editingAsset.status} onValueChange={(value: any) => setEditingAsset({...editingAsset, status: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نشط">نشط</SelectItem>
                    <SelectItem value="تحت الصيانة">تحت الصيانة</SelectItem>
                    <SelectItem value="خارج الخدمة">خارج الخدمة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">الوصف</Label>
                <Textarea
                  id="edit-description"
                  value={editingAsset.description}
                  onChange={(e) => setEditingAsset({...editingAsset, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2 space-x-reverse">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditAsset}>حفظ التغييرات</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}