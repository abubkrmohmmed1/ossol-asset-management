import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  TrendingUp,
  Assessment,
  Timeline,
  PriorityHigh,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

export const PredictiveAnalytics: React.FC = () => {
  const { t } = useLanguage();

  const criticalAlerts = [
    {
      id: 1,
      asset: 'الخادم الرئيسي - دلتا',
      issue: 'احتمال فشل القرص الصلب بنسبة 85%',
      timeLeft: '24 ساعة',
      severity: 'critical',
      recommendation: 'استبدال القرص الصلب فوراً',
    },
    {
      id: 2,
      asset: 'رافعة شوكية #3',
      issue: 'انخفاض كفاءة المحرك بنسبة 40%',
      timeLeft: '3 أيام',
      severity: 'high',
      recommendation: 'صيانة عاجلة للمحرك',
    },
    {
      id: 3,
      asset: 'نظام التكييف المركزي',
      issue: 'ضغط غاز التبريد منخفض',
      timeLeft: 'أسبوع',
      severity: 'medium',
      recommendation: 'فحص وتعبئة غاز التبريد',
    },
  ];

  const assetFailureProbability = [
    { asset: 'الخادم الرئيسي - دلتا', probability: 85, status: 'critical' },
    { asset: 'رافعة شوكية #3', probability: 65, status: 'high' },
    { asset: 'مولد الطاقة الاحتياطي', probability: 35, status: 'medium' },
    { asset: 'نظام التكييف المركزي', probability: 25, status: 'low' },
    { asset: 'شاشات العرض الرقمية', probability: 15, status: 'low' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <Error color="error" />;
      case 'high': return <Warning color="warning" />;
      case 'medium': return <Info color="info" />;
      case 'low': return <Assessment color="success" />;
      default: return <Info />;
    }
  };

  const getProgressColor = (probability: number) => {
    if (probability >= 80) return 'error';
    if (probability >= 60) return 'warning';
    if (probability >= 40) return 'info';
    return 'success';
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {t('predictiveAnalytics')}
      </Typography>

      {/* Critical Alerts Section */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(66.666% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3} color="error.main">
                {t('activeCriticalAlerts')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {criticalAlerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    severity={getSeverityColor(alert.severity) as any}
                    sx={{ borderRadius: 2 }}
                    icon={getSeverityIcon(alert.severity)}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {alert.asset}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {alert.issue}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>التوصية:</strong> {alert.recommendation}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          متبقي: {alert.timeLeft}
                        </Typography>
                        <Chip
                          label={alert.severity}
                          size="small"
                          color={getSeverityColor(alert.severity) as any}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </Box>
                  </Alert>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(33.333% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {t('failureProbability')}
              </Typography>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  color: 'text.secondary',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <TrendingUp sx={{ fontSize: 64, mb: 2, color: 'grey.400' }} />
                  <Typography variant="h6">مخطط احتمالات الفشل</Typography>
                  <Typography variant="body2" color="text.secondary">
                    (عرض مرئي لاحتمالات فشل الأصول)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Asset Failure Probability */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            تحليل احتمالية فشل الأصول
          </Typography>
          <List>
            {assetFailureProbability.map((asset, index) => (
              <ListItem
                key={index}
                sx={{
                  px: 0,
                  py: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <ListItemIcon>
                  <PriorityHigh color={getProgressColor(asset.probability) as any} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" fontWeight="bold">
                        {asset.asset}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight="bold">
                          {asset.probability}%
                        </Typography>
                        <Chip
                          label={asset.status}
                          size="small"
                          color={getSeverityColor(asset.status) as any}
                        />
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={asset.probability}
                        color={getProgressColor(asset.probability) as any}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Timeline sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                87%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                دقة التنبؤات
              </Typography>
              <Typography variant="caption" color="text.secondary">
                بناءً على البيانات التاريخية
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Assessment sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" color="success.main">
                23
              </Typography>
              <Typography variant="body2" color="text.secondary">
                تنبيهات وقائية هذا الشهر
              </Typography>
              <Typography variant="caption" color="text.secondary">
                تم تجنب 15 عطلاً محتملاً
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <TrendingUp sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                45%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                توفير في تكاليف الصيانة
              </Typography>
              <Typography variant="caption" color="text.secondary">
                بفضل الصيانة الاستباقية
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};