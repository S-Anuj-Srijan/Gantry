// Table.tsx
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { RowClassParams } from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';
import { TableProps } from './types';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './Table.css';

export default function Table({ rowdata }: TableProps) {
  const pagination = true;
  const paginationPageSize = 50;
  const paginationPageSizeSelector = [20, 50, 100];

  const colDefs: ColDef[] = [
    { field: 'tt_id' },
    { field: 'pick' },
    { field: 'place' },
    { field: 'source' },
    { field: 'dest' },
  ];

  const rowClassRules = {
    'even:bg-cyan-100 dark:even:bg-slate-800': (params: RowClassParams) => params.node.rowIndex % 2 === 0,
    'odd:bg-cyan-200 dark:odd:bg-slate-700': (params: RowClassParams) => params.node.rowIndex % 2 !== 0,
    'text-sm text-gray-900 dark:text-gray-100': () => true,
  };

  const isDark = document.documentElement.classList.contains('dark');

  const myTheme = themeQuartz.withParams({
  spacing: 2,
  foregroundColor: isDark ? '#ffffff' : '#000000',
  backgroundColor: isDark ? '#0f172a' : '#f8fafc', // This changes the internal background
  headerBackgroundColor: isDark ? '#1e293b' : '#cfe2ff',
  rowHoverColor: isDark ? '#1e3a8a' : '#e3f2fd',
});


  ModuleRegistry.registerModules([AllCommunityModule]);

  return (
    <div className="ag-theme-quartz w-full h-full">
      <AgGridReact
        rowData={rowdata}
        columnDefs={colDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        rowClassRules={rowClassRules}
        theme={myTheme}
      />
    </div>
  );
}
