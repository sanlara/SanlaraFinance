import React from 'react';
import { table } from '../../styles/components';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <table className={`${table.base} ${className}`}>
      {children}
    </table>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

Table.Header = function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`${table.header} ${className}`}>
      {children}
    </thead>
  );
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

Table.Row = function TableRow({ children, className = '' }: TableRowProps) {
  return (
    <tr className={`${table.row} ${className}`}>
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

Table.Cell = function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`${table.cell} ${className}`}>
      {children}
    </td>
  );
};