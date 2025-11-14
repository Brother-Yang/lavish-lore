import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Trash2, Edit, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBlogStore } from '@/hooks/useBlogStore';
import { Navbar } from '@/components/Navbar';
import { ReadingProgress } from '@/components/ReadingProgress';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const BlogPost = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getPost, deletePost } = useBlogStore();
  
  const post = id ? getPost(id) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('post.notFound')}</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('post.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (id) {
      deletePost(id);
      toast({
        title: t('post.deleteSuccess'),
        description: t('post.deleteSuccessDesc'),
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Navbar />
      
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <AnimatedSection animation="fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-accent/20 transition-all hover:scale-105"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('post.backToHome')}
          </Button>

          <div className="glass-card p-8 sm:p-12 rounded-2xl hover-lift">
            {/* Post Header */}
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text animate-fade-in">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                {post.views !== undefined && (
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{post.views} {t('post.views')}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-medium">{t('post.author')}: {post.author}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.category && (
                  <Badge variant="default" className="gradient-bg">
                    {t(`categories.${post.category}`)}
                  </Badge>
                )}
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 transition-all hover:scale-105">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/edit/${id}`)}
                  className="hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {t('post.edit')}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="hover:bg-destructive hover:text-destructive-foreground transition-all hover:scale-105">
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t('post.delete')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-card">
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('post.deleteConfirm')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('post.deleteDescription')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('post.cancel')}</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        {t('post.confirm')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </header>

            {/* Post Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none font-serif">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold mb-4 mt-8">
                      {paragraph.substring(2)}
                    </h1>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mb-3 mt-6">
                      {paragraph.substring(3)}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-bold mb-2 mt-4">
                      {paragraph.substring(4)}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-6 mb-2">
                      {paragraph.substring(2)}
                    </li>
                  );
                }
                if (paragraph.trim() === '') {
                  return <br key={index} />;
                }
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </article>
    </div>
  );
};

export default BlogPost;
