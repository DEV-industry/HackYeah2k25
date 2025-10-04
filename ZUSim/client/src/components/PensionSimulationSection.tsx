import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
} from '@mui/material';
import { PensionResult } from './types';
import PensionSimulationResult from './PensionSimulationResult';
import DashboardTiles from './DashboardTiles';

export default function PensionSimulationSection() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [subAccountBalance, setSubAccountBalance] = useState('');
  const [includeSickLeave, setIncludeSickLeave] = useState(false);

  const [result, setResult] = useState<PensionResult | null>(null);
  const [dashboardReady, setDashboardReady] = useState(false);
  const [postalCode, setPostalCode] = useState('');

  const simulatePension = () => {
    const start = parseInt(startYear);
    const end = parseInt(endYear);
    const baseSalary = parseFloat(salary);
    const genderKey = gender as 'male' | 'female';

    if (!start || !end || !baseSalary || !genderKey) {
      setDashboardReady(false);
      return;
    }

    const acc = parseFloat(accountBalance) || 0;
    const subAcc = parseFloat(subAccountBalance) || 0;
    const retirementRate = 0.1952;
    const salaryGrowth = 0.05;
    const inflationRate = 0.03;
    const averageSickDays = { male: 10, female: 14 };

    let adjustedSalary = baseSalary / Math.pow(1 + salaryGrowth, new Date().getFullYear() - start);
    let totalContributions = 0;
    let salaryWithSick = 0;
    let salaryWithoutSick = 0;

    for (let year = start; year <= end; year++) {
      adjustedSalary *= 1 + salaryGrowth;
      const effectiveSalary = includeSickLeave
        ? adjustedSalary * (1 - averageSickDays[genderKey] / 260)
        : adjustedSalary;

      totalContributions += effectiveSalary * retirementRate;
      salaryWithSick += effectiveSalary;
      salaryWithoutSick += adjustedSalary;
    }

    totalContributions += acc + subAcc;

    const expectedRetirementYears = 20;
    const nominalPension = totalContributions / expectedRetirementYears;
    const realPension = nominalPension / Math.pow(1 + inflationRate, end - new Date().getFullYear());
    const replacementRate = nominalPension / baseSalary;

    setResult({
      nominalPension,
      realPension,
      replacementRate,
      salaryWithSickLeave: salaryWithSick,
      salaryWithoutSickLeave: salaryWithoutSick,
    });

    setDashboardReady(true);
  };

  return (
    <Paper sx={{ p: 4, mt: 4, borderRadius: 2 }} elevation={3}>
      <Typography variant="h4" sx={{ mb: 3, color: 'rgb(0,65,110)', fontWeight: 700 }}>
        Symulacja przyszłej emerytury
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, flexWrap: 'wrap' }}>
        <TextField label="Wiek" type="number" value={age} onChange={(e) => setAge(e.target.value)} sx={{ flex: 1, minWidth: '150px' }} required />
        <FormControl sx={{ flex: 1, minWidth: '150px' }} required>
          <InputLabel>Płeć</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="male">Mężczyzna</MenuItem>
            <MenuItem value="female">Kobieta</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Wynagrodzenie brutto" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} sx={{ flex: 1, minWidth: '150px' }} required />
        <TextField label="Rok rozpoczęcia pracy" type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} sx={{ flex: 1, minWidth: '150px' }} placeholder="styczeń" required />
        <TextField label="Planowany rok zakończenia pracy" type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} sx={{ flex: 1, minWidth: '150px' }} placeholder="styczeń" required />
        <TextField label="Środki na koncie w ZUS" type="number" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} sx={{ flex: 1, minWidth: '150px' }} />
        <TextField label="Środki na subkoncie w ZUS" type="number" value={subAccountBalance} onChange={(e) => setSubAccountBalance(e.target.value)} sx={{ flex: 1, minWidth: '150px' }} />
        <FormControlLabel control={<Checkbox checked={includeSickLeave} onChange={(e) => setIncludeSickLeave(e.target.checked)} />} label="Uwzględniaj możliwość zwolnień lekarskich" sx={{ flexBasis: '100%' }} />
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" sx={{ fontWeight: 700 }} onClick={simulatePension}>
          Zaprognozuj moją przyszłą emeryturę
        </Button>
      </Box>

      {result && <PensionSimulationResult result={result} />}

      {/* Dashboard Tiles */}
      <DashboardTiles dashboardReady={dashboardReady} postalCode={postalCode} setPostalCode={setPostalCode} />
    </Paper>
  );
}
