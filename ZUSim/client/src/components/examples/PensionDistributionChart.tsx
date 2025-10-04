import PensionDistributionChart from '../PensionDistributionChart';
import { PensionGroup } from '@shared/schema';

export default function PensionDistributionChartExample() {
  const mockGroups: PensionGroup[] = [
    {
      name: 'Poniżej minimalnej',
      amount: 1200,
      description: 'Świadczeniobiorcy otrzymujący emeryturę w wysokości poniżej minimalnej wykazywali się niską aktywnością zawodową, nie przepracowali minimum 25 lat dla mężczyzn i 20 lat dla kobiet, w związku z tym nie nabyli prawa do gwarancji minimalnej emerytury.',
      color: 'rgb(240, 94, 94)'
    },
    {
      name: 'Minimalna',
      amount: 1780,
      description: 'Emerytury na poziomie minimalnym otrzymują osoby, które przepracowały wymagany staż, ale ich składki były niewielkie. Gwarancja minimalna zapewnia podstawowy poziom świadczenia.',
      color: 'rgb(190, 195, 206)'
    },
    {
      name: 'Poniżej średniej',
      amount: 2500,
      description: 'Grupa emerytów z niższymi zarobkami w trakcie kariery zawodowej lub z przerwami w zatrudnieniu. Stanowią znaczną część świadczeniobiorców.',
      color: 'rgb(63, 132, 210)'
    },
    {
      name: 'Średnia',
      amount: 3200,
      description: 'Emeryci z regularną aktywnością zawodową i średnimi zarobkami w gospodarce. Reprezentują typową sytuację polskiego emeryta.',
      color: 'rgb(255, 179, 79)'
    },
    {
      name: 'Powyżej średniej',
      amount: 4500,
      description: 'Osoby z wyższymi zarobkami, długim stażem pracy i regularnym opłacaniem składek. Często specjaliści lub osoby na stanowiskach kierowniczych.',
      color: 'rgb(0, 153, 63)'
    },
    {
      name: 'Wysokie',
      amount: 6800,
      description: 'Najwyższe emerytury otrzymują osoby z bardzo długim stażem pracy, wysokimi zarobkami i pełną historią składkową. Stanowią niewielki procent emerytów.',
      color: 'rgb(0, 65, 110)'
    }
  ];

  return <PensionDistributionChart groups={mockGroups} />;
}
