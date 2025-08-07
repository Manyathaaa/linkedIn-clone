import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export default function PostCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{post.author?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <Link 
              href={`/profile/${post.authorId}`} 
              className="font-semibold text-gray-900 hover:text-blue-600"
            >
              {post.author?.name || 'Unknown User'}
            </Link>
            <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </CardContent>
    </Card>
  );
}
