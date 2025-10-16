import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShowChart,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { mockFinancialData } from '../data/mockData';

export const FinancialReports: React.FC = () => {
  const { t } = useLanguage();

  const budgetVariance = mockFinancialData.budget.map(item => ({
    ...item,
    variance: item.actual - item.budget,
    variancePercent: ((item.actual - item.budget) / item.budget * 100).toFixed(1),
  }));

  const totalBudget = mockFinancialData.budget.reduce((sum, item) => sum + item.budget, 0);
  const totalActual = mockFinancialData.budget.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalActual - totalBudget;
  const totalVariancePercent = ((totalVariance / totalBudget) * 100).toFixed(1);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {t('financialReports')}
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoney sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {totalBudget.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                إجمالي الميزانية
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ShowChart sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {totalActual.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                الإنفاق الفعلي
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              {totalVariance > 0 ? (
                <TrendingUp sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              ) : (
                <TrendingDown sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              )}
              <Typography variant="h4" fontWeight="bold" color={totalVariance > 0 ? 'error.main' : 'success.main'}>
                {Math.abs(totalVariance).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                فرق التكلفة
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Chip
                label={`${totalVariancePercent}%`}
                color={totalVariance > 0 ? 'error' : 'success'}
                sx={{ fontSize: '1.5rem', fontWeight: 'bold', height: 48, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                نسبة الانحراف
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Charts Section */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(66.666% - 12px)' } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {t('budgetVsActual')}
              </Typography>
              <Box
                sx={{
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  color: 'text.secondary',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <ShowChart sx={{ fontSize: 64, mb: 2, color: 'grey.400' }} />
                  <Typography variant="h6">مخطط عمودي مقارن</Typography>
                  <Typography variant="body2" color="text.secondary">
                    (الميزانية مقابل الإنفاق الفعلي لكل فئة)
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
                {t('depreciationForecast')}
              </Typography>
              <Box
                sx={{
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  color: 'text.secondary',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <TrendingDown sx={{ fontSize: 64, mb: 2, color: 'grey.400' }} />
                  <Typography variant="h6">مخطط خطي</Typography>
                  <Typography variant="body2" color="text.secondary">
                    (توقعات قيمة الأصول عبر السنوات)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Budget Details Table */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            تفاصيل الميزانية والإنفاق
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>الفئة</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>الميزانية</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>الإنفاق الفعلي</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>الفرق</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>نسبة الانحراف</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budgetVariance.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: 'bold' }}>{row.category}</TableCell>
                    <TableCell align="right">
                      {row.budget.toLocaleString()} ريال
                    </TableCell>
                    <TableCell align="right">
                      {row.actual.toLocaleString()} ريال
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        color={row.variance > 0 ? 'error.main' : 'success.main'}
                        fontWeight="bold"
                      >
                        {row.variance > 0 ? '+' : ''}{row.variance.toLocaleString()} ريال
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        color={row.variance > 0 ? 'error.main' : 'success.main'}
                        fontWeight="bold"
                      >
                        {row.variance > 0 ? '+' : ''}{row.variancePercent}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={row.variance > 0 ? 'تجاوز الميزانية' : 'ضمن الميزانية'}
                        color={row.variance > 0 ? 'error' : 'success'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>الإجمالي</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {totalBudget.toLocaleString()} ريال
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {totalActual.toLocaleString()} ريال
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color={totalVariance > 0 ? 'error.main' : 'success.main'}
                      fontWeight="bold"
                    >
                      {totalVariance > 0 ? '+' : ''}{totalVariance.toLocaleString()} ريال
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color={totalVariance > 0 ? 'error.main' : 'success.main'}
                      fontWeight="bold"
                    >
                      {totalVariance > 0 ? '+' : ''}{totalVariancePercent}%
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={totalVariance > 0 ? 'تجاوز الميزانية' : 'ضمن الميزانية'}
                      color={totalVariance > 0 ? 'error' : 'success'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};