import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from './filters';
import './App.css';
//Tutorial and code from https://thewidlarzgroup.com/react-table-7/
const App = () => {
    const [data, setData] = useState([])
    useEffect(() => {
      const doFetch = async () => {
        const response = await fetch("https://randomuser.me/api/?results=100")
        const body = await response.json()
        const contacts = body.results
        console.log(contacts)
        setData(contacts)
      }
      doFetch()
    }, [])
  
    const columns = useMemo(
        () => [
          {
            Header: "Title",
            accessor: "name.title",
            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',
          },
          {
            Header: "First Name",
            accessor: "name.first",
          },
          {
            Header: "Last Name",
            accessor: "name.last",
          },
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "City",
            accessor: "location.city",
          }
          /* Costume columns for each
        {
            Header: 'Hemisphere',
            accessor: (values) => {
              const { latitude, longitude } = values.location.coordinates;
              const first = Number(latitude) > 0 ? 'N' : 'S';
              const second = Number(longitude) > 0 ? 'E' : 'W';
              return first + '/' + second;
            },
            Cell: ({ cell }) => {
              const { value } = cell;
    
              const pickEmoji = (value) => {
                let first = value[0]; // N or S
                let second = value[2]; // E or W
                const options = ['⇖', '⇗', '⇙', '⇘'];
                let num = first === 'N' ? 0 : 2;
                num = second === 'E' ? num + 1 : num;
                return options[num];
              };
    
              return (
                <div style={{ textAlign: 'center', fontSize: 18 }}>
                  {pickEmoji(value)}
                </div>
              );
            },
          },*/
        ],
        []
      )

    return (
        <div className="container" style={{marginTop:"100px"}}>
            <TableContainer columns={columns} data={data} />
        </div>
    
    )
  }

export default App;
