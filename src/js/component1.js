import React from "react";

export default React.createClass({
    render: function() {
        return ( <div className = "listitem">
            {this.props.oakid} : {JSON.stringify(this.props.message)}
            </div>
        );
    },
});
