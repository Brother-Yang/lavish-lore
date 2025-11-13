import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useBlogStore } from '@/hooks/useBlogStore';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreatePost = () => {
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
        });
      }
    }
  }, [id, isEditing, getPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.excerpt || !formData.author) {
      toast({
        title: '错误',
        description: '请填写所有必填字段',
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
      toast({
        title: '更新成功',
        description: '文章已更新',
      });
    } else {
      addPost(postData);
      toast({
        title: '创建成功',
        description: '文章已发布',
      });
    }
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-accent/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回首页
        </Button>

        <Card className="glass-card border-2">
          <CardHeader>
            <CardTitle className="text-3xl gradient-text">
              {isEditing ? '编辑文章' : '创建新文章'}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">
                  标题 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="输入文章标题"
                  className="text-lg h-12 glass-card"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-base">
                  摘要 <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="文章简短描述"
                  className="resize-none glass-card"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-base">
                  正文 <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="使用 Markdown 格式编写文章内容&#10;&#10;# 一级标题&#10;## 二级标题&#10;- 列表项"
                  className="resize-none font-mono glass-card"
                  rows={16}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-base">
                    作者 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="你的名字"
                    className="glass-card"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTime" className="text-base">
                    阅读时长
                  </Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="例如：5 分钟"
                    className="glass-card"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-base">
                  标签
                </Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="用逗号分隔，例如：技术, React, TypeScript"
                  className="glass-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage" className="text-base">
                  封面图片 URL
                </Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="glass-card"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="gradient-bg hover:opacity-90 transition-opacity flex-1 sm:flex-none"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? '更新文章' : '发布文章'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="hover:bg-accent/20"
                >
                  取消
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
