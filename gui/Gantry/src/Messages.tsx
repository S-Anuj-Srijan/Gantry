// Messages.tsx
import { Logtype, MessageProps } from './types';

export default function Messages({ logs }: MessageProps) {
  return (
    <div className="overflow-y-auto h-full pr-2 space-y-1">
      {logs.map((e: Logtype, index: number) => (
        <div
          key={index}
          className={`px-3 py-1 rounded text-sm font-mono ${
            e.err
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}
        >
          → {e.msg}
        </div>
      ))}
    </div>
  );
}
