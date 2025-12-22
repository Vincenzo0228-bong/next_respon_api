import { Comment } from '@/store/api';
import styles from './CommentCard.module.scss';

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className={styles.commentCard}>
      <h3 className={styles.commentTitle}>{comment.name}</h3>
      <p className={styles.commentBody}>{comment.body}</p>
      <p className={styles.commentEmail}>{comment.email}</p>
    </div>
  );
}

