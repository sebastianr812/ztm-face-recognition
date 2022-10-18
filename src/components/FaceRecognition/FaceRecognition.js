import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({inputUrl, box})=>{
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" alt =''src={inputUrl} width='500px' height='auto' />
                <div className="boudningBox" style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left: box.leftCol}}></div>
            </div>
            
        </div>
    );
    
}

export default FaceRecognition;