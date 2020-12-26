import React, {Component} from 'react';
import './ButtonContainer.css';


class ButtonContainer extends Component {
	state ={
		score1: 0,
		score2: 0,
		teamName1: "team 1",
		teamName2: "team 2",
		rallyString: "rally: "
	};

	constructor(){
		super();
		this.playerTouch=this.playerTouch.bind(this);
	}

	playerTouch(player){
		this.setState({
			rallyString: this.state.rallyString + player
		});
	}

	render(){
		return(
		<div>
			<div className="center">
				<button className="center-padding">Ace</button>
				<button className="center-padding">Win Point</button>
			</div>
			<div className="center">
				<button className="center-padding">Error</button>
				<button className="center-padding">Lose Point</button>
			</div>
			<div className="center">
				<span className="center-padding">{this.state.teamName1}</span>
				<span className="center-padding">{this.state.teamName2}</span>
			</div>
			<div className="center">
				<span className="center-padding">{this.state.score1}</span>
				<span className="center-padding">{this.state.score2}</span>
			</div>
			<div className="center">
				<button className="player-button center-padding" onClick={()=>this.playerTouch("1")}>Player 1</button>
				<button className="player-button center-padding" onClick={()=>this.playerTouch("3")}>Player 3</button>
			</div>
			<div className="center">
				<button className="player-button center-padding" onClick={()=>this.playerTouch("2")}>Player 2</button>
				<button className="player-button center-padding" onClick={()=>this.playerTouch("4")}>Player 4</button>
			</div>
			<span className="center">{this.state.rallyString}</span>
		</div>
		);
	}
	
}

export default ButtonContainer