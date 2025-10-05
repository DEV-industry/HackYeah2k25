import { ChevronUp, Linkedin, Rss } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialIcon {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterProps {
  navigationLinks?: FooterLink[];
  topLinks?: FooterLink[];
  backToTopLabel?: string;
}

const socialIcons: SocialIcon[] = [
  {
    label: 'E-ZUS',
    href: '#',
    icon: <span className="text-xs font-bold">E-ZUS</span>,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775a4.932 4.932 0 0 0 2.163-2.723 9.864 9.864 0 0 1-3.127 1.195 4.918 4.918 0 0 0-8.384 4.482A13.945 13.945 0 0 1 1.671 3.149a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.229-.616v.061a4.926 4.926 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.085 4.935 4.935 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.104c-.396 0-.79-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.056 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.015-.634a9.936 9.936 0 0 0 2.457-2.548l.002-.003z" />
      </svg>
    ),
  },
  {
    label: 'RSS',
    href: '#',
    icon: <Rss className="w-5 h-5" />,
  },
];

function Footer({
  navigationLinks = [
    { label: 'Zamówienia publiczne', href: '#' },
    { label: 'Praca w ZUS', href: '#' },
    { label: 'Praca dla lekarzy', href: '#' },
    { label: 'Konkursy ofert', href: '#' },
    { label: 'Mienie zbędne', href: '#' },
    { label: 'Mapa serwisu', href: '#' },
  ],
  topLinks = [
    { label: 'Deklaracja dostępności', href: '#' },
    { label: 'Ustawienia plików cookies', href: '#' },
  ],
  backToTopLabel = 'Do góry',
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[rgb(0,153,63)] w-full text-white">
      <div className="max-w-[1100px] mx-auto px-4 py-12">
        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[2fr_3fr_1fr] gap-16">
          {/* Navigation */}
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3">
            {navigationLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm hover:underline transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Top links + Social */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 text-sm justify-center">
              {topLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="hover:underline transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex gap-6 justify-center items-center">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex flex-col items-center gap-1 transition-all duration-200 hover:opacity-80"
                >
                  <div className="w-9 h-9 rounded-full bg-white text-[rgb(0,153,63)] flex items-center justify-center">
                    {social.icon}
                  </div>
                  <span className="text-xs">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-medium">{backToTopLabel}</span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[rgb(0,153,63)] transition-all duration-200"
              aria-label="Wróć na górę strony"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tablet */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-12">
          {/* Navigation */}
          <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
            {navigationLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm hover:underline transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Top links + Social + Back */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 text-sm flex-wrap">
              {topLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="hover:underline transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex gap-5 flex-wrap">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-white text-[rgb(0,153,63)] flex items-center justify-center">
                    {social.icon}
                  </div>
                  <span className="text-xs">{social.label}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center justify-start gap-2 mt-2">
              <span className="text-sm font-medium">{backToTopLabel}</span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[rgb(0,153,63)] transition-all duration-200"
                aria-label="Wróć na górę strony"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-8">
          <nav className="grid grid-cols-1 gap-y-3">
            {navigationLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-base hover:underline transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-base">
            {topLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="hover:underline transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex gap-6 justify-center flex-wrap">
            {socialIcons.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-white text-[rgb(0,153,63)] flex items-center justify-center">
                  {social.icon}
                </div>
                <span className="text-xs">{social.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-medium">{backToTopLabel}</span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[rgb(0,153,63)] transition-all duration-200"
              aria-label="Wróć na górę strony"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
