import React from 'react'
import './App.css';
import ButtonContainer from './components/ButtonContainer';
import Results from './components/Results';

class App extends React.Component {

  constructor(){
    super();
    this.setDisplay=this.setDisplay.bind(this);
    this.setRallies=this.setRallies.bind(this);
  }
  
  state = {
    display: "record",
    rallies: []
  }

  setDisplay(display){
    this.setState({
      display: display
    });
  }

  setRallies(rallies){
    this.setState({
      rallies: rallies
    });
  }

  render(){
    if(this.state.display==="record"){
      return(<ButtonContainer setDisplay={this.setDisplay} setRallies={this.setRallies}/>);
    }
    else if(this.state.display==="results"){
      return(<Results rallies={this.state.rallies}/>);
    }
  }
}



export default App;
