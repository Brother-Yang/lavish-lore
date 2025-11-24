import { Link } from 'react-router-dom';
import { PenSquare, Home, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

export const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 glass-card animate-slide-up">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-bg rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 animate-bounce-in">
              <span className="text-white font-bold text-lg sm:text-xl">L</span>
            </div>
            <span className="text-lg sm:text-xl font-bold gradient-text hidden sm:inline">
              {t('hero.title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
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
                {t('nav.create')}
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent/20">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="gradient-text text-left">{t('hero.title')}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <Button variant="outline" size="lg" asChild className="w-full justify-start" onClick={() => setOpen(false)}>
                    <Link to="/">
                      <Home className="h-5 w-5 mr-3" />
                      {t('nav.home')}
                    </Link>
                  </Button>
                  
                  <Button size="lg" asChild className="w-full gradient-bg hover:opacity-90" onClick={() => setOpen(false)}>
                    <Link to="/create">
                      <PenSquare className="h-5 w-5 mr-3" />
                      {t('nav.create')}
                    </Link>
                  </Button>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t('nav.language')}</span>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
