import * as React from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  caption?: React.ReactNode;
  getRowKey?: (row: T, index: number) => string | number;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  caption,
  getRowKey,
  onRowClick,
  className,
}: DataTableProps<T>) {
  return (
    <Table
      className={className}
      containerLabel={typeof caption === 'string' ? caption : 'Data table'}
    >
      {caption && <caption className="sr-only">{caption}</caption>}
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHead key={column.key} className={column.headerClassName}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={onRowClick ? 'cursor-pointer' : undefined}
          >
            {columns.map(column => (
              <TableCell key={column.key} className={column.className}>
                {column.render
                  ? column.render(row)
                  : String((row as Record<string, unknown>)[column.key] ?? '')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

DataTable.displayName = 'DataTable';
