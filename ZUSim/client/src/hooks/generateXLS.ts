import * as XLSX from 'xlsx';
import { PensionResult } from './generatePDF';

export interface GenerateXLSProps {
  age: number;
  gender: string;
  salary: number;
  startYear: number;
  endYear: number;
  accountBalance: number;
  subAccountBalance: number;
  includeSickLeave: boolean;
  result: PensionResult;
  postalCode: string;
}

export const generateXLS = ({
  age,
  gender,
  salary,
  startYear,
  endYear,
  accountBalance,
  subAccountBalance,
  includeSickLeave,
  result,
  postalCode,
}: GenerateXLSProps) => {
  const wsData = [
    ['Pole', 'Wartość'],
    ['Wiek', age],
    ['Płeć', gender],
    ['Wynagrodzenie', salary],
    ['Rok rozpoczęcia pracy', startYear],
    ['Rok zakończenia pracy', endYear],
    ['Środki na koncie ZUS', accountBalance],
    ['Środki na subkoncie ZUS', subAccountBalance],
    ['Uwzględnia zwolnienia', includeSickLeave ? 'Tak' : 'Nie'],
    ['Kod pocztowy', postalCode],
    ['Emerytura nominalna', result.nominalPension],
    ['Emerytura rzeczywista', result.realPension],
    ['Wskaźnik zastąpienia', result.replacementRate],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Raport');
  XLSX.writeFile(wb, 'raport_emerytury.xlsx');
};
