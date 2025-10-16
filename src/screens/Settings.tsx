import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Language,
  Notifications,
  Palette,
  Storage,
  Info,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

export const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    sms: false,
    critical: true,
    maintenance: true,
    reports: false,
  });

  const [preferences, setPreferences] = React.useState({
    theme: 'light',
    autoRefresh: true,
    refreshInterval: '5',
    defaultView: 'dashboard',
  });

  const handleNotificationChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(prev => ({
      ...prev,
      [key]: event.target.checked
    }));
  };

  const handlePreferenceChange = (key: string) => (event: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: event.target.value
    }));
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {t('settings')}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Language Settings */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Language sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  إعدادات اللغة
                </Typography>
              </Box>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>اللغة المفضلة</InputLabel>
                <Select
                  value={language}
                  label="اللغة المفضلة"
                  onChange={(e) => setLanguage(e.target.value as 'ar' | 'en')}
                >
                  <MenuItem value="ar">{t('arabic')}</MenuItem>
                  <MenuItem value="en">{t('english')}</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="body2" color="text.secondary">
                سيتم تطبيق تغيير اللغة فوراً على جميع واجهات النظام
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Notification Settings */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Notifications sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  إعدادات الإشعارات
                </Typography>
              </Box>
              
              <List dense>
                <ListItem>
                  <ListItemText primary="الإشعارات البريدية" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.email}
                      onChange={handleNotificationChange('email')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemText primary="الإشعارات الفورية" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.push}
                      onChange={handleNotificationChange('push')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemText primary="الإشعارات عبر الرسائل النصية" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.sms}
                      onChange={handleNotificationChange('sms')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <Divider sx={{ my: 1 }} />
                
                <ListItem>
                  <ListItemText primary="تنبيهات الأصول الحرجة" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.critical}
                      onChange={handleNotificationChange('critical')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemText primary="تنبيهات الصيانة المجدولة" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.maintenance}
                      onChange={handleNotificationChange('maintenance')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemText primary="التقارير الدورية" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.reports}
                      onChange={handleNotificationChange('reports')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Display Preferences */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Palette sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  تفضيلات العرض
                </Typography>
              </Box>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>المظهر</InputLabel>
                <Select
                  value={preferences.theme}
                  label="المظهر"
                  onChange={handlePreferenceChange('theme')}
                >
                  <MenuItem value="light">فاتح</MenuItem>
                  <MenuItem value="dark">داكن</MenuItem>
                  <MenuItem value="auto">تلقائي</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.autoRefresh}
                    onChange={handlePreferenceChange('autoRefresh')}
                  />
                }
                label="تحديث تلقائي للبيانات"
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>فترة التحديث (دقائق)</InputLabel>
                <Select
                  value={preferences.refreshInterval}
                  label="فترة التحديث (دقائق)"
                  onChange={handlePreferenceChange('refreshInterval')}
                  disabled={!preferences.autoRefresh}
                >
                  <MenuItem value="1">1 دقيقة</MenuItem>
                  <MenuItem value="5">5 دقائق</MenuItem>
                  <MenuItem value="10">10 دقائق</MenuItem>
                  <MenuItem value="30">30 دقيقة</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>الشاشة الافتراضية</InputLabel>
                <Select
                  value={preferences.defaultView}
                  label="الشاشة الافتراضية"
                  onChange={handlePreferenceChange('defaultView')}
                >
                  <MenuItem value="dashboard">{t('dashboard')}</MenuItem>
                  <MenuItem value="assets">{t('assets')}</MenuItem>
                  <MenuItem value="work-orders">{t('workOrders')}</MenuItem>
                  <MenuItem value="financial-reports">{t('financialReports')}</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Box>

        {/* System Settings */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Storage sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  إعدادات النظام
                </Typography>
              </Box>
              
              <TextField
                fullWidth
                label="عدد السجلات لكل صفحة"
                type="number"
                defaultValue="25"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="مدة حفظ السجلات (أيام)"
                type="number"
                defaultValue="365"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="عنوان البريد الإلكتروني للنظام"
                type="email"
                defaultValue="system@ossol.com"
                sx={{ mb: 2 }}
              />
              
              <Button variant="contained" fullWidth>
                حفظ إعدادات النظام
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* About */}
        <Box sx={{ flex: { xs: '1 1 100%' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Info sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  حول النظام
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>نظام OSSOL</strong> - نظام متكامل لإدارة الأصول والصيانة التنبؤية
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    الإصدار: 1.0.0 (تجريبي)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    تاريخ الإصدار: أكتوبر 2024
                  </Typography>
                </Box>
                
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>الميزات الرئيسية:</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    • إدارة شاملة للأصول
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    • صيانة تنبؤية ذكية
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    • تقارير مالية متقدمة
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • دعم ثنائي اللغة
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};