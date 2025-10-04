import { useState } from 'react';
import { Box } from '@mui/material';
import PensionInputSection from '@/components/PensionInputSection';
import PensionDistributionChart from '@/components/PensionDistributionChart';
import RandomFactBanner from '@/components/RandomFactBanner';
import PensionSimulationSection from '@/components/PensionSimulationSection';
import { PensionGroup, PensionFact } from '@shared/schema';
import ZUSHeader from '@/components/ZUSHeader';
import Footer from '@/components/Footer';
import PensionReportSection from '@/components/DashboardTiles';
import DashboardTiles from '@/components/DashboardTiles';

export default function Home() {
  const [desiredPension, setDesiredPension] = useState('');

  const pensionGroups: PensionGroup[] = [
    {
      name: 'Poniżej minimalnej',
      amount: 1200,
      description:
        'Świadczeniobiorcy otrzymujący emeryturę w wysokości poniżej minimalnej wykazywali się niską aktywnością zawodową...',
      color: 'rgb(240, 94, 94)',
    },
    {
      name: 'Minimalna',
      amount: 1780,
      description:
        'Emerytury na poziomie minimalnym otrzymują osoby, które przepracowały wymagany staż...',
      color: 'rgb(190, 195, 206)',
    },
    {
      name: 'Poniżej średniej',
      amount: 2500,
      description:
        'Grupa emerytów z niższymi zarobkami w trakcie kariery zawodowej...',
      color: 'rgb(63, 132, 210)',
    },
    {
      name: 'Średnia',
      amount: 3200,
      description:
        'Emeryci z regularną aktywnością zawodową i średnimi zarobkami...',
      color: 'rgb(255, 179, 79)',
    },
    {
      name: 'Powyżej średniej',
      amount: 4500,
      description:
        'Osoby z wyższymi zarobkami, długim stażem pracy i regularnym opłacaniem składek...',
      color: 'rgb(0, 153, 63)',
    },
    {
      name: 'Wysokie',
      amount: 6800,
      description:
        'Najwyższe emerytury otrzymują osoby z bardzo długim stażem pracy...',
      color: 'rgb(0, 65, 110)',
    },
  ];

  const pensionFacts: PensionFact[] = [
    { text: 'Czy wiesz, że najwyższą emeryturę w Polsce otrzymuje mieszkaniec województwa śląskiego...' },
    { text: 'Czy wiesz, że średnia emerytura w Polsce wzrosła o 12% w ostatnim roku...' },
    { text: 'Czy wiesz, że kobiety w Polsce przechodzą na emeryturę średnio 5 lat wcześniej...' },
    { text: 'Czy wiesz, że emerytury górnicze należą do najwyższych w Polsce...' },
    { text: 'Czy wiesz, że tylko 15% polskich emerytów otrzymuje świadczenie powyżej 4 000 zł...' },
  ];

  const averagePension = 3200;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'white',
      }}
      data-testid="page-home"
    >
      <ZUSHeader />

      {/* GŁÓWNY BLOK STRONY */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1100px', // <= ograniczenie szerokości
          mx: 'auto', // wyśrodkowanie
          px: 2, // wewnętrzne odstępy po bokach
          flex: 1, // wypełnia przestrzeń
        }}
      >
        {/* Input Section */}
<Box
  sx={{
    height: { xs: 'auto', md: '40vh' },
    minHeight: { xs: '200px', md: '250px' },
    my: 2,
    borderRadius: 2,
    backgroundImage: 'url("https://images.unsplash.com/photo-1574376407492-c3cf78231def?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Box
    sx={{
      width: '99%',
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 2,
      p: 3,
    }}
  >
    <PensionInputSection
      desiredPension={desiredPension}
      onDesiredPensionChange={setDesiredPension}
      averagePension={averagePension}
    />
  </Box>
</Box>


        {/* Distribution Chart */}
        <Box
          sx={{
            height: { xs: 'auto', md: '50vh' },
            minHeight: { xs: '250px', md: '300px' },
            bgcolor: 'rgb(250, 250, 250)',
            p: 2,
            borderRadius: 2,
            my: 2,
          }}
        >
          <PensionDistributionChart groups={pensionGroups} />
        </Box>

        {/* Random Fact Banner + Symulacja */}
        <Box
          sx={{
            my: 2,
            p: 2,
          }}
        >
          <RandomFactBanner facts={pensionFacts} />
          <Box sx={{ mt: 2 }}>
            <PensionSimulationSection />
          </Box>
        </Box>
      </Box>
      {/* Stopka */}
      <Footer />
    </Box>
  );
}
