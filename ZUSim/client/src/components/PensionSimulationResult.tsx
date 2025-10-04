import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PensionResult } from './types';

interface Props {
  result: PensionResult;
}

export default function PensionSimulationResult({ result }: Props) {
  const pensionData = [
    { name: 'Nominalna', value: result.nominalPension },
    { name: 'Urealniona', value: result.realPension },
  ];

  const salaryData = [
    { name: 'Z chorobami', value: result.salaryWithSickLeave },
    { name: 'Bez chorób', value: result.salaryWithoutSickLeave },
  ];

  return (
    <Paper sx={{ mt: 4, p: 4, borderRadius: 2, bgcolor: 'rgb(250,250,250)' }}>
      <Typography variant="h5" sx={{ mb: 3, color: 'rgb(0,65,110)', fontWeight: 700 }}>
        Wynik symulacji
      </Typography>

      {/* Słupki emerytur */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Emerytura (nominalna vs urealniona)</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={pensionData} margin={{ top: 10, bottom: 10 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(0) + ' zł'} />
          <Legend />
          <Bar dataKey="value" fill="rgb(63,132,210)" barSize={40} />
        </BarChart>
      </ResponsiveContainer>

      {/* Słupki wynagrodzenia */}
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>Wynagrodzenie (z chorobami vs bez chorób)</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={salaryData} margin={{ top: 10, bottom: 10 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(0) + ' zł'} />
          <Legend />
          <Bar dataKey="value" fill="rgb(255,179,79)" barSize={40} />
        </BarChart>
      </ResponsiveContainer>

      {/* Stopa zastąpienia */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>Stopa zastąpienia</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(result.replacementRate * 100, 100)}
            sx={{ height: 20, borderRadius: 5, bgcolor: 'rgb(190,195,206)', '& .MuiLinearProgress-bar': { bgcolor: 'rgb(0,153,63)' } }}
          />
        </Box>
        <Typography sx={{ minWidth: 50 }}>{(result.replacementRate * 100).toFixed(0)}%</Typography>
      </Box>
    </Paper>
  );
}
