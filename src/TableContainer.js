import React from "react";
import {Table, Button, Row, Col, Form} from 'react-bootstrap';
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { Filter, DefaultColumnFilter } from './filters';

const TableContainer = ({ columns, data }) => {
    const generateSortingIndicator = column => {
        return column.isSorted ? (column.isSortedDesc ? "⬇️" : "⬆️") : ""
    };
    const onChangeInSelect = event => {
        setPageSize(Number(event.target.value))
      }
      
      const onChangeInInput = event => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
      }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // For pagination  we change 'rows' to 'page'
        page,//rows,
        prepareRow,
        // below new props related to 'usePagination' hook
        visibleColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: 10 }
        },
        useFilters,
        useSortBy,
        usePagination
    )

  return (
    // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
    // Feel free to use console.log()  This will help you better understand how react table works underhood.
   <React.Fragment>
   <Table striped bordered hover {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
             //<th {...column.getHeaderProps(column.getSortByToggleProps())}>
             //{column.render("Header")}
             //generateSortingIndicator(column)}
             //</th>
             //Add this code if you want to add filters
             //start
             <th {...column.getHeaderProps()}>
             <div {...column.getSortByToggleProps()}>
               {column.render("Header")}
               {generateSortingIndicator(column)}
             </div>
             <Filter column={column} />
           </th>
             //end     
            ))}
          </tr>
        ))}
      </thead>

      {//When we use pagination, we changen row into page
      /*<tbody {...getTableBodyProps()}>
        {rows.map(row => {
        prepareRow(row)*/}
        <tbody {...getTableBodyProps()}>
        {page.map(row => {
            prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
    <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
    <Col md={3}>
      <Button
        color="primary"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </Button>
      <Button
        color="primary"
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        {"<"}
      </Button>
    </Col>
    <Col md={2} style={{ marginTop: 7 }}>
      Page{" "}
      <strong>
        {pageIndex + 1} of {pageOptions.length}
      </strong>
    </Col>
    <Col md={2}>
      <input
        type="number"
        min={1}
        style={{ width: 70 }}
        max={pageOptions.length}
        defaultValue={pageIndex + 1}
        onChange={onChangeInInput}
      />
    </Col>
    <Col md={2}>
      <Form.Control as="select" value={pageSize} onChange={onChangeInSelect} custom>
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Form.Control>
    </Col>
    <Col md={3}>
      <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
        {">"}
      </Button>
      <Button
        color="primary"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {">>"}
      </Button>
    </Col>
  </Row>
    </React.Fragment>
  )
}

export default TableContainer;