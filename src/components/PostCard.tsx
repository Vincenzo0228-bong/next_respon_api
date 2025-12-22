import Link from 'next/link';
import { Post } from '@/store/api';
import styles from './PostCard.module.scss';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const truncatedBody = post.body.length > 150 
    ? `${post.body.substring(0, 150)}...` 
    : post.body;

  return (
    <Link href={`/posts/${post.id}`} className={styles.postCard}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postDescription}>{truncatedBody}</p>
    </Link>
  );
}

