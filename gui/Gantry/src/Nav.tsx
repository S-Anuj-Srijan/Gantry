import {Navprops} from './types.ts'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function Nav({command,progress,buttondis}:Navprops)
{
    return (
        <div className='basis-[4%] flex flex-row bg-[#90e0ef]'>
            <div className='basis-1/2 flex flex-row'>
                <h1 className='ml-1 mt-2 text-[#03045e]'>Gantry</h1>
            </div>
            <div className='basis-1/2 flex flex-row-reverse'>
                <button onClick={command} className='w-1/10 h-1/10 m-3 bg-[#48cae4]' disabled={buttondis}>Archive</button>
                <div className='w-1/12 h-1/12 m-3'>
                    <CircularProgressbar value={progress} text={`${progress}%`} styles={buildStyles({pathColor:'#00b4d8'})}></CircularProgressbar>
                </div>
                
            </div>
        </div>
    )
}