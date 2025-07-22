// Status.tsx
import Loader from 'react-dots-loader';
import 'react-dots-loader/index.css';
import { StatProps } from './types';

export default function Status({ sm, loader }: StatProps) {
  const isError = sm.toLowerCase().includes('disconnect');
  const isWorking = sm.toLowerCase().includes('homing') || sm.toLowerCase().includes('archiving');
  const statusColor = isError
    ? 'text-red-500'
    : isWorking
    ? 'text-yellow-500'
    : 'text-green-500';

  return (
    <div className="flex items-center gap-3 p-2 text-lg font-semibold bg-gray-100 dark:bg-gray-800 rounded">
      <span className="text-gray-700 dark:text-gray-300">Status:</span>
      <span className={`${statusColor}`}>{sm}</span>
      {loader && <Loader visible color="#48cae4" size={12} />}
    </div>
  );
}
