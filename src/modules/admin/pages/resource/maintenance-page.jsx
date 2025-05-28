import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { AddCircleOutline, Delete } from '@mui/icons-material';
import { useMaintenanceStore } from '../../../../hooks/resource/use-maintenance-store';
import { TableComponent, MessageDialog } from '../../../../shared/ui/components';
import { MaintenanceModal } from '../../components/resource/maintenance-modal';
import { useScreenSizes } from '../../../../shared/constants/screen-width';

export const EquipmentMaintenancePage = () => {
  const {
    maintenances,
    total,
    loading,
    searchTerm,
    rowsPerPage,
    currentPage,
    orderBy,
    order,
    selected,
    setSearchTerm,
    setRowsPerPageGlobal,
    setPageGlobal,
    setOrderBy,
    setOrder,
    startLoadingMaintenancesPaginated,
    setSelectedMaintenance,
    startCreateMaintenance,
    startDeleteMaintenance,
  } = useMaintenanceStore();
  const { isLg } = useScreenSizes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, row: null });

  useEffect(() => {
    startLoadingMaintenancesPaginated();
  }, [currentPage, rowsPerPage, searchTerm, orderBy, order]);

  const openModal = () => {
    setSelectedMaintenance({});
    setIsModalOpen(true);
  };

  const columns = [
    { id: 'resource_id', label: 'Nombre del equipo', sortable: false },
    { id: 'type', label: 'Tipo de mantenimiento', sortable: true },
    { id: 'description', label: 'Descripción', sortable: true },
    { id: 'date', label: 'Fecha', sortable: true },
  ];

  const actions = [
    {
      label: 'Eliminar',
      icon: <Delete />,
      onClick: (row) => setDeleteDialog({ open: true, row }),
    },
  ];

  const handleSave = async (maintenance) => {
    const success = await startCreateMaintenance(maintenance);
    if (success) setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteDialog.row && deleteDialog.row._id) {
      await startDeleteMaintenance(deleteDialog.row._id);
      setDeleteDialog({ open: false, row: null });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          borderRadius: 2,
          border: (theme) =>
            `1px solid ${theme.palette.mode === 'dark' ? 'rgb(140, 140, 140)' : 'rgba(0,0,0,0.12)'}`
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ px: 3, py: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 24 }}>Listado de Mantenimientos</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 16 }}>Administra los mantenimientos</Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            sx={{ backgroundColor: '#212121', color: '#fff', borderRadius: 2, textTransform: 'none', px: 3, py: 1.5 }}
            onClick={openModal}
          >
            {isLg ? 'Agregar Mantenimiento' : 'Agregar'}
          </Button>
        </Box>

        <Box
          display="flex"
          justifyContent="start"
          alignItems="center"
          sx={{ px: 3, pb: { xs: 1, lg: 3 }, width: { xs: '100%', sm: '300px' } }}
        >
          <TextField
            size="small"
            placeholder="Buscar..."
            value={searchTerm}
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
            <CircularProgress />
          </Box>
        ) : maintenances.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: 16 }}>
              No se encontraron resultados.
            </Typography>
          </Box>
        ) : (
          <TableComponent
            rows={maintenances}
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={(prop) => {
              const isAsc = orderBy === prop && order === 'asc';
              setOrder(isAsc ? 'desc' : 'asc');
              setOrderBy(prop);
            }}
            page={currentPage}
            rowsPerPage={rowsPerPage}
            total={total}
            onPageChange={(_, newPage) => setPageGlobal(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPageGlobal(parseInt(e.target.value, 10));
              setPageGlobal(0);
            }}
            actions={actions}
            hasActions={false}
          />
        )}
      </Box>

      <MaintenanceModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        loading={loading}
      />

      <MessageDialog
        open={deleteDialog.open}
        title="Eliminar mantenimiento"
        message="¿Estás seguro que deseas eliminar este mantenimiento?"
        onClose={() => setDeleteDialog({ open: false, row: null })}
        onConfirm={handleDelete}
      />
    </Box>
  );
};
