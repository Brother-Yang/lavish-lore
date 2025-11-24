import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Share2, Link2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatedSection } from './AnimatedSection';

interface SocialShareProps {
  title: string;
  url?: string;
}

export const SocialShare = ({ title, url = window.location.href }: SocialShareProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: t('share.copySuccess'),
        description: t('share.copySuccessDesc'),
      });
    } catch (err) {
      toast({
        title: t('share.copyError'),
        description: t('share.copyErrorDesc'),
        variant: 'destructive',
      });
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <AnimatedSection className="mt-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Share2 className="h-5 w-5" />
          <span className="font-medium">{t('share.title')}</span>
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="gap-2"
          >
            <Link2 className="h-4 w-4" />
            {t('share.copyLink')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('twitter')}
            className="gap-2"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('facebook')}
            className="gap-2"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('linkedin')}
            className="gap-2"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
};
