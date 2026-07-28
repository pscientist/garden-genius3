const filterLabels = [
  "Budget",
  "Skills",
  "Maintenance",
] as const;

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-[#6b7280]"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}

type SearchFiltersProps = {
  budgetFilter: string;
  onBudgetChange: (value: string) => void;
}

export function SearchFilters({budgetFilter, onBudgetChange}: SearchFiltersProps) {
  return (
    <div className="font-inter flex flex-wrap items-center justify-end gap-3">
      <select value={budgetFilter} onChange={(e) => { onBudgetChange(e.target.value)}} className="border-1 px-1 py-1 border-main-nav/20 rounded-lg"> 
        <option value="">Budget...</option>
        <option value="Under 500">$500</option>
        <option value="500-1000">$500 - $1000</option>
        <option value="Over 1000">Over $1000</option>
      </select>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-1 text-sm font-medium text-main-nav transition hover:text-hover-active hover:opacity-80"
      >
        Clear Filters
        <ClearIcon />
      </button>
    </div>
  );
}
