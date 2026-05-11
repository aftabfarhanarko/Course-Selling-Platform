"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── shadcn Table primitives (inline) ────────────────────────────────────────

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  );
}
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc" | null;

export interface ColumnDef<TData> {
  /** Unique key matching a key in TData (or a custom id) */
  id: string;
  /** Column header label */
  header: string;
  /** How to render the cell value. Defaults to `row[id]` */
  cell?: (row: TData) => React.ReactNode;
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Whether this column is searchable (used in global filter) */
  searchable?: boolean;
  /** Extra className for <th> / <td> */
  className?: string;
}

export interface RowAction<TData> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: TData) => void;
  /** Optional: hide action based on row data */
  hidden?: (row: TData) => boolean;
  /** Optional: style variant */
  variant?: "default" | "destructive";
}

export interface DataTableProps<TData extends { id: string | number }> {
  columns: ColumnDef<TData>[];
  data: TData[];
  /** Row actions shown in a dropdown per row */
  rowActions?: RowAction<TData>[];
  /** Rows per page options */
  pageSizeOptions?: number[];
  /** Default page size */
  defaultPageSize?: number;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Called whenever selection changes */
  onSelectionChange?: (selectedRows: TData[]) => void;
  /** Optional table caption */
  caption?: string;
  /** Optional className for the root wrapper */
  className?: string;
}

// ─── Icons (inline SVG, zero deps) ───────────────────────────────────────────

const ChevronUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 3.5 1.5 8.5h9L6 3.5Z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 8.5 1.5 3.5h9L6 8.5Z" />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M9 2 4 7l5 5" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M5 2l5 5-5 5" />
  </svg>
);
const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="3" r="1.25" />
    <circle cx="8" cy="8" r="1.25" />
    <circle cx="8" cy="13" r="1.25" />
  </svg>
);
const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="6.5" cy="6.5" r="4.5" />
    <path d="m10 10 3 3" strokeLinecap="round" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData extends { id: string | number }>({
  columns,
  data,
  rowActions,
  pageSizeOptions = [10, 20, 50],
  defaultPageSize = 10,
  searchPlaceholder = "Search…",
  onSelectionChange,
  caption,
  className,
}: DataTableProps<TData>) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const [selectedIds, setSelectedIds] = React.useState<Set<string | number>>(
    new Set(),
  );
  const [openActionRowId, setOpenActionRowId] = React.useState<
    string | number | null
  >(null);
  const actionMenuRef = React.useRef<HTMLDivElement>(null);

  // ── Close action menu on outside click ────────────────────────────────────
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(e.target as Node)
      ) {
        setOpenActionRowId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const searchableCols = columns.filter((c) => c.searchable !== false);
  const filtered = React.useMemo(() => {
    if (!globalFilter.trim()) return data;
    const q = globalFilter.toLowerCase();
    return data.filter((row) =>
      searchableCols.some((col) => {
        const val = (row as Record<string, unknown>)[col.id];
        return String(val ?? "")
          .toLowerCase()
          .includes(q);
      }),
    );
  }, [data, globalFilter, searchableCols]);

  // ── Sorting ────────────────────────────────────────────────────────────────
  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      const cmp =
        String(av ?? "") < String(bv ?? "")
          ? -1
          : String(av ?? "") > String(bv ?? "")
            ? 1
            : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  // Reset to page 1 when filter/sort changes
  React.useEffect(() => {
    setPage(1);
  }, [globalFilter, sortKey, sortDir, pageSize]);

  // ── Selection ──────────────────────────────────────────────────────────────
  const allPageIds = paged.map((r) => r.id);
  const allPageSelected =
    allPageIds.length > 0 && allPageIds.every((id) => selectedIds.has(id));
  const somePageSelected =
    allPageIds.some((id) => selectedIds.has(id)) && !allPageSelected;

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        allPageIds.forEach((id) => next.delete(id));
      } else {
        allPageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const toggleSelectRow = (id: string | number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  React.useEffect(() => {
    onSelectionChange?.(data.filter((r) => selectedIds.has(r.id)));
  }, [selectedIds]);

  // ── Sort handler ───────────────────────────────────────────────────────────
  const handleSort = (colId: string) => {
    if (sortKey !== colId) {
      setSortKey(colId);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  };

  const hasActions = rowActions && rowActions.length > 0;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="
              w-full h-9 pl-8 pr-3 rounded-md border border-input bg-background text-sm
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0
              transition
            "
          />
        </div>

        {/* Selection badge */}
        {selectedIds.size > 0 && (
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {selectedIds.size} selected
          </span>
        )}

        {/* Page size */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
          <span className="hidden sm:inline">Rows per page</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="
              h-9 rounded-md border border-input bg-background px-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-ring
            "
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Select-all checkbox */}
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = somePageSelected;
                  }}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                  aria-label="Select all"
                />
              </TableHead>

              {columns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    col.sortable !== false ? "cursor-pointer select-none" : "",
                    col.className,
                  )}
                  onClick={
                    col.sortable !== false
                      ? () => handleSort(col.id)
                      : undefined
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable !== false && (
                      <span className="inline-flex flex-col gap-px text-muted-foreground/50">
                        <span
                          className={cn(
                            sortKey === col.id && sortDir === "asc"
                              ? "text-foreground"
                              : "",
                          )}
                        >
                          <ChevronUpIcon />
                        </span>
                        <span
                          className={cn(
                            sortKey === col.id && sortDir === "desc"
                              ? "text-foreground"
                              : "",
                          )}
                        >
                          <ChevronDownIcon />
                        </span>
                      </span>
                    )}
                  </span>
                </TableHead>
              ))}

              {hasActions && <TableHead className="w-10" />}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 2 : 1)}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row) => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSelected ? "selected" : undefined}
                  >
                    {/* Row checkbox */}
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(row.id)}
                        className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                        aria-label={`Select row ${row.id}`}
                      />
                    </TableCell>

                    {/* Data cells */}
                    {columns.map((col) => (
                      <TableCell key={col.id} className={col.className}>
                        {col.cell
                          ? col.cell(row)
                          : String(
                              (row as Record<string, unknown>)[col.id] ?? "",
                            )}
                      </TableCell>
                    ))}

                    {/* Actions */}
                    {hasActions && (
                      <TableCell className="relative">
                        <button
                          onClick={() =>
                            setOpenActionRowId((prev) =>
                              prev === row.id ? null : row.id,
                            )
                          }
                          className="
                            p-1.5 rounded-md text-muted-foreground
                            hover:bg-accent hover:text-foreground
                            focus:outline-none focus:ring-2 focus:ring-ring
                            transition
                          "
                          aria-label="Row actions"
                        >
                          <DotsIcon />
                        </button>

                        {openActionRowId === row.id && (
                          <div
                            ref={actionMenuRef}
                            className="
                              absolute right-8 top-1/2 -translate-y-1/2 z-50
                              min-w-[140px] rounded-md border bg-popover shadow-md
                              py-1
                            "
                          >
                            {rowActions!
                              .filter((a) => !a.hidden?.(row))
                              .map((action, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    action.onClick(row);
                                    setOpenActionRowId(null);
                                  }}
                                  className={cn(
                                    "flex w-full items-center gap-2 px-3 py-1.5 text-sm transition",
                                    "hover:bg-accent focus:bg-accent focus:outline-none",
                                    action.variant === "destructive"
                                      ? "text-destructive hover:text-destructive"
                                      : "text-foreground",
                                  )}
                                >
                                  {action.icon && <span>{action.icon}</span>}
                                  {action.label}
                                </button>
                              ))}
                          </div>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>

          {caption && (
            <caption className="mt-4 text-sm text-muted-foreground">
              {caption}
            </caption>
          )}
        </Table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>
          {sorted.length === 0
            ? "No results"
            : `${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, sorted.length)} of ${sorted.length}`}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(1)}
            disabled={safePage === 1}
            className="
              px-2 py-1 rounded-md border border-input text-xs
              hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed
              transition
            "
          >
            «
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="
              p-1.5 rounded-md border border-input
              hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed
              transition
            "
          >
            <ChevronLeftIcon />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (n) =>
                n === 1 ||
                n === totalPages ||
                (n >= safePage - 1 && n <= safePage + 1),
            )
            .reduce<(number | "…")[]>((acc, n, i, arr) => {
              if (i > 0 && n - (arr[i - 1] as number) > 1) acc.push("…");
              acc.push(n);
              return acc;
            }, [])
            .map((n, i) =>
              n === "…" ? (
                <span key={`ellipsis-${i}`} className="px-1">
                  …
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n as number)}
                  className={cn(
                    "min-w-[32px] h-8 px-2 rounded-md border text-xs transition",
                    safePage === n
                      ? "bg-primary text-primary-foreground border-primary font-semibold"
                      : "border-input hover:bg-accent",
                  )}
                >
                  {n}
                </button>
              ),
            )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="
              p-1.5 rounded-md border border-input
              hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed
              transition
            "
          >
            <ChevronRightIcon />
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={safePage === totalPages}
            className="
              px-2 py-1 rounded-md border border-input text-xs
              hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed
              transition
            "
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
