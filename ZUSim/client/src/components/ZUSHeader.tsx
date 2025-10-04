import {
  ChevronDown,
  Volume2,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={LogoZus}
                alt="ZUS - Zakład Ubezpieczeń Społecznych"
                className="h-12 object-contain flex-shrink-0"
                data-testid="img-zus-logo"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Contact Link */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-foreground"
              data-testid="button-contact"
            >
              Kontakt
            </Button>

            {/* Language Selector */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-foreground"
              onClick={() => setLanguage(language === 'PL' ? 'EN' : 'PL')}
              data-testid="button-language"
            >
              {language}
              <ChevronDown className="h-4 w-4" />
            </Button>

            {/* Accessibility Icons */}
            <Button
              size="icon"
              className="bg-blue text-white hover:bg-blue/90 border-0"
              data-testid="button-audio-assist"
            >
              <Volume2 className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-blue text-white hover:bg-blue/90 border-0"
              data-testid="button-accessibility"
            >
              <Accessibility className="h-4 w-4" />
            </Button>

            {/* IBIP Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex px-2 text-foreground"
              data-testid="button-ibip"
              onClick={() => window.open('https://bip.zus.pl/', '_blank')} // otwiera w nowej karcie
            >
              <span className="text-xs font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">
                i
              </span>
              <span className="text-xs font-semibold ml-0.5">bip</span>
            </Button>

            {/* Register Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex gap-1 whitespace-nowrap"
              data-testid="button-register"
            >
              Zarejestruj w PUE/eZUS
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Login Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex gap-1 whitespace-nowrap"
              style={{ backgroundColor: 'rgb(255, 179, 79)' }}
              data-testid="button-register"
            >
              Zaloguj do PUE/eZUS
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Search Button */}
            <Button
              size="icon"
              variant="ghost"
              className="bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:hover:bg-primary/30"
              data-testid="button-search"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* EU Flag */}
            <div
              className="hidden xl:flex items-center gap-2 ml-2"
              data-testid="eu-badge"
            >
              <div className="w-10 h-6 rounded-sm overflow-hidden flex-shrink-0">
                <img
                  src={UE} // <-- zamień na ścieżkę do Twojej flagi
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
