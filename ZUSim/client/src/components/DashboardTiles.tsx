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
    boxShadow: 2,
    transition: 'all 0.3s ease',
    flex: 1,
    minWidth: '180px',
    cursor: dashboardReady ? 'pointer' : 'not-allowed',
    opacity: dashboardReady ? 1 : 0.5,
  };

  const goToDashboard = () => {
  if (dashboardReady) {
    window.location.assign("/dashboard");
  }
};


  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        mt: 4,
      }}
    >
      {!dashboardReady && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'rgb(0,65,110)',
              fontWeight: 700,
              textAlign: 'center',
              px: 2,
            }}
          >
            Aby uzyskać dostęp do opcji pulpitu nawigacyjnego, najpierw wypełnij
            formularz emerytalny
          </Typography>
        </Box>
      )}

      {/* --- Tile 1: Open in Dashboard --- */}
      <Paper sx={cardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Open in Dashboard
        </Typography>
        <button
          onClick={onGoToDashboard}
          disabled={!dashboardReady}
          style={{
            backgroundColor: '#00416e',
            color: '#fff',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            cursor: dashboardReady ? 'pointer' : 'not-allowed',
          }}
        >
          Go
        </button>
      </Paper>

      {/* --- Tile 2: Postal Code --- */}
      <Paper sx={cardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Postal Code
        </Typography>
        <TextField
          label="Enter postal code (optional)"
          variant="outlined"
          fullWidth
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)} // 👈 aktualizacja na bieżąco
        />
        {postalCode && (
          <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
            Entered: {postalCode}
          </Typography>
        )}
      </Paper>

      {/* --- Tile 3: Download PDF --- */}
      <Paper sx={cardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Download PDF
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

      {/* --- Tile 4: Download XLS --- */}
      <Paper sx={cardStyle}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Download XLS
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
