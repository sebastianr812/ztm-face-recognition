import React, { Component } from 'react'
import ParticlesBg from 'particles-bg'
import './Particles.css'

class Particles extends Component {
    
    
    render () {
        return (
          <div>

          
            
            <ParticlesBg num={30} color ="#FFFFFF" type="tadpole" className='particles-bg-canvas-self' />
            
            </div>
        )
      }
  }

export default Particles;