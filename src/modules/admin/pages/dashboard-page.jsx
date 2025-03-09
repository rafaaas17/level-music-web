import React, { useState } from 'react';
import { Container, Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NavBar, Footer } from '../../../shared/ui/components/common';
import * as XLSX from 'xlsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const DashboardPage = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center', width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Subir archivo Excel
          </Typography>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 2 }}
          >
            Seleccionar archivo
            <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileUpload} />
          </Button>
        </Paper>

        {data.length > 0 && (
          <TableContainer component={Paper} elevation={3} sx={{ mt: 3, width: '100%', maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {Object.keys(data[0]).map((key, index) => (
                    <TableCell key={index} sx={{ fontWeight: 'bold' }}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <TableCell key={colIndex}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Footer />
    </Box>
  );
};
