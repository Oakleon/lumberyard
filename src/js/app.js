import Fetch from "isomorphic-fetch"
import React, { Component } from "react";
import Component1 from "./component1";
import Yard from "./lumberyard";

require("../css/fixed-data-table.css");

let getRepos = async function(name) {
    let response = await Fetch(`https://api.github.com/users/${name}/repos`)
    let json = await response.json()
    return json;
}

let rows = [];

let getRows = async function(name, rows, rowGetter, update) {
    let repos = await getRepos(name);
    repos.map((r)=>{
        rows.push([r.id, r.language])
    })
    update(rows, rowGetter);
    console.log(rows);
}

let rowReader = function() {

}



var FixedDataTable = require('fixed-data-table');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

let appupdate = () => {};

let rowGetter = function rowGetter(rowIndex) {
  return rows[rowIndex];
}

export let App = React.createClass({

    getInitialState: function() {
        return {rows:rows, rowGetter:rowGetter}
    },

    componentWillMount: function() {
        let self = this;
        let update = function (rows, rowGetter) {
            console.log("updating")
            self.setState({rows:rows, rowGetter:rowGetter})
        };

        appupdate = update;
    },

    render: function() {
        return (
        <div>

            <Table
            rowHeight={50}
            rowGetter={this.state.rowGetter}
            rowsCount={this.state.rows.length}
            width={300}
            height={500}
            headerHeight={50}>
            <Column
            label="Col 1"
            width={150}
            dataKey={0}
            />
            <Column
            label="Col 2"
            width={150}
            dataKey={1}
            />
            </Table>
        </div>
        );
    }
})

setTimeout(()=>{
    getRows("timcash", rows, rowGetter, appupdate);
}, 50);
