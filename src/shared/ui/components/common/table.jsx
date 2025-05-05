import React, { useMemo, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useScreenSizes } from '../../../constants/screen-width';

export const TableComponent = ({
  rows,
  columns,
  order,
  orderBy,
  onRequestSort,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
  actions,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const { isMd, isLg } = useScreenSizes();

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const aVal = a[orderBy]?.toString().toLowerCase();
      const bVal = b[orderBy]?.toString().toLowerCase();
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, order, orderBy]);

  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <>
      {!isLg ? (
        <Box
          sx={{
            maxHeight: '625px',
            overflowY: isLg ? (sortedRows.length > 6 ? 'auto' : 'hidden') : (sortedRows.length > 3 ? 'auto' : 'hidden'),
            display: 'grid',
            gridTemplateColumns: isMd ? 'repeat(2, 1fr)' : '1fr',
            gap: 2,
            p: 2,
          }}
        >
          {sortedRows.map((row) => (
            <Card key={row._id} sx={{ borderRadius: 3, border: '1px solid rgba(224, 224, 224, 1)', boxShadow: 'none', position: 'relative' }}>
              {actions && (
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, row)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              )}
              <CardContent>
                {columns.map((column) => (
                  <Box key={`${row._id}-${column.id}`} sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {column.label}
                    </Typography>
                    <Typography variant="body1">{row[column.id]}</Typography>
                  </Box>
                ))}
              </CardContent>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    borderRadius: 4,
                    backgroundColor: '#fff',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
                    py: 1,
                  },
                }}
              >
                {actions.map((action, index) => (
                  <MenuItem
                    key={`${menuRow?._id}-action-${index}`}
                    onClick={() => {
                      action.onClick(menuRow);
                      handleMenuClose();
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      py: 1,
                      px: 2,
                      fontSize: 14,
                      color: action.label === 'Eliminar' ? '#d32f2f' : '#212121',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    {action.icon && (
                      <span style={{ fontSize: 18, display: 'flex', alignItems: 'center', color: action.label === 'Eliminar' ? '#d32f2f' : 'inherit' }}>
                        {action.icon}
                      </span>
                    )}
                    {action.label}
                  </MenuItem>
                ))}
              </Menu>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            height: '335px',
            overflowY: rows.length > 5 ? 'auto' : 'hidden',
          }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                    sx={{ 
                      borderTop: '1px solid rgba(224, 224, 224, 1)', 
                      p: 2, backgroundColor: '#f5f5f5', fontWeight: 600 
                    }}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => onRequestSort(column.id)}
                        sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell 
                    align="right"
                    sx={{ 
                      borderTop: '1px solid rgba(224, 224, 224, 1)', 
                      backgroundColor: '#f5f5f5', fontWeight: 600 
                    }}
                  >
                    Acción
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {sortedRows.map((row, index) => (
                <TableRow
                  hover
                  key={row._id}
                  sx={{
                    '&:last-child td': rows.length >= 5 ? { borderBottom: 'none' } : {},
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={`${row._id}-${column.id}`} sx={{ p: 2, fontSize: 16 }}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="right" sx={{ py: 1, px: 2 }}>
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                          sx: {
                            borderRadius: 4,
                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
                            backgroundColor: '#fff',
                            py: 1,
                          },
                        }}
                      >
                        {actions.map((action, index) => (
                          <MenuItem
                            key={`${menuRow?._id}-action-${index}`}
                            onClick={() => {
                              action.onClick(menuRow);
                              handleMenuClose();
                            }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              py: 1,
                              px: 2,
                              fontSize: 14,
                              color: action.label === 'Eliminar' ? '#d32f2f' : '#212121',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                              },
                            }}
                          >
                            {action.icon && (
                              <span style={{ fontSize: 18, display: 'flex', alignItems: 'center', color: action.label === 'Eliminar' ? '#d32f2f' : 'inherit' }}>
                                {action.icon}
                              </span>
                            )}
                            {action.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      <TablePagination
        component="div"
        count={total || 0}
        page={Math.min(page, totalPages - 1)}
        rowsPerPage={rowsPerPage || 5}
        onPageChange={(e, newPage) => {
          if (newPage >= 0 && newPage < totalPages) {
            onPageChange(e, newPage);
          }
        }}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{ '& .MuiTablePagination-toolbar': { py: 1, px: 2 }, borderTop: '1px solid rgba(224, 224, 224, 1)' }}
      />
    </>
  );
};
