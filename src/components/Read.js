import React from "react";
import DataDisplay from "./dataDisplay";
function Read({scores}) {

    return (
        <div fluid className="p-0">
                {scores.length > 0 ? (
                    scores.map((item, index) => (
                        <DataDisplay OrderNum={index+1} Name={item.Name} Score={item.Score}/>
                    ))
                ) : (
                    <p>No scores available</p>
                )}
        </div>
    );
}

export default Read;