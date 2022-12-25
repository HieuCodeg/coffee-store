import React from "react";
import loading from "../../assets/images/loading.gif";

function Loading() {
    return (
        <div className="container">
            <img className="loading mx-auto d-block" src={loading} alt="Loading..." />
        </div>
    )
}
export default Loading;