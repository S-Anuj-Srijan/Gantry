import { Cellprops } from "./types";
export default function Cell({basis,id,value}:Cellprops)
{
    return (
        <div key={`${id[0]} ${id[1]}`} className={`basis-[${basis}%] bg-[${id[0]%2===0?'#90e0ef':'48cae4'}]`}>
            {value}
        </div>
    )
}