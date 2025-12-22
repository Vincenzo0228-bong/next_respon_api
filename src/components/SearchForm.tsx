import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import styles from './SearchForm.module.scss';

interface SearchFormData {
  title: string;
}

interface SearchFormProps {
  register: UseFormRegister<SearchFormData>;
  handleSubmit: UseFormHandleSubmit<SearchFormData>;
  onSubmit: (data: SearchFormData) => void;
  placeholder?: string;
}

export default function SearchForm({
  register,
  handleSubmit,
  onSubmit,
  placeholder = 'Search...',
}: SearchFormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
      <input
        type="text"
        {...register('title')}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}

