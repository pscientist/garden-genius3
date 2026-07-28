type SearchBoxProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export function SearchBox({searchTerm, onSearchChange} : SearchBoxProps) {
  return (
    <div className="font-inter border-1 border-main-nav px-1 py-1 rounded-lg">
      <input
        type="text"
        name="search_box"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
