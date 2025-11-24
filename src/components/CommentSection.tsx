import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { AnimatedSection } from './AnimatedSection';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: '张三',
      content: '这篇文章写得太好了！内容很有深度，学到了很多东西。',
      date: '2024-03-15',
      replies: [
        {
          id: '1-1',
          author: '博主',
          content: '谢谢支持！很高兴能对你有所帮助。',
          date: '2024-03-15',
        },
      ],
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: t('comments.error'),
        description: t('comments.fillAllFields'),
        variant: 'destructive',
      });
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName,
      content: newComment,
      date: new Date().toISOString().split('T')[0],
    };

    if (replyTo) {
      setComments(
        comments.map((c) =>
          c.id === replyTo
            ? { ...c, replies: [...(c.replies || []), comment] }
            : c
        )
      );
      setReplyTo(null);
    } else {
      setComments([comment, ...comments]);
    }

    setNewComment('');
    toast({
      title: t('comments.success'),
      description: t('comments.successDesc'),
    });
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex gap-4 ${isReply ? 'ml-12 mt-4' : 'mb-6'}`}>
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary/10 text-primary">
          {comment.author[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-foreground">{comment.author}</span>
          <span className="text-sm text-muted-foreground">{comment.date}</span>
        </div>
        <p className="text-foreground mb-2">{comment.content}</p>
        {!isReply && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyTo(comment.id)}
            className="text-primary hover:text-primary/80"
          >
            {t('comments.reply')}
          </Button>
        )}
        {comment.replies?.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <AnimatedSection className="mt-12">
      <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          {t('comments.title')} ({comments.length})
        </h2>

        {/* Comment Form */}
        <div className="mb-8 space-y-4">
          {replyTo && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t('comments.replyingTo')}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyTo(null)}
                className="h-6 px-2"
              >
                {t('comments.cancel')}
              </Button>
            </div>
          )}
          <Input
            placeholder={t('comments.namePlaceholder')}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="bg-background/50"
          />
          <Textarea
            placeholder={t('comments.commentPlaceholder')}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] bg-background/50"
          />
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            {t('comments.submit')}
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
