import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  startPage,
  endPage,
  onPageChange,
}: PaginationProps) {
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={styles.pageButton}
        >
          Previous
        </button>
      )}

      <div className={styles.pages}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ''
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={styles.pageButton}
        >
          Next
        </button>
      )}
    </div>
  );
}

