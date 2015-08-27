import Fetch from "isomorphic-fetch"
import React from "react";
import Component1 from "./component1";

let a = async function() {
    let response = await Fetch("https://api.github.com/users/timcash/repos")
    let json     = await response.json()
    console.log(json);
}

console.log("asyncing")
a();

React.render(
  <Component1 name="World"/>,
  document.body
);
