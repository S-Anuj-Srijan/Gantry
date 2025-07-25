// Body.tsx
import Logs from './Logs';
import Table from './Table';
import { BodyProps } from './types';

export default function Body({ status, loader, logs, rowdata }: BodyProps) {
  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Logs Panel */}
      <div className="md:basis-1/3 w-full border-r border-gray-300 dark:border-gray-700 p-4 overflow-y-auto">
        <Logs status={status} loader={loader} logs={logs} />
      </div>

      {/* Table Panel */}
      <div className="md:basis-2/3 w-full p-4 overflow-x-auto">
        <Table rowdata={rowdata} />
      </div>
    </div>
  );
}
