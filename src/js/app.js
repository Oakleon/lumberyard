import Fetch from "isomorphic-fetch"
import React, { Component } from "react";
import Component1 from "./component1";
import * as Yard from "./lumberyard";
import _Lo from "lodash";

var FixedDataTable = require('fixed-data-table');
require("../css/fixed-data-table.css");


// =============================================================
//
//                        GLOBALS
//
// =============================================================

let appupdate = () => {};

// =============================================================
//
//                        GITHUB API
//
// =============================================================

let getRepos = async function(name) {
    let response = await Fetch(`https://api.github.com/users/${name}/repos`)
    let json = await response.json()
    return json;
}

let getRows = async function(name, yard) {
    let repos = await getRepos(name);
    repos.map((r)=>{
        Yard.push(0, ["github"], r, yard);
    })
    //update(rows, rowGetter);
    console.log(rows);
}

// =============================================================
//
//                        REACT
//
// =============================================================


let rows = [];

let rowGetter = function rowGetter(rowIndex) {
  return rows[rowIndex];
}

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

export let App = React.createClass({

    getInitialState: function() {
        return {rows:rows, rowGetter:rowGetter}
    },

    componentWillMount: function() {
        let self = this;
        let update = function (rows, rowGetter) {
            console.log("updating")
            console.log(rows);
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

// =============================================================
//
//                        LUMBERYARD
//
// =============================================================


let y1 = Yard.makeLog("gitevents");
let r1 = Yard.makeReader();

setInterval(()=>{
    let logs     = Yard.read(r1, 1, y1);
    //console.log(logs);
    let messages = _Lo.pluck(logs, "message");

    if(messages.length <= 0) return;

    //console.log(messages);

    let new_rows = _Lo.map(messages, (m) => {
        return [m.id, m.language]
    })

    rows = rows.concat(new_rows);

    appupdate(rows, rowGetter);

}, 200);

getRows("timcash", y1);
