import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community'; 
import { RowClassParams } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import './Table.css'
import { TableProps } from "./types";
export default function Table({rowdata}:TableProps)
{
    const pagination = true ;
    const paginationPageSize = 50;
    const paginationPageSizeSelector = [20, 50, 100];
    const colDefs:ColDef[] = [
        { field: "tt_id" },
        { field: "pick" },
        { field: "place" },
        { field:'source'},
        { field:'dest'}
    ]
    const rowClassRules = {
        'blue1': (_params:RowClassParams)=> true,
    }
    const myTheme = themeQuartz.withParams({
        /* Low spacing = very compact */
        spacing: 2,
        /* Changes the color of the grid text */
        foregroundColor: 'rgb(0, 0, 0)',
        /* Changes the color of the grid background */
        backgroundColor: '#caf0f8',
        /* Changes the header color of the top row */
        headerBackgroundColor: '#90e0ef',
        /* Changes the hover color of the row*/
        rowHoverColor: '#caf0f8',
    });
    ModuleRegistry.registerModules([AllCommunityModule]);
    return (
        <AgGridReact
        rowData={rowdata}
        columnDefs={colDefs}  
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}     
        rowClassRules={rowClassRules}
        theme={myTheme}
        />
    )
}