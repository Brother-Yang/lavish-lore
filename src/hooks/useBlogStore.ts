import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  category?: string;
  views?: number;
}

interface BlogStore {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: [
        {
          id: '1',
          title: '欢迎来到 Luxe Blog',
          content: `# 欢迎来到 Luxe Blog

这是一个现代化的个人博客平台，专为分享技术见解和生活感悟而设计。

## 主要特性

- ✨ **豪华设计**：采用玻璃态效果和流动渐变，打造视觉冲击力
- 🎨 **主题切换**：支持深色/浅色模式，自由切换
- 📱 **响应式**：完美适配各种设备尺寸
- ⚡ **高性能**：优化加载速度，流畅的用户体验
- 📝 **Markdown支持**：使用Markdown编写文章

## 开始使用

点击右上角的"创建文章"按钮，即可开始你的创作之旅！

## 技术栈

这个博客使用了最新的 Web 技术：
- React 18
- TypeScript
- Tailwind CSS
- Zustand (状态管理)
- React Router (路由)

希望你在这里度过愉快的创作时光！`,
          excerpt: '探索现代化博客平台的魅力，开启你的创作之旅',
          author: 'Luxe Blog',
          date: new Date().toISOString(),
          readTime: '3 分钟',
          tags: ['欢迎', '介绍', '开始'],
          category: 'technology',
          views: 128,
        },
      ],
      addPost: (post) =>
        set((state) => ({
          posts: [
            {
              ...post,
              id: Date.now().toString(),
              date: new Date().toISOString(),
            },
            ...state.posts,
          ],
        })),
      updatePost: (id, post) =>
        set((state) => ({
          posts: state.posts.map((p) => (p.id === id ? { ...p, ...post } : p)),
        })),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        })),
      getPost: (id) => get().posts.find((p) => p.id === id),
    }),
    {
      name: 'blog-storage',
    }
  )
);
