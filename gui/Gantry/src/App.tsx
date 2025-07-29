import './App.css';
import Nav from './Nav';
import Body from './Body';
import socket from './socket';
import { useState, useEffect } from 'react';
import { Logtype, TableData } from './types';

export default function App() {
  const [status, setStatus] = useState('Connecting to Server');
  const [loader, setLoader] = useState(true);
  const [log, setLog] = useState<Logtype[]>([]);
  const [progress, setProgress] = useState(0);
  const [disable, disableButton] = useState(false);
  const [rowdata, appendRowData] = useState<TableData[]>([]);
  const [total, setTotal] = useState(-100);
  const [picked, incPicked] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const archive = () => {
    if (!disable) {
      socket.emit('robotCmd', { cmd: 'home' });
      disableButton(true);
    }
  };

  const calibrate = () => {
    if (!disable) {
      socket.emit('robotCmd', { cmd: 'calibrate' });
      disableButton(true);
    }
  };

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      setStatus('Connected to Server');
      setLoader(false);
      setLog(prev => [...prev, { msg: 'Connected', err: false }]);
    });

    socket.on('disconnect', () => {
      setStatus('Connecting to Server');
      setLoader(true);
      setLog(prev => [...prev, { msg: 'Disconnected', err: true }]);
    });

    socket.on('rstatus', (data) => {
      if (data.cmd === 'homing') {
        setStatus('Homing');
        setLoader(true);
        setLog(prev => [...prev, { msg: 'homing', err: false }]);
      } else if (data.cmd === 'homed') {
        setStatus('Homed');
        setLoader(false);
        disableButton(false);
        setLog(prev => [...prev, { msg: 'homed', err: false }]);
      } else if (data.cmd === 'Archiving') {
        setStatus('Archiving');
        setLog(prev => [...prev, { msg: 'Archiving', err: false }]);
        setTotal(data.tt ?? -100);
      }

      if (data.cmd === 'calibrating') {
        setStatus('Calibrating');
        setLoader(true);
        setLog(prev => [...prev, { msg: 'calibrating', err: false }]);
      } else if (data.cmd === 'calibrated') {
        setStatus('Calibrated');
        setLoader(false);
        disableButton(false);
        setLog(prev => [...prev, { msg: 'calibrated', err: false }]);
      }
    });

    socket.on('data', (data: TableData) => {
      appendRowData(prev => [...prev, data]);
      incPicked(prev => {
        const newPicked = prev + 1;
        setProgress((newPicked * 100) / -total);
        return newPicked;
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('rstatus');
      socket.off('data');
      socket.disconnect();
    };
  }, []);

  return (
    <div className='w-full h-full flex flex-col m-0 bg-white dark:bg-gray-900 text-black dark:text-white'>
      <Nav
        progress={progress}
        command1={archive}
        command2={calibrate}
        buttondis={disable}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Body status={status} loader={loader} logs={log} rowdata={rowdata} />
    </div>
  );
}
