export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    assets: 'Assets',
    workOrders: 'Work Orders',
    financialReports: 'Financial Reports',
    predictiveAnalytics: 'Predictive Analytics',
    settings: 'Settings',
    
    // Header
    searchPlaceholder: 'Search for asset, work order...',
    notifications: 'Notifications',
    profile: 'Profile',
    
    // Dashboard
    welcome: 'Welcome to OSSOL',
    totalAssets: 'Total Assets',
    activeAssets: 'Active Assets',
    maintenanceRequired: 'Maintenance Required',
    outOfService: 'Out of Service',
    monthlyMaintenanceCosts: 'Monthly Maintenance Costs (SAR)',
    assetDistribution: 'Asset Distribution by Type',
    recentActivity: 'Recent Activity',
    proactiveAlerts: 'Proactive Alerts',
    
    // KPI Labels
    performance: 'Performance',
    health: 'Health Score',
    utilization: 'Utilization Rate',
    
    // Settings
    general: 'General',
    account: 'Account',
    notifications: 'Notifications',
    erpIntegration: 'ERP Integration',
    appearance: 'Appearance',
    security: 'Security',
    help: 'Help',
    
    // Integration
    integrationSettings: 'Integration Settings',
    selectErp: 'Select ERP System',
    sap: 'SAP',
    oracle: 'Oracle',
    ibmMaximo: 'IBM Maximo',
    odoo: 'Odoo',
    apiKey: 'API Key',
    serverUrl: 'Server URL',
    username: 'Username',
    password: 'Password',
    databaseName: 'Database Name',
    testConnection: 'Test Connection',
    saveConfiguration: 'Save Configuration',
    configurationSaved: 'Configuration saved successfully',
    connectionFailed: 'Connection failed',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info'
  },
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    assets: 'الأصول',
    workOrders: 'أوامر العمل',
    financialReports: 'التقارير المالية',
    predictiveAnalytics: 'التحليلات التنبؤية',
    settings: 'الإعدادات',
    
    // Header
    searchPlaceholder: 'ابحث عن أصل، أمر عمل...',
    notifications: 'الإشعارات',
    profile: 'الملف الشخصي',
    
    // Dashboard
    welcome: 'مرحباً بك في OSSOL',
    totalAssets: 'إجمالي الأصول',
    activeAssets: 'الأصول النشطة',
    maintenanceRequired: 'تحتاج للصيانة',
    outOfService: 'خارج الخدمة',
    monthlyMaintenanceCosts: 'تكاليف الصيانة الشهرية (ريال سعودي)',
    assetDistribution: 'توزيع الأصول حسب النوع',
    recentActivity: 'الأنشطة الأخيرة',
    proactiveAlerts: 'التنبيهات الاستباقية',
    
    // KPI Labels
    performance: 'الأداء',
    health: 'درجة الصحّة',
    utilization: 'معدل الاستخدام',
    
    // Settings
    general: 'عام',
    account: 'الحساب',
    notifications: 'الإشعارات',
    erpIntegration: 'تكامل ERP',
    appearance: 'المظهر',
    security: 'الأمان',
    help: 'المساعدة',
    
    // Integration
    integrationSettings: 'إعدادات التكامل',
    selectErp: 'اختر نظام ERP',
    sap: 'SAP',
    oracle: 'Oracle',
    ibmMaximo: 'IBM Maximo',
    odoo: 'Odoo',
    apiKey: 'مفتاح API',
    serverUrl: 'رابط الخادم',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    databaseName: 'اسم قاعدة البيانات',
    testConnection: 'اختبار الاتصال',
    saveConfiguration: 'حفظ التكوين',
    configurationSaved: 'تم حفظ التكوين بنجاح',
    connectionFailed: 'فشل الاتصال',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    add: 'إضافة',
    search: 'بحث',
    filter: 'فلتر',
    export: 'تصدير',
    import: 'استيراد',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    warning: 'تحذير',
    info: 'معلومات'
  }
}

export const useTranslation = (language: 'en' | 'ar') => {
  return translations[language]
}