import Status from './Status'
import Messages  from './Messages'
import { Logprops } from './types'
export default function Logs({status,loader,logs}:Logprops)
{
    return (
        <div className="h-full w-full flex flex-col">
        <Status sm = {status} loader={loader}></Status>
        <Messages logs={logs}></Messages>
        </div>
    )
}