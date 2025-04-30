import { Logtype, Messageprops } from "./types";

export default function Messages({logs}:Messageprops)
{
    const finallogs=logs.map((e:Logtype) => {
        return <p className={`text-${e.err?'red-900':'black'}`}>{`>> ${e.msg}`}</p>
    });

    return (
        <div className="basis-11/12 ml-2 overflow-scroll">
            <div className="pt-2">
            {finallogs}
            </div>
            
        </div>
    )
}