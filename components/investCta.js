import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


export default function InvestCta() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Box sx={{ p: 2 }} >
            <Paper sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <Box sx={{ p: 2 }} >
            Film to be released very soon!
            </Box>
            
            </Paper>
        </Box>
    </React.Fragment>
  );
}
