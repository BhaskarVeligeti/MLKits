/* eslint-disable no-unused-vars */
import * as obj from './SPObject';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import numeral from 'numeral';

export default function BarChart(opts) {
	// console.log("........Init BarChart.........")
	this.element = opts.element;
	this.parent = opts.parent;
	this.data = opts.data;
	this.width = opts.width;
	this.height = opts.height;
	this.margin = opts.margin;
	this.xKeys = opts.xKeys;
	// this.yKeys = opts.yKeys;
	this.xAxisLabel = opts.xAxisLabel;
	this.yAxisLabel = opts.yAxisLabel;
	this.label = opts.label;
	this.isFormat = opts.isFormat;
	this.color = d3.scaleOrdinal(d3.schemeAccent);
	// this.color = d3.scaleSequential(d3.interpolatePiYG);
} // end of BarChart()

BarChart.method('clean', function () {
	d3.select(this.element)
		.select('svg')
		.remove();
}); // end of clean()

// need to move AdminDashboard
BarChart.method('init', function () {
	// console.log('init - this.data :',this.data)
	var keys = this.xKeys;
	// console.log('init - keys :', keys)
	this.data.map(d => {
		return keys.forEach(k => {
			if (k === 'yValue') {
				d[k] = +d[k]; // convert into integer
			}

		});
	});
}); // end of init()

BarChart.method('draw', function () {
	// console.log("************* In BarChart Draw **************")

	var width = this.width - this.margin.left - this.margin.right,
		height = this.height - this.margin.top - this.margin.bottom;
	var t = d3.transition().duration(750);
	var xAxisLabel = this.xAxisLabel
	var yAxisLabel = this.yAxisLabel
	var isFormat = this.isFormat
	var svg = d3
		.select(this.element)
		.append('svg')
		.attr('width', width + this.margin.left + this.margin.right)
		.attr('height', height + this.margin.top + this.margin.bottom)
	// .attr('style', 'outline: thin solid silver;') // Use the style attribute to place an outline around the svg:

	const chart = svg.append('g')
		.attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')')
	// .attr('transform', `translate(${margin}, ${margin})`);


	// Graph title
	chart
		.append('text')
		.attr('x', width / 2)
		.attr('y', 15 - this.margin.top / 2)
		.attr('text-anchor', 'middle')
		.style('font-size', '12px')
		.text(this.label);

	/* Initialize tooltip */
	var tooltip = d3Tip()
		.attr('class', 'd3-tip')
		.html(function (d) {
			// console.log('d :', d)
			var text =
				"" + (xAxisLabel) + " : <span style='color:red'>" +
				d.xValue +
				'</span><br>';
			text +=
				"" + (yAxisLabel) + " : <span style='color:red;text-transform:capitalize'>" +
				numeral(d.yValue).format('0,0.00') +
				'</span><br>';
			return text;
		});

	/* Invoke the tooltip in the context of your svgualization */
	chart.call(tooltip);

	// X Label
	chart
		.append('text')
		.attr('y', height + 59)
		.attr('x', width / 2)
		.attr('font-size', '13px')
		.attr('text-anchor', 'middle')
		.text(this.xAxisLabel);

	// Y Label
	chart
		.append('text')
		.attr('y', -50)
		.attr('x', -(height / 2))
		.attr('font-size', '13px')
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)')
		.text(this.yAxisLabel);


	// chart
	// 	.attr("class", "y axis")
	//     .append("text")
	// 	.attr("transform", "rotate(-90)")
	// 	.attr("y", 6)
	// 	.attr("dy", ".71em")
	// 	.style("text-anchor", "end")
	// 	.attr('font-size', '13px')
	// 	// .attr('font-color', '#e83e8c')
	// 	.text(this.yAxisLabel);


	this.init();

	// console.log("************* this.data **************",this.data)

	/*   Step -1   range  define  */
	// var formatCurrency = d3.format(",");
	// X Scale
	var xScale = d3
		.scaleBand()
		.domain(
			this.data.map(function (d) {
				return d.xValue;
			})
		)
		.range([0, width])
		.paddingInner(0.1)
		.paddingOuter(0.1);

	// Y Scale - range
	var yScale = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(this.data, function (d) {
				return d.yValue;
			})
		])
		.range([height, 0])



	/*   Step - 2  */

	// X Axis
	var xAxisCall = d3.axisBottom(xScale);
	chart
		.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.transition(t)
		.call(xAxisCall)
		.selectAll('text')
		.attr('y', '10')
		.attr('x', '-5')
		.attr('text-anchor', 'end')
		.attr('transform', 'rotate(-40)');

	// Y Axis
	// var yAxisCall = d3.axisLeft(yScale).tickFormat(function (d) {
	// 	return '' + d;
	// });
	var yAxisCall = d3.axisLeft(yScale).ticks(6).tickFormat(function (d) {
		if (isFormat === "Y") {
			return parseInt(d / 1000) + "k";
		} else {
			return parseInt(d);
		}


	})
	chart
		.append('g')
		.attr('class', 'y axis')
		.transition(t)
		.call(yAxisCall);

	//YLines 
	const makeYLines = () => d3.axisLeft()
		.scale(yScale)
	chart.append('g')
		.attr('class', 'grid')
		.attr('style', 'stroke: #9FAAAE;stroke-opacity: 0.02')
		.call(makeYLines()
			.tickSize(-width, 0, 0)
			.tickFormat('')
		)

	/*   Step - 3  Bars 
		1.Firstly we use 'Select All' to get all the rect on the screen.
		2.Next we associate this selection with our array of data using this data method.
		*/

	var rects = chart.selectAll('rect').data(this.data);



	/*
		We pass the results onto a method called 'enter' and then we pass the result of that on to 'Append'.
		 */
	rects
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', function (d) {
			return xScale(d.xValue);
		})
		.attr('width', xScale.bandwidth())
		.attr('fill', (d, i) => {
			return this.color(i);
		})
		.on('mouseover', tooltip.show)
		.on('mouseout', tooltip.hide)
		.attr('y', yScale(0)) // pixel position bottom of the chart
		.attr('height', 0)
		.attr('fill-opacity', 0)
		// above code is before transition
		.transition(t)
		.attr('y', function (d) {
			return yScale(d.yValue);
		})
		.attr('height', function (d) {
			return height - yScale(d.yValue);
		})
		.attr('fill-opacity', 1);
}); // end of draw()
