import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
} from '@mui/material';
import {
  Inventory,
  CheckCircle,
  Build,
  Error,
  TrendingUp,
  Warning,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { mockKPIs, mockRecentActivity, mockAlerts } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const kpiCards = [
    {
      title: t('totalAssets'),
      value: mockKPIs.totalAssets,
      icon: Inventory,
      color: 'primary',
      bgColor: 'primary.50',
    },
    {
      title: t('activeAssets'),
      value: mockKPIs.activeAssets,
      icon: CheckCircle,
      color: 'success',
      bgColor: 'success.50',
    },
    {
      title: t('underMaintenance'),
      value: mockKPIs.underMaintenance,
      icon: Build,
      color: 'warning',
      bgColor: 'warning.50',
    },
    {
      title: t('outOfService'),
      value: mockKPIs.outOfService,
      icon: Error,
      color: 'error',
      bgColor: 'error.50',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {t('dashboard')}
      </Typography>

      {/* KPI Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 12px)' } }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                  <Box
                    sx={{
                      bgcolor: `${kpi.bgColor}.main`,
                      color: `${kpi.color}.main`,
                      p: 2,
                      borderRadius: 2,
                      mr: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {kpi.value.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {kpi.title}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>

      {/* Charts Section */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(66.666% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {t('monthlyMaintenanceCosts')}
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
                  <TrendingUp sx={{ fontSize: 48, mb: 2, color: 'grey.400' }} />
                  <Typography>مخطط التكاليف الشهرية</Typography>
                  <Typography variant="body2" color="text.secondary">
                    (سيتم عرض المخطط الفعلي هنا)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(33.333% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {t('assetDistribution')}
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
                  <Warning sx={{ fontSize: 48, mb: 2, color: 'grey.400' }} />
                  <Typography>مخطط دائري</Typography>
                  <Typography variant="body2" color="text.secondary">
                    (توزيع الأصول حسب النوع)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Recent Activity and Alerts */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {t('recentActivity')}
              </Typography>
              <List sx={{ p: 0 }}>
                {mockRecentActivity.map((activity) => (
                  <ListItem
                    key={activity.id}
                    sx={{
                      px: 0,
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="bold">
                            {activity.action}
                          </Typography>
                          <Chip
                            label={activity.type}
                            size="small"
                            color={getActivityColor(activity.type) as any}
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {activity.details}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3} color="error.main">
                {t('proactiveAlerts')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mockAlerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    severity={getSeverityColor(alert.severity) as any}
                    sx={{ borderRadius: 2 }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {alert.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {alert.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.time}
                      </Typography>
                    </Box>
                  </Alert>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};