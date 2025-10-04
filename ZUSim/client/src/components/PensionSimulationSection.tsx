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

export default function PensionSimulationSection() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [subAccountBalance, setSubAccountBalance] = useState('');
  const [includeSickLeave, setIncludeSickLeave] = useState(false);

  const handleSubmit = () => {
    // Tutaj podłączysz logikę symulacji emerytury
    console.log({
      age,
      gender,
      salary,
      startYear,
      endYear,
      accountBalance,
      subAccountBalance,
      includeSickLeave,
    });
    alert('Symulacja uruchomiona (tutaj podłącz logikę)!'); 
  };

  return (
    <Paper sx={{ p: 4, mt: 4, borderRadius: 2 }} elevation={3}>
      <Typography variant="h4" sx={{ mb: 3, color: 'rgb(0,65,110)', fontWeight: 700 }}>
        Symulacja przyszłej emerytury
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {/* Obowiązkowe pola */}
        <TextField
          label="Wiek"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{ flex: 1, minWidth: '150px' }}
          required
        />
        <FormControl sx={{ flex: 1, minWidth: '150px' }} required>
          <InputLabel>Płeć</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="male">Mężczyzna</MenuItem>
            <MenuItem value="female">Kobieta</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Wynagrodzenie brutto"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          sx={{ flex: 1, minWidth: '150px' }}
          required
        />
        <TextField
          label="Rok rozpoczęcia pracy"
          type="number"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          sx={{ flex: 1, minWidth: '150px' }}
          placeholder="styczeń"
          required
        />
        <TextField
          label="Planowany rok zakończenia pracy"
          type="number"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          sx={{ flex: 1, minWidth: '150px' }}
          placeholder="styczeń"
          required
        />

        {/* Fakultatywne pola */}
        <TextField
          label="Środki na koncie w ZUS"
          type="number"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
          sx={{ flex: 1, minWidth: '150px' }}
        />
        <TextField
          label="Środki na subkoncie w ZUS"
          type="number"
          value={subAccountBalance}
          onChange={(e) => setSubAccountBalance(e.target.value)}
          sx={{ flex: 1, minWidth: '150px' }}
        />

        {/* Checkbox zwolnienia lekarskie */}
        <FormControlLabel
          control={
            <Checkbox
              checked={includeSickLeave}
              onChange={(e) => setIncludeSickLeave(e.target.checked)}
            />
          }
          label="Uwzględniaj możliwość zwolnień lekarskich"
          sx={{ flexBasis: '100%' }}
        />
      </Box>

      {/* Przycisk symulacji */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: 700 }}
          onClick={handleSubmit}
        >
          Zaprognozuj moją przyszłą emeryturę
        </Button>
      </Box>
    </Paper>
  );
}
