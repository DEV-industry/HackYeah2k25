import { ChevronUp } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialIcon {
  label: string;
  icon: string;
  href: string;
}

interface FooterProps {
  navigationLinks?: FooterLink[];
  topLinks?: FooterLink[];
  socialIcons?: SocialIcon[];
  backToTopLabel?: string;
}

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
  socialIcons = [
    { label: 'Elektroniczny ZUS', icon: 'E-ZUS', href: '#' },
    { label: 'LinkedIn', icon: 'in', href: '#' },
    { label: 'X', icon: 'X', href: '#' },
    { label: 'Kanał RSS', icon: 'RSS', href: '#' },
  ],
  backToTopLabel = 'Do góry',
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="bg-[rgb(0,153,63)] text-primary-foreground w-full"
      data-testid="footer-main"
    >
      <div className="w-full max-w-[1100px] mx-auto px-0 py-12 md:py-16">
        {/* =================== DESKTOP (≥1024px) =================== */}
        <div className="hidden lg:grid lg:grid-cols-[2fr_3fr_1fr] gap-16">
          {/* Left: Navigation */}
          <nav
            className="grid grid-cols-2 gap-x-8 gap-y-3"
            data-testid="footer-nav"
          >
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm hover:underline transition-colors duration-200"
                data-testid={`link-footer-nav-${index}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Center: Top links + Social */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 text-sm justify-center">
              {topLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:underline transition-colors duration-200"
                  data-testid={`link-footer-top-${index}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div
              className="flex gap-6 justify-center items-center"
              data-testid="footer-social"
            >
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity duration-200"
                  data-testid={`link-footer-social-${index}`}
                >
                  <div className="w-9 h-9 rounded-full bg-white text-[rgb(0,153,63)] flex items-center justify-center text-xs font-semibold">
                    {social.icon}
                  </div>
                  <span className="text-xs">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Back to top (text + round icon) */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-white text-sm font-medium">
              {backToTopLabel}
            </span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[rgb(0,153,63)] transition-all duration-200"
              aria-label="Wróć na górę strony"
              data-testid="button-back-to-top-desktop"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* =================== TABLET (≥768px && <1024px) =================== */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-12">
          {/* Left: Navigation */}
          <nav
            className="grid grid-cols-2 gap-x-6 gap-y-3"
            data-testid="footer-nav-tablet"
          >
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm hover:underline transition-colors duration-200"
                data-testid={`link-footer-nav-tablet-${index}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Top links + Social + Back to top */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 text-sm flex-wrap">
              {topLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:underline transition-colors duration-200"
                  data-testid={`link-footer-top-tablet-${index}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div
              className="flex gap-5 flex-wrap"
              data-testid="footer-social-tablet"
            >
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity duration-200"
                  data-testid={`link-footer-social-tablet-${index}`}
                >
                  <div className="w-9 h-9 rounded-full bg-white text-[rgb(0,153,63)] flex items-center justify-center text-xs font-semibold">
                    {social.icon}
                  </div>
                  <span className="text-xs">{social.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center justify-start gap-2 mt-2">
              <span className="text-white text-sm font-medium">
                {backToTopLabel}
              </span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[rgb(0,153,63)] transition-all duration-200"
                aria-label="Wróć na górę strony"
                data-testid="button-back-to-top-tablet"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* =================== MOBILE (<768px) =================== */}
        <div className="md:hidden flex flex-col gap-8">
          {/* Navigation */}
          <nav
            className="grid grid-cols-1 gap-y-3"
            data-testid="footer-nav-mobile"
          >
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-base hover:underline transition-colors duration-200"
                data-testid={`link-footer-nav-mobile-${index}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Top links */}
          <div className="flex flex-col gap-3 text-base">
            {topLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:underline transition-colors duration-200"
                data-testid={`link-footer-top-mobile-${index}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div
            className="flex gap-6 justify-center flex-wrap"
            data-testid="footer-social-mobile"
          >
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity duration-200"
                data-testid={`link-footer-social-mobile-${index}`}
              >
                <div className="w-10 h-10 rounded-full bg-white text-[rgb(0,153,63)] flex items-center justify-center text-xs font-semibold">
                  {social.icon}
                </div>
                <span className="text-xs">{social.label}</span>
              </a>
            ))}
          </div>

          {/* Back to top */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-white text-sm font-medium">
              {backToTopLabel}
            </span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[rgb(0,153,63)] transition-all duration-200"
              aria-label="Wróć na górę strony"
              data-testid="button-back-to-top-mobile"
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
