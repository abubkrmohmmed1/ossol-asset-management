import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Assignment,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { mockWorkOrders } from '../data/mockData';

export const WorkOrders: React.FC = () => {
  const { t } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'info';
      case 'قيد التنفيذ': return 'warning';
      case 'مكتمل': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'error';
      case 'متوسطة': return 'warning';
      case 'منخفضة': return 'success';
      default: return 'default';
    }
  };

  const filteredOrders = mockWorkOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || order.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          {t('workOrderManagement')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddDialogOpen(true)}
        >
          {t('createWorkOrder')}
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="body1" fontWeight="bold">
              {t('filter')}:
            </Typography>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t('status')}</InputLabel>
              <Select
                value={filterStatus}
                label={t('status')}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">{t('all')}</MenuItem>
                <MenuItem value="جديد">{t('new')}</MenuItem>
                <MenuItem value="قيد التنفيذ">{t('inProgress')}</MenuItem>
                <MenuItem value="مكتمل">{t('completed')}</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t('priority')}</InputLabel>
              <Select
                value={filterPriority}
                label={t('priority')}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="all">{t('all')}</MenuItem>
                <MenuItem value="عالية">{t('high')}</MenuItem>
                <MenuItem value="متوسطة">{t('medium')}</MenuItem>
                <MenuItem value="منخفضة">{t('low')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Work Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('orderNumber')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('assetName')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('priority')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('status')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('assignee')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('creationDate')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell sx={{ fontWeight: 'bold' }}>{order.id}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{order.assetName}</TableCell>
                <TableCell>
                  <Chip
                    label={order.priority}
                    size="small"
                    color={getPriorityColor(order.priority) as any}
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    color={getStatusColor(order.status) as any}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{order.assignee}</TableCell>
                <TableCell>{order.creationDate}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Visibility sx={{ ml: 1 }} />
          {t('view')}
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ ml: 1 }} />
          {t('edit')}
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ ml: 1 }} />
          {t('delete')}
        </MenuItem>
      </Menu>

      {/* Add Work Order Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t('createWorkOrder')}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            نموذج إنشاء أمر عمل سيكون هنا.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>
            {t('cancel')}
          </Button>
          <Button variant="contained" onClick={() => setAddDialogOpen(false)}>
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assignment sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {mockWorkOrders.filter(o => o.status === 'جديد').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                أوامر عمل جديدة
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assignment sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {mockWorkOrders.filter(o => o.status === 'قيد التنفيذ').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                قيد التنفيذ
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assignment sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {mockWorkOrders.filter(o => o.status === 'مكتمل').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                مكتملة
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assignment sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {mockWorkOrders.filter(o => o.priority === 'عالية').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                أولوية عالية
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};