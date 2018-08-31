import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			prices: [],
			dates: [],
			coin: 'bpi'
		}
		this.getCoinPrices = this.getCoinPrices.bind(this);
		this.parsePrice = this.parsePrice.bind(this);
	}

	componentDidMount () {
		this.getCoinPrices('bpi');
	}

	parsePrice (data) {
		return {dates: Object.keys(data), prices: Object.values(data)}
	}

	getCoinPrices (coinCode) {
		let url = "https://api.coindesk.com/v1/bpi/historical/close.json";
		
		return fetch(url)
		.then(data => data.json())
		.then(prices => this.parsePrice(prices[coinCode]))
		.then(data => this.setState(data))

	}

	render () {
		const data = {
		  labels: this.state.dates,
		  datasets: [
		    {
		      label: 'My First dataset',
		      fill: false,
		      lineTension: 0.1,
		      backgroundColor: 'rgba(75,192,192,0.4)',
		      borderColor: 'rgba(75,192,192,1)',
		      borderCapStyle: 'butt',
		      borderDash: [],
		      borderDashOffset: 0.0,
		      borderJoinStyle: 'miter',
		      pointBorderColor: 'rgba(75,192,192,1)',
		      pointBackgroundColor: '#fff',
		      pointBorderWidth: 1,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		      pointHoverBorderColor: 'rgba(220,220,220,1)',
		      pointHoverBorderWidth: 2,
		      pointRadius: 1,
		      pointHitRadius: 10,
		      data: this.state.prices
		    }
		  ]
		};

	return (
		<div>
			<Line ref='chart' data={data}/>
		</div>
	)
}
}

ReactDOM.render(<App />, document.getElementById('app'));

