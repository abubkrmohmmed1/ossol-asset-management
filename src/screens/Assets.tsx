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
  TextField,
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
  GridOn,
  ViewList,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAssets } from '../data/mockData';

export const Assets: React.FC = () => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'success';
      case 'صيانة': return 'warning';
      case 'غير نشط': return 'error';
      default: return 'default';
    }
  };

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const AssetCard = ({ asset }: { asset: any }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
            {asset.name}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => handleMenuClick(e)}
          >
            <MoreVert />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('assetType')}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {asset.type}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('status')}
            </Typography>
            <Chip
              label={asset.status}
              size="small"
              color={getStatusColor(asset.status) as any}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('location')}
            </Typography>
            <Typography variant="body2">
              {asset.location}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('value')}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {asset.value.toLocaleString()} ريال
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          {t('assetList')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddDialogOpen(true)}
        >
          {t('addNewAsset')}
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 200, flexGrow: 1 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t('status')}</InputLabel>
            <Select
              value={filterStatus}
              label={t('status')}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">{t('all')}</MenuItem>
              <MenuItem value="نشط">{t('active')}</MenuItem>
              <MenuItem value="صيانة">{t('maintenance')}</MenuItem>
              <MenuItem value="غير نشط">{t('inactive')}</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setViewMode('table')}
              color={viewMode === 'table' ? 'primary' : 'default'}
            >
              <ViewList />
            </IconButton>
            <IconButton
              onClick={() => setViewMode('grid')}
              color={viewMode === 'grid' ? 'primary' : 'default'}
            >
              <GridOn />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'table' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('assetName')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('assetType')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('status')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('location')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('purchaseDate')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('value')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{asset.name}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={asset.status}
                      size="small"
                      color={getStatusColor(asset.status) as any}
                    />
                  </TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.purchaseDate}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {asset.value.toLocaleString()} ريال
                  </TableCell>
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
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {filteredAssets.map((asset) => (
            <Box key={asset.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
              <AssetCard asset={asset} />
            </Box>
          ))}
        </Box>
      )}

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

      {/* Add Asset Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t('addNewAsset')}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            نموذج إضافة الأصل متعدد الخطوات سيكون هنا.
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
    </Box>
  );
};