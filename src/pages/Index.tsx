import { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBlogStore } from '@/hooks/useBlogStore';
import { Navbar } from '@/components/Navbar';
import { BlogCard } from '@/components/BlogCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { t } = useTranslation();
  const { posts } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'technology', 'life', 'travel', 'food', 'design', 'other'];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10 animate-float" />
        <div className="absolute inset-0 animate-shimmer" />
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-2">
                <span className="gradient-text">{t('hero.title')}</span>
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 px-4">
                {t('hero.subtitle')}
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                <Search className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('hero.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg glass-card border-2 focus:border-primary transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-4">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all hover:scale-105 text-xs sm:text-sm px-2 sm:px-3 py-1 ${
                      selectedCategory === category 
                        ? 'gradient-bg text-white' 
                        : 'hover:bg-accent'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {t(`categories.${category}`)}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <AnimatedSection 
                  key={post.id} 
                  animation="fade-up"
                  delay={index * 100}
                >
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection animation="fade-in">
              <div className="text-center py-12 sm:py-20 px-4">
                <p className="text-base sm:text-xl text-muted-foreground">
                  {searchTerm ? t('filter.noResults') : t('filter.noPosts')}
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
