import { useEffect, useState } from 'react';
import { NavProps } from './types';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Nav({ command, progress, buttondis }: NavProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply the dark mode class to <html> (Tailwind default root)
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="h-16 w-full flex items-center justify-between px-4 bg-cyan-200 dark:bg-cyan-900 shadow-md">
      {/* Title */}
      <h1 className="text-xl font-bold text-blue-900 dark:text-white">Gantry</h1>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Progress Circle */}
        <div className="w-12 h-12">
          <CircularProgressbar
            value={progress}
            text={`${Math.floor(progress)}%`}
            styles={buildStyles({
              pathColor: '#00b4d8',
              textColor: darkMode ? '#fff' : '#000',
              trailColor: '#d6d6d6',
            })}
          />
        </div>

        {/* Archive Button */}
        <button
          onClick={command}
          disabled={buttondis}
          className={`px-4 py-2 rounded font-medium transition-all ${
            buttondis
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-cyan-400 hover:bg-cyan-500 text-white'
          }`}
        >
          Archive
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 text-sm rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </div>
  );
}
