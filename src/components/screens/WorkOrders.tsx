'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, AlertTriangle, Clock, CheckCircle, Play, Pause, Eye, Edit } from 'lucide-react'

interface WorkOrder {
  id: string
  assetName: string
  assetId: string
  priority: 'عالية' | 'متوسطة' | 'منخفضة'
  status: 'جديد' | 'قيد التنفيذ' | 'مكتمل' | 'ملغي'
  assignedTo: string
  createdDate: string
  dueDate: string
  description: string
  estimatedCost: number
  actualCost: number
  notes: string
}

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: 'WO-00452',
      assetName: 'الخادم الرئيسي - دلتا',
      assetId: 'AST-001',
      priority: 'عالية',
      status: 'جديد',
      assignedTo: 'فريق IT',
      createdDate: '2025-10-16',
      dueDate: '2025-10-18',
      description: 'فحص النظام وإجراء التحديثات الأمنية',
      estimatedCost: 5000,
      actualCost: 0,
      notes: 'تحديثات أمنية هامة للنظام'
    },
    {
      id: 'WO-00451',
      assetName: 'رافعة شوكية #3',
      assetId: 'AST-002',
      priority: 'متوسطة',
      status: 'مكتمل',
      assignedTo: 'علي محمد',
      createdDate: '2025-10-15',
      dueDate: '2025-10-17',
      description: 'صيانة دورية وتغيير الزيوت',
      estimatedCost: 3000,
      actualCost: 2800,
      notes: 'تم تغيير الزيوت والفلاتر'
    },
    {
      id: 'WO-00450',
      assetName: 'مولد الطاقة #002',
      assetId: 'AST-003',
      priority: 'منخفضة',
      status: 'قيد التنفيذ',
      assignedTo: 'فريق الصيانة',
      createdDate: '2025-10-14',
      dueDate: '2025-10-20',
      description: 'فحص مستوى الوقود وتنظيف الفلاتر',
      estimatedCost: 1500,
      actualCost: 1200,
      notes: 'جاري التنظيف والفحص'
    },
    {
      id: 'WO-00449',
      assetName: 'نظام التكييف المركزي',
      assetId: 'AST-004',
      priority: 'عالية',
      status: 'قيد التنفيذ',
      assignedTo: 'أحمد خالد',
      createdDate: '2025-10-13',
      dueDate: '2025-10-16',
      description: 'إصلاح تسريب في وحدة التبريد الرئيسية',
      estimatedCost: 8000,
      actualCost: 7500,
      notes: 'تم تحديد موقع التسريب'
    }
  ])

  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [newOrder, setNewOrder] = useState({
    assetName: '',
    priority: 'متوسطة',
    assignedTo: '',
    dueDate: '',
    description: '',
    estimatedCost: ''
  })

  const filteredOrders = workOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'عالية':
        return <Badge className="bg-red-100 text-red-800">عالية</Badge>
      case 'متوسطة':
        return <Badge className="bg-yellow-100 text-yellow-800">متوسطة</Badge>
      case 'منخفضة':
        return <Badge className="bg-green-100 text-green-800">منخفضة</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'جديد':
        return <Badge className="bg-blue-100 text-blue-800">جديد</Badge>
      case 'قيد التنفيذ':
        return <Badge className="bg-orange-100 text-orange-800">قيد التنفيذ</Badge>
      case 'مكتمل':
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
      case 'ملغي':
        return <Badge className="bg-gray-100 text-gray-800">ملغي</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'جديد': return <Clock className="w-4 h-4" />
      case 'قيد التنفيذ': return <Play className="w-4 h-4" />
      case 'مكتمل': return <CheckCircle className="w-4 h-4" />
      case 'ملغي': return <Pause className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleAddOrder = () => {
    const order: WorkOrder = {
      id: `WO-${String(workOrders.length + 453).padStart(3, '0')}`,
      assetName: newOrder.assetName,
      assetId: 'AST-NEW',
      priority: newOrder.priority as 'عالية' | 'متوسطة' | 'منخفضة',
      status: 'جديد',
      assignedTo: newOrder.assignedTo,
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: newOrder.dueDate,
      description: newOrder.description,
      estimatedCost: parseInt(newOrder.estimatedCost) || 0,
      actualCost: 0,
      notes: ''
    }
    setWorkOrders([...workOrders, order])
    setNewOrder({
      assetName: '',
      priority: 'متوسطة',
      assignedTo: '',
      dueDate: '',
      description: '',
      estimatedCost: ''
    })
    setIsAddDialogOpen(false)
  }

  const updateOrderStatus = (id: string, newStatus: WorkOrder['status']) => {
    setWorkOrders(workOrders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  const getOrderStats = () => {
    const total = workOrders.length
    const newOrders = workOrders.filter(o => o.status === 'جديد').length
    const inProgress = workOrders.filter(o => o.status === 'قيد التنفيذ').length
    const completed = workOrders.filter(o => o.status === 'مكتمل').length
    const highPriority = workOrders.filter(o => o.priority === 'عالية').length
    
    return { total, newOrders, inProgress, completed, highPriority }
  }

  const stats = getOrderStats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">إدارة أوامر العمل</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 ml-2" />
              إنشاء أمر عمل
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إنشاء أمر عمل جديد</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="asset" className="text-right">اسم الأصل</Label>
                <Input
                  id="asset"
                  value={newOrder.assetName}
                  onChange={(e) => setNewOrder({...newOrder, assetName: e.target.value})}
                  className="col-span-3"
                  placeholder="اختر الأصل..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">الأولوية</Label>
                <Select value={newOrder.priority} onValueChange={(value) => setNewOrder({...newOrder, priority: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="عالية">عالية</SelectItem>
                    <SelectItem value="متوسطة">متوسطة</SelectItem>
                    <SelectItem value="منخفضة">منخفضة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assigned" className="text-right">المسؤول</Label>
                <Input
                  id="assigned"
                  value={newOrder.assignedTo}
                  onChange={(e) => setNewOrder({...newOrder, assignedTo: e.target.value})}
                  className="col-span-3"
                  placeholder="اسم المسؤول..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">تاريخ الاستحقاق</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newOrder.dueDate}
                  onChange={(e) => setNewOrder({...newOrder, dueDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">التكلفة المقدرة</Label>
                <Input
                  id="cost"
                  type="number"
                  value={newOrder.estimatedCost}
                  onChange={(e) => setNewOrder({...newOrder, estimatedCost: e.target.value})}
                  className="col-span-3"
                  placeholder="ريال"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">الوصف</Label>
                <Textarea
                  id="description"
                  value={newOrder.description}
                  onChange={(e) => setNewOrder({...newOrder, description: e.target.value})}
                  className="col-span-3"
                  placeholder="وصف العمل المطلوب..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddOrder}>إنشاء أمر العمل</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">إجمالي الأوامر</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.newOrders}</div>
            <div className="text-sm text-gray-600">أوامر جديدة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">قيد التنفيذ</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">مكتملة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
            <div className="text-sm text-gray-600">أولوية عالية</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="font-semibold">فلترة حسب:</span>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="كل الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="جديد">جديد</SelectItem>
                  <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                  <SelectItem value="مكتمل">مكتمل</SelectItem>
                  <SelectItem value="ملغي">ملغي</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="كل الأولويات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الأولويات</SelectItem>
                  <SelectItem value="عالية">عالية</SelectItem>
                  <SelectItem value="متوسطة">متوسطة</SelectItem>
                  <SelectItem value="منخفضة">منخفضة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>{stats.highPriority} أوامر عمل عالية الأولوية</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>أوامر العمل ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الأمر</TableHead>
                <TableHead>اسم الأصل</TableHead>
                <TableHead>الأولوية</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>المسؤول</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>تاريخ الاستحقاق</TableHead>
                <TableHead>التكلفة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{order.assetName}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{order.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </TableCell>
                  <TableCell>{order.assignedTo}</TableCell>
                  <TableCell>{order.createdDate}</TableCell>
                  <TableCell>
                    <div className={new Date(order.dueDate) < new Date() ? 'text-red-600 font-semibold' : ''}>
                      {order.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{order.estimatedCost.toLocaleString('ar-SA')} ريال</div>
                      {order.actualCost > 0 && (
                        <div className="text-xs text-green-600">
                          فعلي: {order.actualCost.toLocaleString('ar-SA')} ريال
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" variant="outline" onClick={() => {
                        setSelectedOrder(order)
                        setIsViewDialogOpen(true)
                      }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {order.status === 'جديد' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => updateOrderStatus(order.id, 'قيد التنفيذ')}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {order.status === 'قيد التنفيذ' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => updateOrderStatus(order.id, 'مكتمل')}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل أمر العمل</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-right font-semibold">رقم الأمر</Label>
                  <p className="text-sm">{selectedOrder.id}</p>
                </div>
                <div>
                  <Label className="text-right font-semibold">الأولوية</Label>
                  <div>{getPriorityBadge(selectedOrder.priority)}</div>
                </div>
                <div>
                  <Label className="text-right font-semibold">الحالة</Label>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {getStatusIcon(selectedOrder.status)}
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>
                <div>
                  <Label className="text-right font-semibold">المسؤول</Label>
                  <p className="text-sm">{selectedOrder.assignedTo}</p>
                </div>
                <div>
                  <Label className="text-right font-semibold">تاريخ الإنشاء</Label>
                  <p className="text-sm">{selectedOrder.createdDate}</p>
                </div>
                <div>
                  <Label className="text-right font-semibold">تاريخ الاستحقاق</Label>
                  <p className={`text-sm ${new Date(selectedOrder.dueDate) < new Date() ? 'text-red-600 font-semibold' : ''}`}>
                    {selectedOrder.dueDate}
                  </p>
                </div>
                <div>
                  <Label className="text-right font-semibold">التكلفة المقدرة</Label>
                  <p className="text-sm">{selectedOrder.estimatedCost.toLocaleString('ar-SA')} ريال</p>
                </div>
                <div>
                  <Label className="text-right font-semibold">التكلفة الفعلية</Label>
                  <p className="text-sm">{selectedOrder.actualCost.toLocaleString('ar-SA')} ريال</p>
                </div>
              </div>
              <div>
                <Label className="text-right font-semibold">اسم الأصل</Label>
                <p className="text-sm mt-1">{selectedOrder.assetName}</p>
              </div>
              <div>
                <Label className="text-right font-semibold">الوصف</Label>
                <p className="text-sm mt-1">{selectedOrder.description}</p>
              </div>
              {selectedOrder.notes && (
                <div>
                  <Label className="text-right font-semibold">ملاحظات</Label>
                  <p className="text-sm mt-1">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end space-x-2 space-x-reverse">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              إغلاق
            </Button>
            {selectedOrder && selectedOrder.status !== 'مكتمل' && (
              <Button onClick={() => {
                if (selectedOrder.status === 'جديد') {
                  updateOrderStatus(selectedOrder.id, 'قيد التنفيذ')
                } else if (selectedOrder.status === 'قيد التنفيذ') {
                  updateOrderStatus(selectedOrder.id, 'مكتمل')
                }
                setIsViewDialogOpen(false)
              }}>
                {selectedOrder.status === 'جديد' ? 'بدء التنفيذ' : 'إتمام'}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}