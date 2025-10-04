import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import LogoZUS from '../components/logo-zus.png';

export interface PensionResult {
  nominalPension: number;
  realPension: number;
  replacementRate: number;
  salaryWithSickLeave: number;
  salaryWithoutSickLeave: number;
}

export interface GeneratePDFProps {
  age: number;
  gender: string;
  salary: number;
  startYear: number;
  endYear: number;
  accountBalance: number;
  subAccountBalance: number;
  includeSickLeave: boolean;
  result: PensionResult;
}

export const generatePDF = async ({
  age,
  gender,
  salary,
  startYear,
  endYear,
  accountBalance,
  subAccountBalance,
  includeSickLeave,
  result,
}: GeneratePDFProps) => {
  // Tworzymy ukrytą divkę w pamięci
  const pdfDiv = document.createElement('div');
  pdfDiv.style.width = '800px';
  pdfDiv.style.padding = '40px';
  pdfDiv.style.fontFamily = 'Arial, sans-serif';
  pdfDiv.style.backgroundColor = '#fff';
  pdfDiv.style.color = '#000';

  pdfDiv.innerHTML = `
    <img src="${LogoZUS}" style="width:200px; margin-bottom:20px;" />
    <h1 style="color:#00416e; text-align:center; margin-bottom:40px;">Raport Symulacji Emerytury</h1>

    <h2>Dane wejściowe</h2>
    <table style="width:100%; border-collapse:collapse;">
      <tr><td><b>Wiek</b></td><td>${age}</td></tr>
      <tr><td><b>Płeć</b></td><td>${gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</td></tr>
      <tr><td><b>Wynagrodzenie brutto</b></td><td>${salary} zł</td></tr>
      <tr><td><b>Rok rozpoczęcia pracy</b></td><td>${startYear}</td></tr>
      <tr><td><b>Rok zakończenia pracy</b></td><td>${endYear}</td></tr>
      <tr><td><b>Środki na koncie ZUS</b></td><td>${accountBalance} zł</td></tr>
      <tr><td><b>Środki na subkoncie ZUS</b></td><td>${subAccountBalance} zł</td></tr>
      <tr><td><b>Uwzględnia zwolnienia</b></td><td>${includeSickLeave ? 'Tak' : 'Nie'}</td></tr>
    </table>

    <h2>Wyniki symulacji</h2>
    <table style="width:100%; border-collapse:collapse;">
      <tr><td><b>Emerytura nominalna</b></td><td>${result.nominalPension.toFixed(2)} zł</td></tr>
      <tr><td><b>Emerytura rzeczywista</b></td><td>${result.realPension.toFixed(2)} zł</td></tr>
      <tr><td><b>Wskaźnik zastąpienia</b></td><td>${(result.replacementRate*100).toFixed(2)} %</td></tr>
    </table>
  `;

  document.body.appendChild(pdfDiv);

  const canvas = await html2canvas(pdfDiv, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps = {
    width: pdfWidth,
    height: (canvas.height * pdfWidth) / canvas.width,
  };

  pdf.addImage(imgData, 'PNG', 0, 0, imgProps.width, imgProps.height);
  pdf.save('raport_emerytury.pdf');

  document.body.removeChild(pdfDiv);
};
