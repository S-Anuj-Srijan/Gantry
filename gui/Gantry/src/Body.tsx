
import Logs  from "./Logs"
import Table from "./Table"
import { Bodyprops } from "./types"
export default function Body({status,loader,logs,rowdata}:Bodyprops)
{
    return(
        <div className="basis-[96%] bg-[#caf0f8] flex flex-row">
            <div className="basis-1/3">
                <Logs status={status} loader={loader} logs={logs}></Logs>
            </div>
            <div className="basis-2/3">
                <Table rowdata={rowdata}></Table>
            </div>
        </div>
    )
    
}