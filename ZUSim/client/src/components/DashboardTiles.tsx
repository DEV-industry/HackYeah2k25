import { Box, Paper, Typography, TextField, SxProps, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import { ExportPDFButton } from './ExportPDFButton';
import { ExportXLSButton } from './ExportXLSButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { PensionResult } from './types';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutDashboard, FileText, Table, ExternalLink, Check } from "lucide-react";
import { generatePDF } from '@/hooks/generatePDF';
import { generateXLS } from '@/hooks/generateXLS';

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
  const [postalConfirmed, setPostalConfirmed] = useState(false);

  const cardStyle: SxProps = {
    p: 3,
    textAlign: 'center',
    borderRadius: 2,
    boxShadow: 3,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    background: 'white',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 6,
    },
    minHeight: '140px',
  };

  const postalCardStyle: SxProps = {
    ...cardStyle,
    cursor: 'default',
    '&:hover': {
      transform: 'none',
      boxShadow: 3,
    },
  };

  const handlePDFClick = () => {
    if (!result) return;
    ExportPDFButton({
      age,
      gender,
      salary,
      startYear,
      endYear,
      accountBalance,
      subAccountBalance,
      includeSickLeave,
      result,
    });
  };

  const handleXLSClick = () => {
    if (!result) return;
    ExportXLSButton({
      age,
      gender: gender as 'male' | 'female',
      salary,
      startYear,
      endYear,
      accountBalance,
      subAccountBalance,
      includeSickLeave,
      result,
      postalCode: postalConfirmed ? postalCode : 'Nie podano',
    });
  };

return (
    <div className="relative max-w-[1100px] mx-auto mt-8 p-[65px]">
      {!dashboardReady && (
        <div className="absolute -inset-5 bg-background/80 backdrop-blur-md rounded-xl z-10 flex items-center justify-center p-6">
          <p className="text-lg font-bold text-chart-1 text-center max-w-md">
            Aby uzyskać dostęp do opcji pulpitu nawigacyjnego, najpierw wypełnij formularz emerytalny
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Dashboard Tile */}
        <Card
          className={`relative overflow-hidden border-2 transition-all duration-300 ${
            dashboardReady
              ? "hover-elevate active-elevate-2 cursor-pointer hover:shadow-lg "
              : "cursor-not-allowed opacity-60 border-border"
          }`}
          onClick={dashboardReady ? onGoToDashboard : undefined}
          data-testid="card-dashboard"
        >
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1670141545540-7ffd026a6c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGF1dHVtbiUyMGxlYXZlc3xlbnwwfHwwfHx8MA%3D%3D)',
            }}
          />
          <CardContent className="relative p-6 flex flex-col items-center justify-center min-h-[140px] gap-3">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-8 w-8 " />
              <span className="text-lg font-bold ">
                Otwórz w Dashboard
              </span>
              <ExternalLink className="h-5 w-5 " />
            </div>
          </CardContent>
        </Card>

        {/* Postal Code Tile */}
        <Card
          className="border-2 border-border bg-card/50 backdrop-blur-sm"
          data-testid="card-postal"
        >
          <CardContent className="p-6 flex flex-col items-start justify-center min-h-[140px] gap-3">
            <Label className="text-lg font-bold text-foreground">
              Kod pocztowy
            </Label>
            <div className="flex gap-2 items-center w-full">
              <Input
                placeholder="Nieobligatoryjne"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                  setPostalConfirmed(false);
                }}
                className="flex-1 bg-background/50"
                data-testid="input-postal-code"
              />
              {!postalConfirmed && (
                <Button
                  onClick={() => setPostalConfirmed(true)}
                  className="bg-chart-2 hover:bg-chart-2 text-white whitespace-nowrap px-4"
                  data-testid="button-confirm-postal"
                >
                  Zatwierdź
                </Button>
              )}
            </div>
            {postalConfirmed && (
              <div className="flex items-center gap-2 text-chart-2">
                <span className="text-sm font-medium">Zatwierdzono</span>
                <Check className="h-4 w-4" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* PDF Tile */}
        <Card
          className={`border-2 transition-all duration-300 ${
            result
              ? "hover-elevate active-elevate-2 cursor-pointer hover:shadow-lg border-destructive/20"
              : "cursor-not-allowed opacity-60 border-border"
          }`}
          onClick={result ? () => generatePDF({ age, gender, salary, startYear, endYear, accountBalance, subAccountBalance, includeSickLeave, result }) : undefined}
          data-testid="card-pdf"
        >
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[140px] gap-3">
            <FileText className="h-10 w-10 text-destructive" />
            <span className="text-lg font-bold text-foreground">
              Pobierz PDF
            </span>
          </CardContent>
        </Card>

        {/* XLS Tile */}
        <Card
          className={`border-2 transition-all duration-300 ${
            result
              ? "hover-elevate active-elevate-2 cursor-pointer hover:shadow-lg border-chart-1/20"
              : "cursor-not-allowed opacity-60 border-border"
          }`}
            onClick={result ? () => generateXLS({ age, gender, salary, startYear, endYear, accountBalance, subAccountBalance, includeSickLeave, result, postalCode: postalConfirmed ? postalCode : 'Nie podano' }) : undefined}
          data-testid="card-xls"
        >
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[140px] gap-3">
            <Table className="h-10 w-10 text-chart-1" />
            <span className="text-lg font-bold text-foreground">
              Pobierz XLS
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

