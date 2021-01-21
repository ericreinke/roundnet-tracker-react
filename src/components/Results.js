import React, {Component} from 'react';
import './Results.css';

class Results extends Component {


	constructor(){
		super();
		this.parse=this.parse.bind(this);
	}

	parse(){
		for(var i of this.props.rallies){
			console.log(i);
		}
	}

	componentDidMount(){
		console.log("did mount");

	}

	render(){
		return(
			<div>
			<button onClick={this.parse}/>
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
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Ace:Aced</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Put-Away %</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Defensive Gets</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Errors</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>blank</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>Ace:Double Fault</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
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