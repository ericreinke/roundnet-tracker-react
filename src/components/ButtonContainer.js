import React, {Component} from 'react';
import './ButtonContainer.css';


class ButtonContainer extends Component {
	state ={
		score1: 0,
		score2: 0,
		teamName1: "team 1",
		teamName2: "team 2",
		currRally: "",
		allRallies:[]

	};

	constructor(){
		super();
		this.playerOnClick=this.playerOnClick.bind(this);
		this.aceOnClick = this.aceOnClick.bind(this);
		this.putAwayOnClick = this.putAwayOnClick.bind(this);
		this.errorOnClick = this.errorOnClick.bind(this);
		this.losePointOnClick = this.losePointOnClick.bind(this);
		this.getServingTeam = this.getServingTeam.bind(this);
		this.getLastTouchTeam = this.getLastTouchTeam.bind(this);

	}
	componentDidUpdate(){
		console.log(this.state);
	}

	playerOnClick(player){
		//cant concat if currRally is undefined so need to check
		if(this.state.currRally===undefined){
			this.setState({
				currRally: player
			});
		}
		else{
			this.setState({
				currRally: this.state.currRally + player
			});
		}
	}

	aceOnClick(){
		if(this.state.currRally===""){
			console.log("user error: currRally empty");
			return;
		}
		if(this.getServingTeam() == 1){
			this.setState({
				allRallies: this.state.allRallies.concat(this.state.currRally + "a"),
				currRally: "",
				score1: this.state.score1 + 1
			});
		}
		else{ // server is 3 or 4
			this.setState({
				allRallies: this.state.allRallies.concat(this.state.currRally + "a"),
				currRally: "",
				score2: this.state.score2 + 1
			});
		}
	}

	putAwayOnClick(){ //should this button be "put away?	"
		if(this.state.currRally===""){
			console.log("user error: currRally empty");
			return;
		}
		if(this.getLastTouchTeam() == 1){
			this.setState({
				allRallies: this.state.allRallies.concat(this.state.currRally + "p"),
				currRally: "",
				score1: this.state.score1 + 1
			});
		}
		else{
			this.setState({
				allRallies: this.state.allRallies.concat(this.state.currRally + "p"),
				currRally: "",
				score2: this.state.score2 + 1
			});
		}
		
	}
	errorOnClick(){
		if(this.state.currRally===""){
			console.log("user error: currRally empty");
			return;
		}
		if(this.getLastTouchTeam() == 2){
			this.setState({
				allRallies: this.state.allRallies.concat(this.state.currRally + "p"),
				currRally: "",
				score1: this.state.score1 + 1
			});
		}
		else{
			this.setState({
				allRallies: this.state.allRallies.concat(this.state.currRally + "p"),
				currRally: "",
				score2: this.state.score2 + 1
			});
		}
	}

	losePointOnClick(){
		if(this.state.currRally===""){
			console.log("user error: currRally empty");
			return;
		}
		if(this.getLastTouchTeam() == 2){
			this.setState({
				allRallies: this.state.allRallies.concat(this.state.currRally + "p"),
				currRally: "",
				score1: this.state.score1 + 1
			});
		}
		else{
			this.setState({
				allRallies: this.state.allRallies.concat(this.state.currRally + "p"),
				currRally: "",
				score2: this.state.score2 + 1
			});
		}
	}

	getServingTeam(){
		var server = this.state.currRally.charAt(0);
		if(server == '1' || server == '2'){
			return 1;
		}
		return 2;
	}

	getLastTouchTeam(){
		var last = this.state.currRally.charAt(this.state.currRally.length -1);
		if(last == '1' || last == '2'){
			return 1;
		}
		return 2;
	}

	render(){
		return(
		<div>
			<div className="center">
				<button className="center-padding" onClick={this.aceOnClick}>Ace</button>
				<button className="center-padding" onClick={this.putAwayOnClick}>Put Away</button>
			</div>
			<div className="center">
				<button className="center-padding" onClick={this.errorOnClick}>Error</button>
				<button className="center-padding" onClick={this.losePointOnClick}>Lose Point</button>
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
				<button className="player-button center-padding" onClick={()=>this.playerOnClick("1")}>Player 1</button>
				<button className="player-button center-padding" onClick={()=>this.playerOnClick("3")}>Player 3</button>
			</div>
			<div className="center">
				<button className="player-button center-padding" onClick={()=>this.playerOnClick("2")}>Player 2</button>
				<button className="player-button center-padding" onClick={()=>this.playerOnClick("4")}>Player 4</button>
			</div>
			<span className="center">rally: {this.state.currRally}</span>
		</div>
		);
	}
	
}

export default ButtonContainer