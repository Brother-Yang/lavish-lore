import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '@/hooks/useBlogStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { t } = useTranslation();

  return (
    <Link to={`/post/${post.id}`} className="block group">
      <Card className="glass-card overflow-hidden h-full transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl border-2 group-hover:border-primary/50 hover-lift animate-fade-in">
        {post.coverImage && (
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl group-hover:gradient-text transition-all duration-300 line-clamp-2">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm sm:text-base">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{new Date(post.date).toLocaleDateString()}</span>
              <span className="sm:hidden">{new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{post.readTime}</span>
            </div>
            {post.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{post.views}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
