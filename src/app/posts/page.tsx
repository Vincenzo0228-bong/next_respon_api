"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useGetPostsQuery } from '@/store/api';
import PostCard from '@/components/PostCard';
import SearchForm from '@/components/SearchForm';
import Pagination from '@/components/Pagination';
import styles from './posts.module.scss';

interface SearchFormData {
  title: string;
}

export default function PostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  });

  const [searchTitle, setSearchTitle] = useState(() => {
    return searchParams.get('title') || '';
  });

  const { register, handleSubmit, watch, setValue } = useForm<SearchFormData>({
    defaultValues: {
      title: searchTitle,
    },
  });

  const watchedTitle = watch('title');

  const { data, isLoading, error } = useGetPostsQuery({
    page: currentPage,
    title: searchTitle || undefined,
  });

  useEffect(() => {
    setValue('title', searchTitle);
  }, [searchTitle, setValue]);

  const onSubmit = (data: SearchFormData) => {
    const title = data.title?.trim() || '';
    setSearchTitle(title);
    setCurrentPage(1);
    updateURL(1, title);
  };

  const updateURL = (page: number, title: string) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (title) params.set('title', title);
    router.push(`/posts${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    updateURL(selectedPage, searchTitle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = data ? Math.ceil(data.totalCount / 10) : 0;
  const maxPagesToShow = 10;
  
  // Calculate start and end page to show max 10 pages
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  // Adjust start page if we're near the end
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Posts</h1>
        
        <SearchForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          placeholder="Search posts by title..."
        />

        {isLoading && <div className={styles.loading}>Loading posts...</div>}
        
        {error && (
          <div className={styles.error}>
            Error loading posts. Please try again.
          </div>
        )}

        {data && data.posts.length === 0 && (
          <div className={styles.noResults}>
            No posts found matching your search.
          </div>
        )}

        {data && data.posts.length > 0 && (
          <>
            <div className={styles.postsList}>
              {data.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                startPage={startPage}
                endPage={endPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

