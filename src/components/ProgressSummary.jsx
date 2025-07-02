import React from 'react';
import { Box, Card, Typography, Grid, CircularProgress } from '@mui/material';

const ProgressCircle = ({ label, value, total, color }) => {
  const percentage = (value / total) * 100;

  return (
    <Card
      sx={{
        backgroundColor: '#ffffff',
        border: '1px solid black',
        borderRadius: '12px',
        padding: 2,
        minWidth: 140,
        textAlign: 'center',
        height:'70px'
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={50}
          thickness={5}
          sx={{
            color,
            backgroundColor: 'transparent',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {value}/{total}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" fontWeight="bold" mt={1}>
        {label}
      </Typography>
    </Card>
  );
};

const ProgressSummary = ({ pending, inProgress, completed, total }) => {
  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Grid item>
        <ProgressCircle label="Approved" value={completed} total={total} color="green" />
      </Grid>
      <Grid item>
        <ProgressCircle label="Rejected" value={inProgress} total={total} color="darkred" />
      </Grid>
      <Grid item>
        <ProgressCircle label="Pending" value={pending} total={total} color="goldenrod" />
      </Grid>
    </Grid>
  );
};

export default ProgressSummary;
