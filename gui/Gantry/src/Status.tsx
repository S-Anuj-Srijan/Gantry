import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { Statprops } from './types'
export default function Status({sm,loader}:Statprops)
{
    
    return (
        <div className="basis-1/12 flex flex-row items-end">
             <div className='text-2xl ml-2 mt-4'>Status: {sm}</div>
             <div className='ml-2 flex justify-left items-end '>
             {loader&&<Loader visible={true} color ={'#48cae4'} size={12}/>}
             </div>
        </div>
    )
}