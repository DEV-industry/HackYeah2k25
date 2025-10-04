import { useState } from 'react';
import { Box } from '@mui/material';
import PensionInputSection from '@/components/PensionInputSection';
import PensionDistributionChart from '@/components/PensionDistributionChart';
import RandomFactBanner from '@/components/RandomFactBanner';
import PensionSimulationSection from '@/components/PensionSimulationSection';
import { PensionGroup, PensionFact } from '@shared/schema';
import ZUSHeader from '@/components/ZUSHeader';

export default function Home() {
  const [desiredPension, setDesiredPension] = useState('');

  const pensionGroups: PensionGroup[] = [
    {
      name: 'Poniżej minimalnej',
      amount: 1200,
      description:
        'Świadczeniobiorcy otrzymujący emeryturę w wysokości poniżej minimalnej wykazywali się niską aktywnością zawodową, nie przepracowali minimum 25 lat dla mężczyzn i 20 lat dla kobiet, w związku z tym nie nabyli prawa do gwarancji minimalnej emerytury.',
      color: 'rgb(240, 94, 94)',
    },
    {
      name: 'Minimalna',
      amount: 1780,
      description:
        'Emerytury na poziomie minimalnym otrzymują osoby, które przepracowały wymagany staż, ale ich składki były niewielkie. Gwarancja minimalna zapewnia podstawowy poziom świadczenia.',
      color: 'rgb(190, 195, 206)',
    },
    {
      name: 'Poniżej średniej',
      amount: 2500,
      description:
        'Grupa emerytów z niższymi zarobkami w trakcie kariery zawodowej lub z przerwami w zatrudnieniu. Stanowią znaczną część świadczeniobiorców.',
      color: 'rgb(63, 132, 210)',
    },
    {
      name: 'Średnia',
      amount: 3200,
      description:
        'Emeryci z regularną aktywnością zawodową i średnimi zarobkami w gospodarce. Reprezentują typową sytuację polskiego emeryta.',
      color: 'rgb(255, 179, 79)',
    },
    {
      name: 'Powyżej średniej',
      amount: 4500,
      description:
        'Osoby z wyższymi zarobkami, długim stażem pracy i regularnym opłacaniem składek. Często specjaliści lub osoby na stanowiskach kierowniczych.',
      color: 'rgb(0, 153, 63)',
    },
    {
      name: 'Wysokie',
      amount: 6800,
      description:
        'Najwyższe emerytury otrzymują osoby z bardzo długim stażem pracy, wysokimi zarobkami i pełną historią składkową. Stanowią niewielki procent emerytów.',
      color: 'rgb(0, 65, 110)',
    },
  ];

  const pensionFacts: PensionFact[] = [
    {
      text: 'Czy wiesz, że najwyższą emeryturę w Polsce otrzymuje mieszkaniec województwa śląskiego, wysokość jego emerytury to 14 200 zł, pracował przez 47 lat, nie był nigdy na zwolnieniu lekarskim.',
    },
    {
      text: 'Czy wiesz, że średnia emerytura w Polsce wzrosła o 12% w ostatnim roku, głównie dzięki waloryzacji?',
    },
    {
      text: 'Czy wiesz, że kobiety w Polsce przechodzą na emeryturę średnio 5 lat wcześniej niż mężczyźni, co wpływa na wysokość ich świadczeń?',
    },
    {
      text: 'Czy wiesz, że emerytury górnicze należą do najwyższych w Polsce, ze średnią przekraczającą 5 000 zł miesięcznie?',
    },
    {
      text: 'Czy wiesz, że tylko 15% polskich emerytów otrzymuje świadczenie powyżej 4 000 zł miesięcznie?',
    },
  ];

  const averagePension = 3200;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'column' }, // domyślnie kolumna na małych ekranach
        minHeight: '100vh',
        bgcolor: 'white',
      }}
      data-testid="page-home"
    >
      <ZUSHeader />

      {/* Input Section */}
      <Box
        sx={{
          height: { xs: 'auto', md: '40vh' },
          minHeight: { xs: '200px', md: '250px' },
          p: 2,
        }}
      >
        <PensionInputSection
          desiredPension={desiredPension}
          onDesiredPensionChange={setDesiredPension}
          averagePension={averagePension}
        />
      </Box>

      {/* Distribution Chart */}
      <Box
        sx={{
          height: { xs: 'auto', md: '50vh' },
          minHeight: { xs: '250px', md: '300px' },
          bgcolor: 'rgb(250, 250, 250)',
          p: 2,
          mt: 2,
        }}
      >
        <PensionDistributionChart groups={pensionGroups} />
      </Box>

      {/* Random Fact Banner */}
      <Box
        sx={{
          height: { xs: 'auto', md: '10vh' },
          minHeight: { xs: '70px', md: '80px' },
          p: 2,
          mt: 2,
        }}
      >
        <RandomFactBanner facts={pensionFacts} />
        <PensionSimulationSection />
      </Box>
    </Box>
  );
}
