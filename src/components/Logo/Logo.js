import React from "react";
import Tilt from 'react-parallax-tilt';
import './logo.css'; 
import brain from './brain-logo.png'; 


const Logo = () => {
    return (
       <div className=" ma4 mt0">
           <Tilt style={{height:'150px',width:'150px'}} className="parallax-effect br4 shadow-2" perspective={550}>
                <div className="inner-element pa3">
                    <div><img style={{paddingTop:'5px'}} src={brain} alt='logo' /></div>
                </div>
            </Tilt>
       </div>
        
    );
    
}


export default Logo;