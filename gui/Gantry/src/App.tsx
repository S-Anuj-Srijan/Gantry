import './App.css';
import Nav from './Nav.tsx';
import Body from './Body.tsx';
import socket from './socket.ts';
import { useState, useEffect } from 'react';
import { Logtype,TableData } from './types.ts';

export default function App() {
  const [status, setStatus] = useState('Connecting to Server');
  const [loader, setLoader] = useState(true);
  const [log, setLog] = useState<Logtype[]>([]);
  const [progress,setProgress]=useState(0);
  const [disable,disableButton]= useState(false);
  const [rowdata,appendRowData] = useState<TableData[]>([])
  const [total,setTotal] = useState(-100)
  const [picked,incPicked]= useState(0)
  const archive = ()=>{
    if(!disable)
    {
      socket.emit('robotCmd', { cmd: 'home' });
    disableButton(true)
    }
    
  }
  useEffect(() => {
    socket.connect();

    // Update connection status on connect/disconnect
    socket.on('connect', () => {
      setStatus('Connected to Server');
      setLoader(false);
      setLog((prevLogs) => [...prevLogs, { msg: 'Connected', err: false }]);
    });

    socket.on('disconnect', () => {
      setStatus('Connecting to Server');
      setLoader(true);
      setLog((prevLogs) => [...prevLogs, { msg: 'Disconnected', err: true }]);
    });

    // Listen for custom messages from the server
    socket.on('message', (data) => {
      console.log('Message from server:', data);
      // Uncomment this line if you want to log messages from the server
      // setLog((prevLogs) => [...prevLogs, { msg: data, err: false }]);
    });
    socket.on('rstatus',(data)=>{
      console.log(data)
      if(data.cmd==='homing')
      {
      setStatus('Homing')
      setLoader(true)
      setLog((prevlogs)=>[...prevlogs,{msg:'homing',err:false}])
      }
      if(data.cmd==='Archiving')
      {
        setStatus('Archiving')
        setLog((prevlogs)=>[...prevlogs,{msg:'homed',err:false},{msg:'Archiving',err:false}])
        setTotal(data.tt)
      }
      
    })
    socket.on('data',(data:TableData)=>{
      appendRowData((prev)=>[...prev,data])
      incPicked((prev) => {
        const newPicked = prev + 1;
        setProgress((newPicked * 100) / total*-1);
        return newPicked;
      });
      console.log((picked * 100) / total*-1);
    })
    // Cleanup on component unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('rstatus');
      socket.off('data')
      socket.disconnect();
    };
  },[]); // Only run this effect once on mount

  // Handle command emission only when connected
  return (
    <div className='w-full h-full flex flex-col m-0'>
      <Nav progress={progress} command={archive} buttondis={disable}/>
      <Body status={status} loader={loader} logs={log} rowdata={rowdata} />
    </div>
  );
}
