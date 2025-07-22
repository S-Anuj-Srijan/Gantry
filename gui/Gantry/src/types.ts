export interface NavProps {
  progress: number;
  command: () => void;
  buttondis: boolean;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}
interface Cellprops
{
    basis : number
    id : Array<number>
    value?: number
}
interface Bodyprops
{
    status: string
    loader : boolean
    logs : Logtype[]
    rowdata : TableData[]
}
interface Logprops
{
    status:string
    loader:boolean
    logs : Logtype[]
}
interface Statprops
{
    sm : string
    loader : boolean
}
interface Logtype
{
    err : boolean
    msg : string
}
interface Messageprops
{
    logs:Logtype[]
}
interface TableData
{
    tt_id : string
    pick : string
    place : string
    source : string
    dest : string
}
interface TableProps
{
    rowdata : TableData[]
}
export type {Navprops,Cellprops,Bodyprops,Logprops,Statprops,Logtype,Messageprops,TableData,TableProps}
