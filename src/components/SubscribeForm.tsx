import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Rss } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatedSection } from './AnimatedSection';

export const SubscribeForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: t('subscribe.error'),
        description: t('subscribe.emailRequired'),
        variant: 'destructive',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: t('subscribe.error'),
        description: t('subscribe.invalidEmail'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('subscribe.success'),
        description: t('subscribe.successDesc'),
      });
      setEmail('');
    }, 1000);
  };

  return (
    <AnimatedSection className="mt-12">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg border border-border/50 p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              {t('subscribe.title')}
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            {t('subscribe.description')}
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={t('subscribe.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background/50"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="sm:w-auto">
              {isLoading ? t('subscribe.subscribing') : t('subscribe.subscribe')}
            </Button>
          </form>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Rss className="h-4 w-4" />
            <span>{t('subscribe.rssAvailable')}</span>
            <a
              href="/rss.xml"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('subscribe.rssLink')}
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
