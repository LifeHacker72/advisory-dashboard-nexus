
import { useState } from "react";
import { ArrowDown, ArrowUp, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  onClick?: (item: T) => void;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
  searchPlaceholder?: string;
}

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  keyExtractor,
  isLoading = false,
  searchPlaceholder = "Search..."
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortedData = () => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      // @ts-ignore - Dynamic access
      const aValue = a[sortKey];
      // @ts-ignore - Dynamic access
      const bValue = b[sortKey];

      if (aValue === bValue) return 0;

      const compareResult = aValue > bValue ? 1 : -1;
      return sortDirection === "asc" ? compareResult : -compareResult;
    });
  };

  const getFilteredData = () => {
    if (!searchQuery) return getSortedData();

    return getSortedData().filter((item) => {
      return Object.values(item).some((value) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  };

  const filteredData = getFilteredData();

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row gap-3 justify-between border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="pl-9 pr-4 py-2 text-sm rounded-md border border-input w-full sm:w-[240px] bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
                    column.sortable && "cursor-pointer hover:bg-muted transition-colors"
                  )}
                >
                  <div className="flex items-center">
                    {column.title}
                    
                    {column.sortable && sortKey === column.key && (
                      <span className="ml-1.5">
                        {sortDirection === "asc" ? (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDown className="h-3.5 w-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3">
                      <div className="h-4 bg-muted animate-pulse rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  No results found
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr
                  key={keyExtractor(item)}
                  className={cn(
                    "bg-card hover:bg-accent/5 transition-colors mb-2",
                    onRowClick && "cursor-pointer",
                    index < filteredData.length - 1 && "border-b-8 border-background"
                  )}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <td 
                      key={column.key} 
                      className="px-4 py-3 text-sm"
                      onClick={() => column.onClick && column.onClick(item)}
                    >
                      {column.render ? (
                        column.render(item)
                      ) : (
                        // @ts-ignore - Dynamic access
                        item[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div className="text-xs text-muted-foreground">
          Showing <strong>{filteredData.length}</strong> of{" "}
          <strong>{data.length}</strong> results
        </div>
        
        <div className="flex items-center space-x-6">
          <button disabled className="text-xs font-medium text-muted-foreground disabled:opacity-50">
            Previous
          </button>
          <div className="text-xs font-medium">Page 1 of 1</div>
          <button disabled className="text-xs font-medium text-muted-foreground disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
