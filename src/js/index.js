import Fetch from "isomorphic-fetch"
import React from "react";
import Component1 from "./component1";

// let a = async function() {
//     let response = await Fetch("https://api.github.com/users/timcash/repos")
//     let json = await response.json()
//     console.log(json);
// }
//
//
// let RepoList = React.createClass({
//     render: function() {
//
//         let repo_nodes =
//         return ( <div className="repolist">
//             <h1>Repo List</h1>
//             <Component1 oakid={"abc"} message={{foo:1, bar:2}} />
//             </div>
//         );
//     },
// });
//
// React.render(<RepoList />, document.body);


var FixedDataTable = require('fixed-data-table');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

// Table data as a list of array.
var rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];

function rowGetter(rowIndex) {
  return rows[rowIndex];
}

React.render(
  <Table
    rowHeight={50}
    rowGetter={rowGetter}
    rowsCount={rows.length}
    width={5000}
    height={5000}
    headerHeight={50}>
    <Column
      label="Col 1"
      width={3000}
      dataKey={0}
    />
    <Column
      label="Col 2"
      width={2000}
      dataKey={1}
    />
  </Table>,
  document.body
);
