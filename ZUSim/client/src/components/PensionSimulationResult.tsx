import { Paper, Typography, Box, LinearProgress, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';
import { PensionResult } from './types';

interface Props {
  result: PensionResult;
  expectedPension?: number; // wartość z pierwszego inputu "oczekiwana emerytura"
}

export default function PensionSimulationResult({ result, expectedPension }: Props) {
  const [extraYears, setExtraYears] = useState(0);

  // Symulacja wpływu odłożenia emerytury
  const projectedNominal = result.nominalPension * Math.pow(1.05, extraYears); // założenie 5% wzrost składek/roku
  const projectedReal = projectedNominal / Math.pow(1.03, extraYears); // urealnienie inflacją
  const yearsNeeded = expectedPension && projectedNominal < expectedPension
    ? Math.ceil(Math.log(expectedPension / projectedNominal) / Math.log(1.05))
    : 0;

  const pensionData = [
    { name: 'Nominalna', wartosc: result.nominalPension },
    { name: 'Urealniona', wartosc: result.realPension },
    { name: 'Prognozowana', wartosc: projectedNominal },
  ];

  const salaryData = [
    { name: 'Z chorobami', wartosc: result.salaryWithSickLeave },
    { name: 'Bez chorób', wartosc: result.salaryWithoutSickLeave },
  ];

  return (
    <Paper sx={{ mt: 4, p: 4, borderRadius: 2, bgcolor: 'rgb(250,250,250)' }}>
      <Typography variant="h5" sx={{ mb: 3, color: 'rgb(0,65,110)', fontWeight: 700 }}>
        Wynik symulacji
      </Typography>

      {/* Wykres emerytur */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Emerytura (nominalna / urealniona / prognozowana)</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={pensionData} margin={{ top: 10, bottom: 10 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(0) + ' zł'} />
          <Legend />
          <Bar dataKey="wartosc" fill="rgb(63,132,210)" barSize={40} />
        </BarChart>
      </ResponsiveContainer>

      {/* Wykres wynagrodzenia */}
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>Wynagrodzenie (z chorobami / bez chorób)</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={salaryData} margin={{ top: 10, bottom: 10 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(0) + ' zł'} />
          <Legend />
          <Bar dataKey="wartosc" fill="rgb(255,179,79)" barSize={40} />
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

      {/* Interaktywny wpływ odłożenia emerytury */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {[0, 1, 2, 5].map((year) => (
          <Button
            key={year}
            variant={extraYears === year ? 'contained' : 'outlined'}
            onClick={() => setExtraYears(year)}
          >
            Odłóż o {year} {year === 1 ? 'rok' : 'lat/a'}
          </Button>
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
  <Typography sx={{ fontSize: "1.1rem" }}>
    Prognozowana emerytura po odłożeniu:&nbsp;
    <Typography component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
      {projectedNominal.toFixed(0)} zł
    </Typography>
    &nbsp;(urealniona:&nbsp;
    <Typography component="span" sx={{ color: "secondary.main", fontWeight: 700 }}>
      {projectedReal.toFixed(0)} zł
    </Typography>
    )
  </Typography>

  {expectedPension && projectedNominal < expectedPension && (
    <Typography sx={{ mt: 1.5, color: "error.main", fontWeight: 600 }}>
      Aby osiągnąć oczekiwaną emeryturę&nbsp;
      <Typography component="span" sx={{ fontWeight: 700 }}>
        ({expectedPension} zł)
      </Typography>, musisz pracować jeszcze około&nbsp;
      <Typography component="span" sx={{ fontWeight: 700 }}>
        {yearsNeeded} lat
      </Typography>.
    </Typography>
  )}
</Box>

    </Paper>
  );
}
