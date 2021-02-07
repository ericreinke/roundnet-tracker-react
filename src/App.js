import React from 'react'
import './App.css';
import Setup from './components/Setup';
import ButtonContainer from './components/ButtonContainer';
import Results from './components/Results';

class App extends React.Component {

  constructor(){
    super();
    this.setDisplay=this.setDisplay.bind(this);
    this.setRallies=this.setRallies.bind(this);
    this.setNames=this.setNames.bind(this);
  }
  
  state = {
    display: "setup",
    rallies: [],
    teamNames: [],
    playerNames: []
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

  setNames(teams, players){
    this.setState({
      teamNames: teams,
      playerNames: players
    });
  }

  render(){
    if(this.state.display==="setup"){
      return (<Setup setDisplay={this.setDisplay} setNames={this.setNames}/>);
    }

    else if(this.state.display==="record"){
      return(<ButtonContainer setDisplay={this.setDisplay} setRallies={this.setRallies} teamNames={this.state.teamNames} playerNames={this.state.playerNames}/>);
    }
    else if(this.state.display==="results"){
      return(<Results rallies={this.state.rallies} teamNames={this.state.teamNames} playerNames={this.state.playerNames}/>);
    }
  }
}



export default App;
