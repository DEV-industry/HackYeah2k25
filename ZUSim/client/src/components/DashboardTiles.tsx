import { Box, Paper, Typography, Button, TextField, SxProps } from '@mui/material';
import { PictureAsPdf, TableView, OpenInNew } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
interface DashboardTilesProps {
  dashboardReady: boolean;
  postalCode: string;
  setPostalCode: (code: string) => void;
}

export default function DashboardTiles({ dashboardReady, postalCode, setPostalCode }: DashboardTilesProps) {
  const cardStyle: SxProps = {
    p: 3,
    textAlign: 'center',
    borderRadius: 2,
    boxShadow: 2,
    transition: 'all 0.3s ease',
    flex: 1,
    minWidth: '180px',
    cursor: dashboardReady ? 'pointer' : 'not-allowed',
    opacity: dashboardReady ? 1 : 0.5,
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto', position: 'relative', mt: 4 }}>
      {!dashboardReady && (
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          borderRadius: 2,
        }}>
          <Typography variant="h6" sx={{ color: 'rgb(0,65,110)', fontWeight: 700, textAlign: 'center', px: 2 }}>
            Please complete the pension form first to access dashboard options
          </Typography>
        </Box>
      )}

        {/* Tile 1: Open in Dashboard */}
    <Paper sx={cardStyle}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Open in Dashboard</Typography>
      <Button
        variant="contained"
        startIcon={<DashboardIcon />}
        disabled={!dashboardReady}
      >
        Go
      </Button>
    </Paper>
      {/* Tile 2: Postal Code */}
      <Paper sx={cardStyle}>
  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
    Postal Code
  </Typography>
  <TextField
    label="Enter postal code (optional)"
    variant="outlined"
    fullWidth
    value={postalCode}
    onChange={(e) => setPostalCode(e.target.value)}
  />
  {postalCode && (
    <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
      Entered: {postalCode}
    </Typography>
  )}
</Paper>

      {/* Tile 3: Download PDF */}
<Paper sx={cardStyle}>
  <Typography variant="subtitle1" sx={{ mb: 2 }}>Download PDF</Typography>
  <Button
    variant="contained"
    startIcon={<PictureAsPdf />}
    disabled={!dashboardReady}
  >
    PDF
  </Button>
</Paper>

{/* Tile 4: Download XLS */}
<Paper sx={cardStyle}>
  <Typography variant="subtitle1" sx={{ mb: 2 }}>Download XLS</Typography>
  <Button
    variant="contained"
    startIcon={<TableView />}
    disabled={!dashboardReady}
  >
    XLS
  </Button>
</Paper>
    </Box>
  );
}
