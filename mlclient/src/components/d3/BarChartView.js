/* eslint-disable no-undef */
import React, { Component } from 'react';
import BarChart from './BarChart';
import PropTypes from 'prop-types';


class BarChartView extends Component {
	constructor(props) {
		super(props);
		// console.log(".........Init BarChartView........")
		this.state = {
			width: this.props.width,
			height: this.props.height,
			margin: this.props.margin
			// margin : { left: 50, right: 30, top: 30, bottom: 50 }
		}
	}

	componentDidMount = () => {
		this.draw();
	};

	draw = () => {
		var container = document.getElementById(this.props.container);
		// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", container)
		var model = this.props.gdata;
		var xKeys = Object.keys(model.data[0]); // pulling out all columns
		// var yKeys = model.yKeys;
		// console.log("model and keys",model,xKeys)
		var p = new BarChart({
			element: container,
			parent: this,
			data: model.data,
			width: this.state.width,
			height: this.state.height,
			margin: this.state.margin,
			xKeys: xKeys,
			// yKeys: yKeys,
			xAxisLabel: this.props.xAxisLabel,
			yAxisLabel: this.props.yAxisLabel,
			label: this.props.label,
			isFormat: this.props.isFormat
		});
		p.clean();
		p.draw();
	};

	render() {
		return <div id={this.props.container} />;
	}
}

BarChartView.propTypes = {
	width: PropTypes.any,
	height: PropTypes.any,
	margin: PropTypes.any,
	container: PropTypes.any,
	gdata: PropTypes.any,
	xAxisLabel: PropTypes.any,
	yAxisLabel: PropTypes.any,
	label: PropTypes.any,
	isFormat: PropTypes.any
};


export default BarChartView;
