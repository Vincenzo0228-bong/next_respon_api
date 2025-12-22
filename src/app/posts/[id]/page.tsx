"use client";

import { use } from 'react';
import Link from 'next/link';
import { useGetPostQuery, useGetCommentsQuery } from '@/store/api';
import CommentCard from '@/components/CommentCard';
import styles from './post.module.scss';

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const postId = parseInt(id, 10);

  const { data: post, isLoading: postLoading, error: postError } = useGetPostQuery(postId);
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useGetCommentsQuery(postId);

  if (postLoading) {
    return (
      <div className={styles.postPage}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading post...</div>
        </div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className={styles.postPage}>
        <div className={styles.container}>
          <div className={styles.error}>Error loading post. Please try again.</div>
          <Link href="/posts" className={styles.backLink}>
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.postPage}>
      <div className={styles.container}>
        <Link href="/posts" className={styles.backLink}>
          ← Back to Posts
        </Link>

        <article className={styles.post}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <p className={styles.postBody}>{post.body}</p>
        </article>

        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>Comments</h2>
          
          {commentsLoading && (
            <div className={styles.loading}>Loading comments...</div>
          )}

          {commentsError && (
            <div className={styles.error}>Error loading comments.</div>
          )}

          {comments && comments.length === 0 && (
            <div className={styles.noComments}>No comments yet.</div>
          )}

          {comments && comments.length > 0 && (
            <div className={styles.commentsList}>
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

