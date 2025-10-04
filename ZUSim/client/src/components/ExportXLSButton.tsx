import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
import { PensionResult } from './types';

interface ExportXLSButtonProps {
  age: number;
  gender: 'male' | 'female';
  salary: number;
  startYear: number;
  endYear: number;
  accountBalance: number;
  subAccountBalance: number;
  includeSickLeave: boolean;
  result: PensionResult;
}

export const ExportXLSButton = ({
  age,
  gender,
  salary,
  startYear,
  endYear,
  accountBalance,
  subAccountBalance,
  includeSickLeave,
  result,
}: ExportXLSButtonProps) => {
  const handleExport = () => {
    const headers = [
      'Data użycia',
      'Godzina użycia',
      'Emerytura oczekiwana',
      'Wiek',
      'Płeć',
      'Wysokość wynagrodzenia',
      'Czy uwzględniał okresy choroby',
      'Środki na koncie',
      'Środki na subkoncie',
      'Emerytura rzeczywista',
      'Emerytura urealniona',
    ];

    const now = new Date();
    const row = [
      now.toLocaleDateString(),
      now.toLocaleTimeString(),
      result.nominalPension.toFixed(2),
      age,
      gender === 'male' ? 'Mężczyzna' : 'Kobieta',
      salary,
      includeSickLeave ? 'Tak' : 'Nie',
      accountBalance,
      subAccountBalance,
      result.realPension.toFixed(2),
      result.nominalPension.toFixed(2),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([headers, row]);

    // Auto szerokość kolumn
    const colWidths = [headers, row].reduce<number[]>((acc, curr) => {
      curr.forEach((cell, i) => {
        const len = cell ? cell.toString().length : 0;
        acc[i] = acc[i] && acc[i] > len ? acc[i] : len;
      });
      return acc;
    }, []);
    worksheet['!cols'] = colWidths.map((w) => ({ wch: w + 2 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Raport symulatora');

    // Zapisz i pobierz plik
    XLSX.writeFile(workbook, 'raport_emerytury.xlsx');
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleExport}
      sx={{ ml: 2 }}
    >
      Pobierz XLS
    </Button>
  );
};
