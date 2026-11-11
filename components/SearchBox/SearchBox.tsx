import type { ChangeEvent } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input type="text" placeholder="Search notes" onChange={handleChange} />
  );
}
