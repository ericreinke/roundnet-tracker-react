import React, {Component} from 'react';
import './Results.css';

class Results extends Component {

	state= {
		firstServes: [],
	    secondServes: [],
	    firstFaults: [],
	    secondFaults: [],
	    putAwaySuccess: [],
	    putAwayFails: [],
	    aces: [],
	    aced: [],
	    defensiveGets: [],
	    errors: []
	}


	constructor(){
		super();
		this.parseRallies=this.parseRallies.bind(this);
		this.getLastTouchTeam = this.getLastTouchTeam.bind(this);
		this.playerToTeam = this.playerToTeam.bind(this);
		this.playerRallyToTeamRally = this.playerRallyToTeamRally.bind(this);

	}

	parseRallies(){// assumes valid rallies
		let firstServes = [0,0,0,0];
	    let secondServes = [0,0,0,0];
	    let firstFaults = [0,0,0,0];
	    let secondFaults = [0,0,0,0];
	    let putAwaySuccess = [0,0,0,0];
	    let putAwayFails = [0,0,0,0];
	    let aces = [0,0,0,0];
	    let aced = [0,0,0,0];
	    let defensiveGets = [0,0,0,0];
	    let errors = [0,0,0,0];
		for(var r of this.props.rallies){
			//add the first serve
			firstServes[r.charCodeAt(1)-49]++;

			//add the second serve if exists
			let lastS = r.lastIndexOf('s');
			if(lastS>0){
				secondServes[r.charCodeAt(lastS+1)-49]++;
			}

			//add first faults
			if(r.charCodeAt(2) === 102){ //'f' ascii is 102
				firstFaults[r.charCodeAt(1)-49]++;
			}

			//add second faults
			if(r.charCodeAt(5) === 102){ //'f' ascii is 102
				secondFaults[r.charCodeAt(4)-49]++;
			}

			//add 'a' aces
			//add 'a' aced
			let indexA = r.indexOf('a');
			if(indexA>=0){
				aces[r.charCodeAt(indexA-1)-49]++;
				aced[r.charCodeAt(indexA+1)-49]++;
			}

			//add 'n' aces
			//add 'n' aced
			if(r.length-lastS === 4 && r.charCodeAt(r.length-1) === 110){//'n' = 110
				aces[r.charCodeAt(lastS+1)-49]++;
				aced[r.charCodeAt(lastS+2)-49]++;
			}

			//add errors
			let indexE = r.indexOf('e');
			if(indexE >=0){
				errors[r.charCodeAt(indexE-1)-49]++;
			}

			
			//put away parsing:
			let teamRally = this.playerRallyToTeamRally(r);
			if(teamRally.indexOf('a')<0){//then parse for putaways
				// Flag set to true after first possession 
				// since first possession does not count as a defensive get
				let checkForDefensiveGet = false;
				let lastPlayer = parseInt(r.charAt(lastS+2));
				let lastTeam = Math.floor((lastPlayer+1)/2);

				for(let i = lastS+3; i<r.length; i++){
					if(teamRally.charCodeAt(i) > 52) break;
					// If lastTeam touch is different, then there was a change of possession
					// Calculate who gets a putaway fail/success
					if(teamRally.charAt(i) != lastTeam){
						// If the first possession is over, we can start checking for defensive gets
						if(checkForDefensiveGet){
							console.log(i);
							defensiveGets[lastPlayer-1]++;
						}
						//is there another occurence of lastTeam?
						// if there is, lastPlayer gets a failed putaway
						let nextIndex = teamRally.substring(i).indexOf(lastTeam);
						if(nextIndex >=0){
							putAwayFails[lastPlayer-1]++;
						}
						// If there is no other occurrence then its a success
						else{
							putAwaySuccess[lastPlayer-1]++;
						}
						checkForDefensiveGet = true;
					}

					lastPlayer = parseInt(r.charAt(i));
					lastTeam = Math.floor((lastPlayer+1)/2);
				}
			}
				


			//add defensive gets

		}
		this.setState({
			firstServes: firstServes,
			secondServes: secondServes,
			firstFaults: firstFaults,
			secondFaults: secondFaults,
			putAwaySuccess: putAwaySuccess,
			putAwayFails: putAwayFails,
			aces: aces,
			aced: aced,
			defensiveGets: defensiveGets,
			errors: errors
		});
	}

	componentDidMount(){
		console.log("mounted: now parsing");
		this.parseRallies();

	}
	componentDidUpdate(){
		console.log(this.state);
	}

	getLastTouchTeam(r){
		for(let i=r.length; i>=0; i--){
			let curr = r.charCodeAt(i);
			if(curr<=52 && curr>=49){
				return (curr-47)/2;
			}
		}
		return -1;
	}
	
	/*
	*	Will convert a player int or string to their respective team int
	*/
	playerToTeam(t){
		let x;
		if(typeof(t) != 'number'){
			x=parseInt(t);
		}
		return (x+1)/2;
	}

	/*
	*	Will change all the player touches in a rally to team touches
	*/
	playerRallyToTeamRally(r){
		let newRally = "";
		for (let i=0; i<r.length; i++){
			let curr = r.charAt(i);
			if(curr === '1' || curr === '2'){
				newRally += '1';
			}
			else if(curr === '3' || curr === '4'){
				newRally += '2';
			}
			else if(curr === 'p'){
				if(newRally.charAt(newRally.length-1) === '1'){
					newRally += '2';
				}
				else{
					newRally += '1';
				}
			}
			else{
				newRally += r.charAt(i);
			}
		}
		console.log('original rally: '+ r);
		console.log('converted to team rally: '+ newRally);
		return newRally;
	}

	render(){
		//this.playerRallyToTeamRally(this.props.rallies[0]);
		//this.parseRallies();
		console.log(this.state.putAwayFails);
		console.log(this.state.defensiveGets);
		return(
			<div>
			
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>Player 1</th>
							<th>Player 2</th>
							<th>Player 3</th>
							<th>Player 4</th>
						</tr>
						<tr>
							<th>Serve %</th>
							{this.state.firstServes.map((s,i)=>{
								let percent;
								if(s===0){
									percent = "-";
								}
								else{
									percent = Math.round(((s-this.state.secondFaults[i])/s)*100) + '%';
								}
								return(
									<th>{percent}</th>
									);
							})}
						</tr>
						<tr>
							<th>Ace:Aced</th>
							{this.state.aces.map((a,i)=>{
								return(
									<th>{a}:{this.state.aced[i]}</th>
									);
							})}
						</tr>
						<tr>
							<th>Put-Away %</th>
							{this.state.putAwaySuccess.map((p,i) => {
								let percent;
								let attempts = p + this.state.putAwayFails[i];
								if(attempts === 0){
									percent = '-';
								}
								else{
									percent = Math.round(p/attempts*100) + '%';
								}
								return(
									<th>{percent}</th>
									);
							})}
						</tr>
						<tr>
							<th>Defensive Gets</th>
							{this.state.defensiveGets.map(d => {
								return(
									<th>{d}</th>
									);
							})}
						</tr>
						<tr>
							<th>Errors</th>
							{this.state.errors.map((x)=>{
								return(
									<th>{x}</th>
									);
							})}
						</tr>
						<tr>
							<th>Ace:Double Fault</th>
							{this.state.aces.map((a,i) => {
								return(
									<th>{a}:{this.state.secondFaults[i]}</th>
									);
							})}
						</tr>
						<tr>
							<th>RPR Scores</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Hitting</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Serving</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Defense</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Efficiency</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>RPR</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Results