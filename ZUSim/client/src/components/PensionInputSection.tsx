import { TextField, Box, Typography, Paper } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PensionInputSectionProps {
  desiredPension: string;
  onDesiredPensionChange: (value: string) => void;
  averagePension: number;
}

export default function PensionInputSection({
  desiredPension,
  onDesiredPensionChange,
  averagePension
}: PensionInputSectionProps) {
  const desired = parseFloat(desiredPension) || 0;
  const difference = desired - averagePension;
  const percentageDiff = averagePension > 0 ? ((difference / averagePension) * 100).toFixed(0) : 0;

  return (
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'stretch', height: '100%', px: 4, py: 3 }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            color: 'rgb(0, 65, 110)',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
          data-testid="text-main-question"
        >
          Jaką chciałbyś mieć emeryturę w przyszłości?
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="np. 4000"
          value={desiredPension}
          onChange={(e) => onDesiredPensionChange(e.target.value.replace(/[^0-9]/g, ''))}
          type="text"
          data-testid="input-desired-pension"
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '1.5rem',
              fontWeight: 500,
              '& fieldset': {
                borderColor: 'rgb(190, 195, 206)',
                borderWidth: 2,
              },
              '&:hover fieldset': {
                borderColor: 'rgb(63, 132, 210)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgb(255, 179, 79)',
                borderWidth: 2,
              },
            },
            '& input': {
              color: 'rgb(0, 65, 110)',
            }
          }}
          InputProps={{
            endAdornment: <Typography sx={{ color: 'rgb(0, 65, 110)', fontWeight: 500, ml: 1 }}>zł</Typography>,
          }}
          helperText="Wprowadź kwotę miesięcznej emerytury, którą chciałbyś otrzymywać"
        />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Paper 
          elevation={0} 
          sx={{ 
            width: '100%', 
            p: 3, 
            bgcolor: 'rgb(190, 195, 206, 0.2)',
            border: '1px solid rgb(190, 195, 206, 0.4)',
            borderRadius: 2
          }}
          data-testid="card-comparison"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ color: 'rgb(0, 65, 110)', mb: 1, fontWeight: 500 }}
                data-testid="text-label-desired"
              >
                Twoja oczekiwana emerytura
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ fontWeight: 700, color: 'rgb(0, 65, 110)' }}
                data-testid="text-desired-amount"
              >
                {desired > 0 ? desired.toLocaleString('pl-PL') : '—'} zł
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ color: 'rgb(0, 65, 110)', mb: 1, fontWeight: 500 }}
                data-testid="text-label-average"
              >
                Średnia emerytura
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ fontWeight: 700, color: 'rgb(0, 65, 110)' }}
                data-testid="text-average-amount"
              >
                {averagePension.toLocaleString('pl-PL')} zł
              </Typography>
            </Box>
          </Box>
          
          {desired > 0 && (
            <Box 
              sx={{ 
                mt: 2, 
                pt: 2, 
                borderTop: '1px solid rgb(190, 195, 206, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
              data-testid="section-difference"
            >
              {difference > 0 ? (
                <>
                  <TrendingUp size={20} color="rgb(240, 94, 94)" />
                  <Typography sx={{ color: 'rgb(240, 94, 94)', fontWeight: 600 }}>
                    {percentageDiff}% powyżej średniej ({difference.toLocaleString('pl-PL')} zł)
                  </Typography>
                </>
              ) : difference < 0 ? (
                <>
                  <TrendingDown size={20} color="rgb(0, 153, 63)" />
                  <Typography sx={{ color: 'rgb(0, 153, 63)', fontWeight: 600 }}>
                    {Math.abs(Number(percentageDiff))}% poniżej średniej ({Math.abs(difference).toLocaleString('pl-PL')} zł)
                  </Typography>
                </>
              ) : (
                <Typography sx={{ color: 'rgb(0, 65, 110)', fontWeight: 600 }}>
                  Równo średniej
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
