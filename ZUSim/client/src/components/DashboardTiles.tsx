import { Box, Paper, Typography, TextField, SxProps, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import { ExportPDFButton } from './ExportPDFButton';
import { ExportXLSButton } from './ExportXLSButton';
import { PensionResult } from './types';
import { useState } from 'react';

interface DashboardTilesProps {
  dashboardReady: boolean;
  postalCode: string;
  setPostalCode: (code: string) => void;
  onGoToDashboard: () => void;
  age: number;
  gender: string;
  salary: number;
  startYear: number;
  endYear: number;
  accountBalance: number;
  subAccountBalance: number;
  includeSickLeave: boolean;
  result: PensionResult | null;
}

export default function DashboardTiles({
  dashboardReady,
  postalCode,
  setPostalCode,
  onGoToDashboard,
  age,
  gender,
  salary,
  startYear,
  endYear,
  accountBalance,
  subAccountBalance,
  includeSickLeave,
  result,
}: DashboardTilesProps) {
  const [postalConfirmed, setPostalConfirmed] = useState(false);

  const cardStyle: SxProps = {
    p: 3,
    textAlign: 'center',
    borderRadius: 2,
    boxShadow: 3,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    background: 'white',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 6,
    },
    minHeight: '140px',
  };

  const postalCardStyle: SxProps = {
    ...cardStyle,
    cursor: 'default',
    '&:hover': {
      transform: 'none',
      boxShadow: 3,
    },
  };

  const handlePDFClick = () => {
    if (!result) return;
    ExportPDFButton({
      age,
      gender,
      salary,
      startYear,
      endYear,
      accountBalance,
      subAccountBalance,
      includeSickLeave,
      result,
    });
  };

  const handleXLSClick = () => {
    if (!result) return;
    ExportXLSButton({
      age,
      gender: gender as 'male' | 'female',
      salary,
      startYear,
      endYear,
      accountBalance,
      subAccountBalance,
      includeSickLeave,
      result,
      postalCode: postalConfirmed ? postalCode : 'Nie podano',
    });
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: 3,
        maxWidth: '1100px',
        mx: 'auto',
        mt: 4,
        position: 'relative',
      }}
    >
      {!dashboardReady && (
        <Box
  sx={{
    position: 'absolute',
    top: '-20px',
    left: '-20px',
    right: '-20px',
    bottom: '-20px',
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(6px)', // można też zwiększyć blur
    WebkitBackdropFilter: 'blur(6px)',
    borderRadius: 4, // jeśli chcesz łagodniejsze rogi
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    p: 2,
  }}
>
  <Typography
    variant="h6"
    sx={{ color: 'rgb(0,65,110)', fontWeight: 700 }}
  >
    Aby uzyskać dostęp do opcji pulpitu nawigacyjnego, najpierw wypełnij
    formularz emerytalny
  </Typography>
        </Box>

      )}

      {/* Tile 1: Dashboard */}
      <Paper sx={cardStyle} onClick={onGoToDashboard}>
        <DashboardIcon sx={{ fontSize: 40, color: '#00416e' }} />
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
          Otwórz w Dashboard
        </Typography>
      </Paper>

      {/* Tile 2: Postal Code */}
      <Paper sx={postalCardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Kod pocztowy
        </Typography>
        <TextField
          label="Nieobligatoryjne"
          variant="outlined"
          fullWidth
          value={postalCode}
          onChange={(e) => {
            setPostalCode(e.target.value);
            setPostalConfirmed(false);
          }}
        />
        {!postalConfirmed && (
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => setPostalConfirmed(true)}>
            Zatwierdź
          </Button>
        )}
        {postalConfirmed && (
          <Typography variant="body2" sx={{ mt: 1, color: 'green' }}>
            Zatwierdzono ✅
          </Typography>
        )}
      </Paper>

      {/* Tile 3: PDF */}
      <Paper sx={cardStyle} onClick={handlePDFClick}>
        <PictureAsPdfIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
          Pobierz PDF
        </Typography>
      </Paper>

      {/* Tile 4: XLS */}
      <Paper sx={cardStyle} onClick={handleXLSClick}>
        <TableViewIcon sx={{ fontSize: 40, color: '#1976d2' }} />
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
          Pobierz XLS
        </Typography>
      </Paper>
    </Box>
  );
}
