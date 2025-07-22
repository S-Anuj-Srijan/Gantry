// Cell.tsx
import { CellProps } from './types';

export default function Cell({ basis, id, value }: CellProps) {
  const isEvenRow = id[0] % 2 === 0;
  const bgColor = isEvenRow
    ? 'bg-cyan-200 dark:bg-cyan-700'
    : 'bg-cyan-300 dark:bg-cyan-600';

  return (
    <div
      key={`${id[0]}-${id[1]}`}
      className={`basis-[${basis}%] ${bgColor} text-center p-2 border border-white dark:border-gray-800`}
    >
      {value}
    </div>
  );
}
