import { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import { useWorkerTypesStore } from '../../../../hooks';
import { TableComponent, MessageDialog } from '../../../../shared/ui/components';
import { WorkerTypeModal } from '../../components';
import { useScreenSizes } from '../../../../shared/constants/screen-width';

export const WorkerTypePage = () => {
  const {
    workerTypes,
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
    startLoadingWorkerTypesPaginated,
    setSelectedWorkerType,
    startDeleteWorkerType,
  } = useWorkerTypesStore();
  const { isLg } = useScreenSizes();

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [rowToDelete, setRowToDelete] = useState(null); 

  useEffect(() => {
    startLoadingWorkerTypesPaginated();
  }, [currentPage, rowsPerPage, searchTerm, orderBy, order]);

  const openModal = (payload) => {
    setSelectedWorkerType(payload);
    setIsModalOpen(true); 
  };

  const deleteWorkerType = (workerType) => {
    setRowToDelete(workerType);
    setIsDialogOpen(true);
  };

  const columns = [
    { id: 'name', label: 'Nombre', sortable: true },
    { id: 'description', label: 'Descripción', sortable: true },
  ];

  const actions = [
    { 
      label: 'Editar', 
      icon: <Edit />, 
      onClick: (row) => openModal(row),
    },
    { 
      label: 'Eliminar', 
      icon: <Delete />, 
      onClick: (row) => deleteWorkerType(row),
    },
  ];

  return (
    <Box>
      <Box sx={{ borderRadius: 2, border: '1px solid rgba(0,0,0,0.12)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ px: 3, py: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 24 }}>Listado de Tipos de Trabajadores</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 16 }}>Administra los tipos de trabajadores</Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            sx={{ backgroundColor: '#212121', color: '#fff', borderRadius: 2, textTransform: 'none', px: 3, py: 1.5 }}
            onClick={() => openModal()} 
          >
            {isLg ? 'Agregar Tipo de Trabajador' : 'Agregar'}
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
        ) : workerTypes.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: 16 }}>
              No se encontraron resultados.
            </Typography>
          </Box>
        ) : (
          <TableComponent
            rows={workerTypes}
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
          />
        )}
      </Box>

      <WorkerTypeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workerType={selected}
        setWorkerType={setSelectedWorkerType}
      />

      <MessageDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setRowToDelete(null);
        }}
        onConfirm={async () => {
          if (rowToDelete) {
            await startDeleteWorkerType(rowToDelete._id);
            setIsDialogOpen(false);
            setRowToDelete(null);
          }
        }}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar "${rowToDelete?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmColor="error"
      />
    </Box>
  );
};
