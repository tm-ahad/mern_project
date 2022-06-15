import React from "react";

const Card = ({name, image, text}) => {
   return <>
      <div className="card">
         <div className="card-title">
            {`${image} ${text}`}
         </div>
         <div className="card-body">
            {text}
         </div>
      </div>
   </>
}

export default Card