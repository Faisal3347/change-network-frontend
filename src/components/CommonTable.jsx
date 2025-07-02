import React from 'react';
import { Button } from '@mui/material';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

const CommonTable = ({ headers = [], data = [], onUpdate, onDelete }) => {
  return (
    <Sheet variant="soft" sx={{ mt: 3, borderRadius: 'sm' }}>
      <Table
        stripe="odd"
        hoverRow
        sx={{
          captionSide: 'top',
          '& thead th': { textAlign: 'left' }, 
          '& tbody td': { textAlign: 'left' },
          '& tbody': { bgcolor: 'background.surface' },
        }}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.title}</td>
              <td>{new Date(row.fromTime).toLocaleString()}</td>
              <td>{new Date(row.toTime).toLocaleString()}</td>
              <td>{row.status}</td>
              <td>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => onUpdate(row)}
                  sx={{ mr: 1 }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onDelete(row)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default CommonTable;
