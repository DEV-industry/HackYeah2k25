import { useRef } from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import LogoZUS from './logo-zus.png';

interface PensionResult {
  nominalPension: number;
  realPension: number;
  replacementRate: number;
  salaryWithSickLeave: number;
  salaryWithoutSickLeave: number;
}

interface ExportPDFButtonProps {
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

export const ExportPDFButton = ({
  age,
  gender,
  salary,
  startYear,
  endYear,
  accountBalance,
  subAccountBalance,
  includeSickLeave,
  result,
}: ExportPDFButtonProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const salaryData = [
    { name: 'Uwzględnia zwolnienia', value: result.salaryWithSickLeave },
    { name: 'Bez zwolnień', value: result.salaryWithoutSickLeave },
  ];

  const pensionData = [
    { name: 'Emerytura nominalna', value: result.nominalPension },
    { name: 'Emerytura rzeczywista', value: result.realPension },
  ];

  const handleExportPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // dopasowanie obrazu do strony
    const imgProps = {
      width: pdfWidth,
      height: (canvas.height * pdfWidth) / canvas.width,
    };

    if (imgProps.height <= pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgProps.width, imgProps.height);
    } else {
      // jeśli większe niż strona → skalowanie do 2 stron
      const ratio = pdfHeight / imgProps.height;
      const newHeight = imgProps.height * ratio;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, newHeight);

      // druga strona
      const remainingHeight = imgProps.height - pdfHeight / ratio;
      if (remainingHeight > 0) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          'PNG',
          0,
          -pdfHeight / ratio,
          pdfWidth,
          newHeight
        );
      }
    }

    pdf.save('raport_emerytury.pdf');
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleExportPDF}>
        Pobierz PDF
      </Button>

      <div
        ref={pdfRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '800px',
          padding: '40px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        <img
          src={LogoZUS}
          alt="ZUS Logo"
          style={{ width: '200px', marginBottom: '20px' }}
        />

        <h1
          style={{
            color: '#00416e',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          Raport Symulacji Emerytury
        </h1>

        <section style={{ marginBottom: '30px' }}>
          <h2
            style={{
              borderBottom: '2px solid #00416e',
              paddingBottom: '5px',
              marginBottom: '10px',
            }}
          >
            Dane wejściowe
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>Wiek</td>
                <td>{age}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>Płeć</td>
                <td>{gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Wynagrodzenie brutto
                </td>
                <td>{salary} zł</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Rok rozpoczęcia pracy
                </td>
                <td>{startYear}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Rok zakończenia pracy
                </td>
                <td>{endYear}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Środki na koncie ZUS
                </td>
                <td>{accountBalance} zł</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Środki na subkoncie ZUS
                </td>
                <td>{subAccountBalance} zł</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Uwzględnia zwolnienia
                </td>
                <td>{includeSickLeave ? 'Tak' : 'Nie'}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2
            style={{
              borderBottom: '2px solid #00416e',
              paddingBottom: '5px',
              marginBottom: '10px',
            }}
          >
            Wyniki symulacji
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Emerytura nominalna
                </td>
                <td>{result.nominalPension.toFixed(2)} zł</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Emerytura rzeczywista
                </td>
                <td>{result.realPension.toFixed(2)} zł</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '5px' }}>
                  Wskaźnik zastąpienia
                </td>
                <td>{(result.replacementRate * 100).toFixed(2)} %</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2
            style={{
              borderBottom: '2px solid #00416e',
              paddingBottom: '5px',
              marginBottom: '10px',
            }}
          >
            Emerytura nominalna vs rzeczywista
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pensionData} margin={{ top: 10, bottom: 10 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => value.toFixed(0) + ' zł'}
              />
              <Legend />
              <Bar dataKey="value" fill="#4fb3ff" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2
            style={{
              borderBottom: '2px solid #00416e',
              paddingBottom: '5px',
              marginBottom: '10px',
            }}
          >
            Wynagrodzenie (z chorobami / bez chorób)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salaryData} margin={{ top: 10, bottom: 10 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => value.toFixed(0) + ' zł'}
              />
              <Legend />
              <Bar dataKey="value" fill="#ffb34f" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </>
  );
};
