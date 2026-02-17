import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface UseDebouncedSearchReturn {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
}

export function useDebouncedSearch(
  initialValue: string,
  onSearch: (value: string | undefined) => void,
  delay: number = 1000,
): UseDebouncedSearchReturn {
  const [searchInput, setSearchInput] = useState(initialValue);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value || undefined);
  }, delay);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    debouncedSearch.cancel();
    onSearch(undefined);
  };

  return {
    searchInput,
    setSearchInput,
    handleSearchChange,
    handleClearSearch,
  };
}
