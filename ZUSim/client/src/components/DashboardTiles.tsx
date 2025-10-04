import { Box, Paper, Typography, TextField, SxProps } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ExportPDFButton } from './ExportPDFButton';
import { ExportXLSButton } from './ExportXLSButton';
import { PensionResult } from './types';

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
  const cardStyle: SxProps = {
    p: 3,
    textAlign: 'center',
    borderRadius: 2,
    boxShadow: 3,
    transition: 'all 0.3s ease',
    cursor: dashboardReady ? 'pointer' : 'not-allowed',
    opacity: dashboardReady ? 1 : 0.5,
    background: 'white',
    '&:hover': {
      transform: dashboardReady ? 'translateY(-4px)' : 'none',
      boxShadow: dashboardReady ? 6 : 3,
    },
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: 3,
        maxWidth: '1100px',  // 🔹 ograniczenie szerokości
        mx: 'auto',
        mt: 4,
        position: 'relative',
      }}
    >
      {/* 🔒 Overlay blokujący */}
      {!dashboardReady && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(4px)',
            borderRadius: 2,
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

      {/* 🧩 Tile 1: Open in Dashboard */}
      <Paper sx={cardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Otwórz w Dashboard
        </Typography>
        <button
          onClick={onGoToDashboard}
          disabled={!dashboardReady}
          style={{
            backgroundColor: '#00416e',
            color: '#fff',
            padding: '10px 18px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: dashboardReady ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <DashboardIcon />
          Go
        </button>
      </Paper>

      {/* 🧩 Tile 2: Postal Code */}
      <Paper sx={cardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Kod pocztowy
        </Typography>
        <TextField
          label="Wpisz kod pocztowy (opcjonalnie)"
          variant="outlined"
          fullWidth
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        {postalCode && (
          <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
            Wpisany: {postalCode}
          </Typography>
        )}
      </Paper>

      {/* 🧩 Tile 3: Download PDF */}
      <Paper sx={cardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Pobierz PDF
        </Typography>
        {result && (
          <ExportPDFButton
            age={age}
            gender={gender}
            salary={salary}
            startYear={startYear}
            endYear={endYear}
            accountBalance={accountBalance}
            subAccountBalance={subAccountBalance}
            includeSickLeave={includeSickLeave}
            result={result}
          />
        )}
      </Paper>

      {/* 🧩 Tile 4: Download XLS */}
      <Paper sx={cardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Pobierz XLS
        </Typography>
        {result && (
          <ExportXLSButton
            age={age}
            gender={gender as 'male' | 'female'}
            salary={salary}
            startYear={startYear}
            endYear={endYear}
            accountBalance={accountBalance}
            subAccountBalance={subAccountBalance}
            includeSickLeave={includeSickLeave}
            result={result}
          />
        )}
      </Paper>
    </Box>
  );
}
