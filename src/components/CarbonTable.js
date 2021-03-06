import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";

const columns = [
  { id: "date", label: "Date", minWidth: 50 },
  { id: "item", label: "Item", minWidth: 50 },
  { id: "carbonValue", label: "CO2 (kg)", minWidth: 80 },
  {
    id: "dollarValue",
    label: "CO2 ($)",
    minWidth: 45,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 200,
    minHeight: 200,
  },
});

export default function CarbonTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const transactions = useSelector((state) => state.transactions);
  console.log(transactions);
  console.log(typeof transactions)
  return (
    <div className="table-container">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      padding: 10,
                      paddingTop: 0,
                      paddingBottom: 0,
                      fontFamily: "Bebas Neue",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = transaction[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ fontFamily: "Bebas Neue", fontSize: 15 }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
