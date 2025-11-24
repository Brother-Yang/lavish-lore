import { useTranslation } from 'react-i18next';
import { useBlogStore, BlogPost } from '@/hooks/useBlogStore';
import { BlogCard } from './BlogCard';
import { AnimatedSection } from './AnimatedSection';

interface RelatedPostsProps {
  currentPostId: string;
  currentTags: string[];
  currentCategory?: string;
}

export const RelatedPosts = ({ currentPostId, currentTags, currentCategory }: RelatedPostsProps) => {
  const { t } = useTranslation();
  const posts = useBlogStore((state) => state.posts);

  // Find related posts based on tags and category
  const relatedPosts = posts
    .filter((post) => post.id !== currentPostId)
    .map((post) => {
      let score = 0;
      // Same category gets higher score
      if (currentCategory && post.category === currentCategory) {
        score += 3;
      }
      // Matching tags
      const matchingTags = post.tags.filter((tag) => currentTags.includes(tag));
      score += matchingTags.length * 2;
      // Views bonus
      score += (post.views || 0) / 1000;
      return { ...post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <AnimatedSection className="mt-12">
      <div className="border-t border-border/50 pt-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          {t('related.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 100} animation="fade-up">
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
