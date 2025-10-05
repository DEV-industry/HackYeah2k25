import {
  ChevronDown,
  EarOff,
  Accessibility,
  Search,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LogoZus from '@/components/logo-zus.png';
import UE from '@/components/ue.png';

export default function ZUSHeader() {
  const [language, setLanguage] = useState('PL');

  return (
    <header className="w-full bg-white dark:bg-background border-b border-border">
      {/* kontener ograniczony do 1100px, bez paddingów bocznych */}
      <div className="max-w-[1100px] mx-auto px-0">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={LogoZus}
                alt="ZUS - Zakład Ubezpieczeń Społecznych"
                className="h-12 object-contain flex-shrink-0 cursor-pointer"
                data-testid="img-zus-logo"
                onClick={() => (window.location.href = '/')}
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-foreground"
              data-testid="button-contact"
            >
              Kontakt
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-foreground"
              onClick={() => setLanguage(language === 'PL' ? 'EN' : 'PL')}
              data-testid="button-language"
              aria-label="Zmień język"
            >
              {language}
              <ChevronDown className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 border-0 flex items-center justify-center"
              data-testid="button-audio-assist"
              aria-label="Informacje dla osób niesłyszących"
              onClick={() =>
                window.open(
                  'https://www.zus.pl/o-zus/kontakt/obsluga-osob-z-niepelnosprawnosciami/informacje-dla-osob-nieslyszacych',
                  '_blank'
                )
              }
            >
              <EarOff className="h-4 w-4" stroke="white" />
            </Button>

            <Button
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 border-0 flex items-center justify-center"
              data-testid="button-accessibility"
              aria-label="Obsługa osób z niepełnosprawnościami"
              onClick={() =>
                window.open(
                  'https://www.zus.pl/o-zus/kontakt/obsluga-osob-z-niepelnosprawnosciami',
                  '_blank'
                )
              }
            >
              <Accessibility className="h-4 w-4" stroke="white" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex px-2 text-foreground"
              data-testid="button-ibip"
              onClick={() => window.open('https://bip.zus.pl/', '_blank')}
              aria-label="Biuletyn Informacji Publicznej"
            >
              <span className="text-xs font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">
                i
              </span>
              <span className="text-xs font-semibold ml-0.5">bip</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex gap-1 whitespace-nowrap"
              data-testid="button-register"
            >
              Zarejestruj w PUE/eZUS
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex gap-1 whitespace-nowrap"
              style={{ backgroundColor: 'rgb(255, 179, 79)' }}
              data-testid="button-login"
            >
              Zaloguj do PUE/eZUS
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:hover:bg-primary/30"
              data-testid="button-search"
              aria-label="Szukaj"
            >
              <Search className="h-4 w-4" />
            </Button>

            <div
              className="hidden xl:flex items-center gap-2 ml-2"
              data-testid="eu-badge"
              aria-label="Flaga Unii Europejskiej"
            >
              <div className="w-10 h-6 rounded-sm overflow-hidden flex-shrink-0">
                <img
                  src={UE}
                  alt="Flaga Unii Europejskiej"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
