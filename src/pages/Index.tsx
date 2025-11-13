import { useState } from 'react';
import { Search } from 'lucide-react';
import { useBlogStore } from '@/hooks/useBlogStore';
import { Navbar } from '@/components/Navbar';
import { BlogCard } from '@/components/BlogCard';
import { Input } from '@/components/ui/input';

const Index = () => {
  const { posts } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10 animate-float" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              <span className="gradient-text">Luxe Blog</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 animate-fade-in">
              探索技术的无限可能，分享生活的精彩瞬间
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto animate-fade-in">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索文章、标签..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg glass-card border-2 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                {searchTerm ? '没有找到匹配的文章' : '暂无文章'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
