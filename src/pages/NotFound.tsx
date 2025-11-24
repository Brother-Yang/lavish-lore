import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <AnimatedSection animation="fade-up">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold gradient-text mb-4">404</h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-2">
              {t('error.notFound')}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/70">
              {t('error.notFoundDesc')}
            </p>
          </div>
          <Button asChild className="gradient-bg hover:opacity-90 transition-all shadow-lg hover:shadow-xl">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              {t('error.backHome')}
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default NotFound;
