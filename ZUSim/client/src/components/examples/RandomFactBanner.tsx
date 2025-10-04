import RandomFactBanner from '../RandomFactBanner';
import { PensionFact } from '@shared/schema';

export default function RandomFactBannerExample() {
  const mockFacts: PensionFact[] = [
    {
      text: 'Czy wiesz, że najwyższą emeryturę w Polsce otrzymuje mieszkaniec województwa śląskiego, wysokość jego emerytury to 14 200 zł, pracował przez 47 lat, nie był nigdy na zwolnieniu lekarskim.'
    },
    {
      text: 'Czy wiesz, że średnia emerytura w Polsce wzrosła o 12% w ostatnim roku, głównie dzięki waloryzacji?'
    },
    {
      text: 'Czy wiesz, że kobiety w Polsce przechodzą na emeryturę średnio 5 lat wcześniej niż mężczyźni, co wpływa na wysokość ich świadczeń?'
    }
  ];

  return <RandomFactBanner facts={mockFacts} />;
}
