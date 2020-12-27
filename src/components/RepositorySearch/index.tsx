import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import styles from './index.module.scss';
import { maxSearchQueryLength } from '../../constants';

type RepositorySearchProps = {
  onSearch: (query: string) => void;
  query: string;
}

const placeholder = 'Search Repositories';

export const RepositorySearch: FC<RepositorySearchProps> = ({ onSearch, query }) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = (event: FormEvent) => {
    onSearch(inputValue);
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form
      className={styles.searchForm}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        autoFocus
        placeholder={placeholder}
        aria-placeholder={placeholder}
        value={inputValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="search">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{
          maxLength: maxSearchQueryLength,
        }}
        onChange={handleChange}
      />
    </form>
  );
};
