import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js';
import Particles from './components/Particles/Particles';
import { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register';



 


// these are the 2 imports for the packages that need to be run 
// IF we are running react 18 and up which we are 

// import Tilt from 'react-parallax-tilt';

// configurations or things that need to be delcared before aything

// {const app = new Clarifai.App({
// apiKey: '3b5e08e186c84e24925041f53bf36cb9'
// })}

const initialState = {
      input:'',
      inputUrl: '',
      box:{},
      route:'signIn',
      isSignedIn:false,
      user : {
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
      }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState
    }
  
  
  loadUser = (data)=>{
    this.setState({user: {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceAroundBox = (box)=>{
    this.setState({box: box})
  }

  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({
      inputUrl: this.state.input
    })
    fetch('https://evening-ridge-19704.herokuapp.com/imageurl', {
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input:this.state.input
      })
    })
    .then(response => response.json())
    .then(data => {
      
      if(data){
        fetch('https://evening-ridge-19704.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log)
      }
      
      this.displayFaceAroundBox(this.calculateFaceLocation(data))
    })
    .catch(err => console.log(err));
 
  }

onRouteChange = (rout)=>{
  if(rout === 'signOut'){
    this.setState(initialState)
  }else if(rout === 'home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:rout})
}




  render(){

    //using this.state a lot below - going to clean up using destructing the state object

    const { isSignedIn, inputUrl, route, box} = this.state

    return (
      <div className="App">
      {/* particles turned off because it was lagging turn back on for final build */}
      <Particles className='particle'></Particles>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {  route === 'home'
        ? <div> 
              <Logo />
              <Rank name={this.state.user.name} entries= {this.state.user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              />
            <FaceRecognition box={box} inputUrl={inputUrl} />
          </div>
        : (
          route === 'signIn'
          ? <SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange} /> 
          : <Register loadUser = {this.loadUser    } onRouteChange={this.onRouteChange} /> 
          )
        
        
    }
    </div>
    );
  }
}
// {function App() {
//   return (
//     <div className="App">
//       {/* particles turned off because it was lagging turn back on for final build */}
//       <Particles className='particle'></Particles>
//         <Navigation />
//         <Logo />
//         <Rank />
//         <ImageLinkForm />
      
      
//       {/*
//   <FaceRecognition />*/}
//     </div>
//   );
// }}

export default App;
