export const translations = {
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    assets: 'الأصول',
    workOrders: 'أوامر العمل',
    financialReports: 'التقارير المالية',
    predictiveAnalytics: 'التحليلات التنبؤية',
    settings: 'الإعدادات',
    
    // Dashboard
    totalAssets: 'إجمالي الأصول',
    activeAssets: 'أصول نشطة',
    underMaintenance: 'تحت الصيانة',
    outOfService: 'خارج الخدمة',
    monthlyMaintenanceCosts: 'تكاليف الصيانة الشهرية (بالريال السعودي)',
    assetDistribution: 'توزيع الأصول حسب النوع',
    recentActivity: 'أحدث الأنشطة',
    proactiveAlerts: 'تنبيهات استباقية',
    
    // Assets
    assetList: 'قائمة الأصول',
    addNewAsset: 'إضافة أصل جديد',
    assetName: 'اسم الأصل',
    assetType: 'نوع الأصل',
    status: 'الحالة',
    location: 'الموقع',
    purchaseDate: 'تاريخ الشراء',
    value: 'القيمة',
    
    // Work Orders
    workOrderManagement: 'إدارة أوامر العمل',
    createWorkOrder: 'إنشاء أمر عمل',
    orderNumber: 'رقم الأمر',
    priority: 'الأولوية',
    assignee: 'المسؤول',
    creationDate: 'تاريخ الإنشاء',
    
    // Priorities
    high: 'عالية',
    medium: 'متوسطة',
    low: 'منخفضة',
    
    // Statuses
    new: 'جديد',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    active: 'نشط',
    maintenance: 'صيانة',
    inactive: 'غير نشط',
    
    // Financial Reports
    budgetVsActual: 'الميزانية مقابل الإنفاق الفعلي (سنوي)',
    depreciationForecast: 'توقعات إهلاك الأصول',
    
    // Predictive Analytics
    activeCriticalAlerts: 'التنبيهات النشطة الحرجة',
    failureProbability: 'احتمالية فشل الأصول',
    
    // Common
    search: 'ابحث عن أصل, أمر عمل...',
    notifications: 'الإشعارات',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    filter: 'فلترة',
    all: 'الكل',
    back: 'رجوع',
    
    // User
    assetManager: 'مدير أصول',
    sultanAlAhmed: 'سلطان الأحمد',
    
    // Language
    arabic: 'العربية',
    english: 'English',
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    assets: 'Assets',
    workOrders: 'Work Orders',
    financialReports: 'Financial Reports',
    predictiveAnalytics: 'Predictive Analytics',
    settings: 'Settings',
    
    // Dashboard
    totalAssets: 'Total Assets',
    activeAssets: 'Active Assets',
    underMaintenance: 'Under Maintenance',
    outOfService: 'Out of Service',
    monthlyMaintenanceCosts: 'Monthly Maintenance Costs (SAR)',
    assetDistribution: 'Asset Distribution by Type',
    recentActivity: 'Recent Activity',
    proactiveAlerts: 'Proactive Alerts',
    
    // Assets
    assetList: 'Asset List',
    addNewAsset: 'Add New Asset',
    assetName: 'Asset Name',
    assetType: 'Asset Type',
    status: 'Status',
    location: 'Location',
    purchaseDate: 'Purchase Date',
    value: 'Value',
    
    // Work Orders
    workOrderManagement: 'Work Order Management',
    createWorkOrder: 'Create Work Order',
    orderNumber: 'Order Number',
    priority: 'Priority',
    assignee: 'Assignee',
    creationDate: 'Creation Date',
    
    // Priorities
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    
    // Statuses
    new: 'New',
    inProgress: 'In Progress',
    completed: 'Completed',
    active: 'Active',
    maintenance: 'Maintenance',
    inactive: 'Inactive',
    
    // Financial Reports
    budgetVsActual: 'Budget vs Actual Spending (Annual)',
    depreciationForecast: 'Asset Depreciation Forecast',
    
    // Predictive Analytics
    activeCriticalAlerts: 'Active Critical Alerts',
    failureProbability: 'Asset Failure Probability',
    
    // Common
    search: 'Search for asset, work order...',
    notifications: 'Notifications',
    profile: 'Profile',
    logout: 'Logout',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    filter: 'Filter',
    all: 'All',
    back: 'Back',
    
    // User
    assetManager: 'Asset Manager',
    sultanAlAhmed: 'Sultan Al-Ahmed',
    
    // Language
    arabic: 'العربية',
    english: 'English',
  },
};

export type Language = 'ar' | 'en';
export type TranslationKey = keyof typeof translations.ar;