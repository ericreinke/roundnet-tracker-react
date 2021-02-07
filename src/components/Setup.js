import React, {Component} from 'react';
import './Setup.css';

class Setup extends Component{

	constructor(){
		super();
		this.submitNames = this.submitNames.bind(this);
	}

	submitNames(){
		let teamNames = ["",""];
		let playerNames = ["","","",""];
		let curr="";
		curr = document.getElementById("t1name").value;
		teamNames[0] = curr === "" ? "Team 1" : curr;
		curr = document.getElementById("t2name").value;
		teamNames[1] = curr === "" ? "Team 2" : curr;
		curr = document.getElementById("p1name").value;
		playerNames[0] = curr === "" ? "Player 1" : curr;
		curr = document.getElementById("p2name").value;
		playerNames[1] = curr === "" ? "Player 2" : curr;
		curr = document.getElementById("p3name").value;
		playerNames[2] = curr === "" ? "Player 3" : curr;
		curr = document.getElementById("p4name").value;
		playerNames[3] = curr === "" ? "Player 4" : curr;
		this.props.setNames(teamNames, playerNames);
		this.props.setDisplay("record");
	}

	render(){
		return(
			<div>
				<div>
					<p className="center">Enter player and team names (Leave blank for default)</p>
					<div className="center">
						<div id="team1" className="hspacing">
							<p className="center">Team 1</p>
							<input id="t1name" className="center" type="text"/>
							<div className="center">
								<div className="hspacing">
									<p className="center">Player 1</p>
									<input id="p1name" type="text"/>
								</div>
								<div className="hspacing">
									<p className="center">Player 2</p>
									<input id="p2name" type="text"/>
								</div>
							</div>
						</div>
						<div id="team2" className="hspacing">
							<p className="center">Team 2</p>
							<input id="t2name" className="center" type="text"/>
							<div className="center">
								<div className="hspacing">
									<p className="center">Player 3</p>
									<input id="p3name" type="text"/>
								</div>
								<div className="hspacing">
									<p className="center">Player 4</p>
									<input id="p4name" type="text"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="center vspacing">
					<button onClick={this.submitNames}>Start</button>
				</div>
			</div>
			)
	}

}

export default Setup;