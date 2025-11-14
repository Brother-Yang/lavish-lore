import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBlogStore } from '@/hooks/useBlogStore';
import { Navbar } from '@/components/Navbar';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CreatePost = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addPost, updatePost, getPost } = useBlogStore();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    readTime: '',
    tags: '',
    coverImage: '',
    category: 'technology',
  });

  useEffect(() => {
    if (isEditing && id) {
      const post = getPost(id);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          author: post.author,
          readTime: post.readTime,
          tags: post.tags.join(', '),
          coverImage: post.coverImage || '',
          category: post.category || 'technology',
        });
      }
    }
  }, [id, isEditing, getPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.excerpt || !formData.author) {
      toast({
        title: t('create.error'),
        description: t('create.fillAllFields'),
        variant: 'destructive',
      });
      return;
    }

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      coverImage: formData.coverImage || undefined,
    };

    if (isEditing && id) {
      updatePost(id, postData);
      toast({ title: t('create.updateSuccess'), description: t('create.updateSuccessDesc') });
    } else {
      addPost(postData);
      toast({ title: t('create.createSuccess'), description: t('create.createSuccessDesc') });
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <AnimatedSection animation="fade-in">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-8 hover:bg-accent/20 transition-all hover:scale-105">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('post.backToHome')}
          </Button>
          <Card className="glass-card border-2 hover-lift">
            <CardHeader>
              <CardTitle className="text-3xl gradient-text">
                {isEditing ? t('create.editTitle') : t('create.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('create.titleLabel')} <span className="text-destructive">*</span></Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder={t('create.titlePlaceholder')} className="text-lg h-12 glass-card" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">{t('create.excerptLabel')} <span className="text-destructive">*</span></Label>
                  <Textarea id="excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder={t('create.excerptPlaceholder')} className="resize-none glass-card" rows={2} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">{t('create.contentLabel')} <span className="text-destructive">*</span></Label>
                  <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder={t('create.contentPlaceholder')} className="resize-none font-mono glass-card" rows={16} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="author">{t('create.authorLabel')} <span className="text-destructive">*</span></Label>
                    <Input id="author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} placeholder={t('create.authorPlaceholder')} className="glass-card" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="readTime">{t('create.readTimeLabel')}</Label>
                    <Input id="readTime" value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} placeholder={t('create.readTimePlaceholder')} className="glass-card" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">{t('create.categoryLabel')}</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="glass-card"><SelectValue /></SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="technology">{t('categories.technology')}</SelectItem>
                      <SelectItem value="life">{t('categories.life')}</SelectItem>
                      <SelectItem value="travel">{t('categories.travel')}</SelectItem>
                      <SelectItem value="food">{t('categories.food')}</SelectItem>
                      <SelectItem value="design">{t('categories.design')}</SelectItem>
                      <SelectItem value="other">{t('categories.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">{t('create.tagsLabel')}</Label>
                  <Input id="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder={t('create.tagsPlaceholder')} className="glass-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverImage">{t('create.coverImageLabel')}</Label>
                  <Input id="coverImage" value={formData.coverImage} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} placeholder={t('create.coverImagePlaceholder')} className="glass-card" type="url" />
                </div>
                <Button type="submit" className="w-full gradient-bg hover:opacity-90 transition-all hover:scale-105 shadow-lg">
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? t('create.save') : t('create.publish')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CreatePost;
