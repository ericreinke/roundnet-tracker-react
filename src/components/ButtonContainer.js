import React, {Component} from 'react';
import './ButtonContainer.css';


class ButtonContainer extends Component {
	state ={
		active: false,
		score1: 0,
		score2: 0,
		teamName1: "team 1",
		teamName2: "team 2",
		currRally: "s",
		allRallies:[],
		serving: false // this is true if the last touch is the service
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
		this.erasePrevious = this.erasePrevious.bind(this);
		this.endGame = this.endGame.bind(this);
		this.serviceFault = this.serviceFault.bind(this);

	}

	componentDidUpdate(){
		console.log(this.state);
	}

	componentDidMount(){
		//console.log(this.state.currRally.lastIndexOf('f'));
	}

	playerOnClick(player){
		//cant concat if currRally is undefined so need to check
		//This should never happen now that rallies start with 's'
		if(this.state.currRally===undefined){
			this.setState({
				currRally: player
			});
			console.log("this shouldn't have happened since we start rallies with 's'")
		}
		// If the rally is an ace then this "player touch" isn't meant to be a touch:
		// It is meant to be an indicator of who got aced.  The rally ends here.
		else if(this.state.currRally.charAt(this.state.currRally.length-1) === 'a'){
			console.log(this.state.currRally);
			let score1plus = 0, score2plus = 0;
			if(this.getServingTeam() === 1){
				score1plus = 1;
			}
			else{
				score2plus = 1;
			}
			this.setState({
				serving: false,
				allRallies: this.state.allRallies.concat(this.state.currRally + player),
				currRally: "s",
				score1: this.state.score1 + score1plus,
				score2: this.state.score2 + score2plus
			});
		}
		else{
			let newServing = true;
			//console.log(this.state.currRally.length - this.state.currRally.lastIndexOf('s'));
			if(this.state.currRally.length - this.state.currRally.lastIndexOf('s') >=2){
				newServing = false;
			}
			this.setState({
				serving: newServing,
				currRally: this.state.currRally + player
			});
		}

	}

	aceOnClick(){
		if(this.state.currRally===""){
			console.log("user error: currRally empty");
			return;
		}
		// if(this.state.currRally.length > 2){
		// 	console.log("too many touches already occurred. are you looking for 'Lose Point'?");
		// 	return;
		// }
		this.setState({
			serving: false,
			currRally: this.state.currRally + "a"
		});
	}

	putAwayOnClick(){ //should this button be "put away?	"
		if(this.state.currRally===""){
			console.log("user error: currRally empty");
			return;
		}
		let score1plus = 0, score2plus = 0;
		if(this.getLastTouchTeam() === 1){
			score1plus = 1;
		}
		else{
			score2plus = 1;
		}
		this.setState({
			serving: false,
			allRallies: this.state.allRallies.concat(this.state.currRally + "p"),
			currRally: "s",
			score1: this.state.score1 + score1plus,
			score2: this.state.score2 + score2plus
		});
		
	}
	errorOnClick(){
		if(this.state.currRally===""){
			console.log("user error: currRally empty");
			return;
		}
		let score1plus = 0, score2plus = 0;
		if(this.getLastTouchTeam() === 1){
			score2plus = 1;
		}
		else{
			score1plus = 1;
		}
		this.setState({
			serving: false,
			allRallies: this.state.allRallies.concat(this.state.currRally + "e"),
			currRally: "s",
			score1: this.state.score1 + score1plus,
			score2: this.state.score2 + score2plus
		});
	}

	losePointOnClick(){
		if(this.state.currRally===""){
			console.log("user error: currRally empty");
			return;
		}
		let score1plus = 0, score2plus = 0;
		if(this.getLastTouchTeam() === 1){
			score2plus = 1;
		}
		else {
			score1plus = 1;
		}
		this.setState({
			serving: false,
			allRallies: this.state.allRallies.concat(this.state.currRally + "n"),
			currRally: "s",
			score1: this.state.score1 + score1plus,
			score2: this.state.score2 + score2plus
		});
	
	}

	serviceFault(){
		if(this.state.currRally.lastIndexOf('f') < 0){
			this.setState({
				currRally: this.state.currRally + 'fs',
				serving: false,
			});
		}
		else{
			let score1plus, score2plus
			if(this.getLastTouchTeam() === 1){
				score1plus = 0;
				score2plus = 1;
			}
			else{
				score1plus = 1;
				score2plus = 0;
			}
			this.setState({
				serving: false,
				allRallies: this.state.allRallies.concat(this.state.currRally+"f"),
				currRally: "s",
				score1: this.state.score1 + score1plus,
				score2: this.state.score2 + score2plus
			});
			
		}
	}

	erasePrevious(){
		var tmp = this.state.allRallies;
		tmp.pop();
		this.setState({
			allRallies: tmp
		});
	}
	endGame(){
		this.props.setRallies(this.state.allRallies);
		this.props.setDisplay("results");
	}

	getServingTeam(){
		var server = this.state.currRally.charAt(1);
		if(server === '1' || server === '2'){
			return 1;
		}
		return 2;
	}

	getLastTouchTeam(){
		var last = this.state.currRally.charAt(this.state.currRally.length -1);
		if(last === '1' || last === '2'){
			return 1;
		}
		return 2;
	}

	render(){
		return(
		<div>
			<div className="center">
				<button className="center-padding" disabled={!this.state.serving} onClick={this.serviceFault}>Fault</button>
				<button className="center-padding" onClick={this.aceOnClick}>Ace</button>
				<button className="center-padding" onClick={this.putAwayOnClick}>Put Away</button>
				<button className="center-padding" >undoLast</button>

			</div>
			<div className="center">
				<button className="center-padding" onClick={this.errorOnClick}>Error</button>
				<button className="center-padding" onClick={this.losePointOnClick}>Lose Point</button>
			</div>
			<div className="center">
				<span className="center-padding">{this.props.teamNames[0]}</span>
				<span className="center-padding">{this.props.teamNames[1]}</span>
			</div>
			<div className="center">
				<span className="center-padding">{this.state.score1}</span>
				<span className="center-padding">{this.state.score2}</span>
			</div>
			<div className="center">
				<button className="player-button center-padding" onClick={()=>this.playerOnClick("1")}>{this.props.playerNames[0]}</button>
				<button className="player-button center-padding" onClick={()=>this.playerOnClick("3")}>{this.props.playerNames[2]}</button>
			</div>
			<div className="center">
				<button className="player-button center-padding" onClick={()=>this.playerOnClick("2")}>{this.props.playerNames[1]}</button>
				<button className="player-button center-padding" onClick={()=>this.playerOnClick("4")}>{this.props.playerNames[3]}</button>
			</div>
			<span className="center">rally: {this.state.currRally}</span>
			<div className="center">
				<button className="center-padding" onClick={this.erasePrevious}>Erase Previous</button>
				<button className="center-padding" onClick={this.endGame}>End Game</button>
			</div>
		</div>
		);
	}
	
}

export default ButtonContainer