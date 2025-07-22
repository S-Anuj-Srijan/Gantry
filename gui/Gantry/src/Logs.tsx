// Logs.tsx
import Status from './Status';
import Messages from './Messages';
import { Logprops } from './types';

export default function Logs({ status, loader, logs }: Logprops) {
  return (
    <div className="h-full w-full flex flex-col bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md m-4 p-4">
      <Status sm={status} loader={loader} />
      <Messages logs={logs} />
    </div>
  );
}
