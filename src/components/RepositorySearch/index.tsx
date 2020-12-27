import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import styles from './index.module.scss';
import { maxSearchQueryLength } from '../../constants';

type RepositorySearchProps = {
  onSearch: (query: string) => void;
}

const placeholder = 'Search Repositories';

export const RepositorySearch: FC<RepositorySearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    onSearch(query);
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
