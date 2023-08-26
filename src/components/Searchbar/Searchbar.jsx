import styles from './Searchbar.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (search.trim() === '') {
      toast.error('Enter your search query');
      return;
    }
    onSubmit(search);
    setSearch('');
  };
  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={styles.SearchForm__input}
          onChange={handleChange}
          type="text"
          name="search"
          value={search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
