import { Link } from 'react-router-dom';
import { PenSquare, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 glass-card animate-slide-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 animate-bounce-in">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              {t('hero.title')}
            </span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon" asChild className="hover:bg-accent/20 transition-all hover:scale-110">
              <Link to="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">{t('nav.home')}</span>
              </Link>
            </Button>
            
            <LanguageSwitcher />
            <ThemeToggle />

            <Button asChild className="gradient-bg hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <Link to="/create">
                <PenSquare className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t('nav.create')}</span>
                <span className="sm:hidden">{t('nav.createShort')}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
