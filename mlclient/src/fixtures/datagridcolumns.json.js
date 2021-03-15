/* eslint-disable no-mixed-spaces-and-tabs*/
export const dataColumns = [
	{
		dataField: 'ordinal',
		text: 'ID',
		hidden: true
	},
	{
		dataField: 'month',
		text: 'Month',
		headerTitle: true,
		headerAlign: 'center',
		align: 'center',
		headerStyle: { width: '5%' },
	},
	{
		dataField: 'year',
		text: 'Year',
		headerTitle: true,
		headerAlign: 'center',
		align: 'center',
		headerStyle: { width: '5%' },
	},
	{
		dataField: 'account',
		text: 'Contract Account',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '12%' },
	},
	{
		dataField: 'billquantity',
		text: 'Bill Quantity',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		align: 'center',
		classes: "font-italic text-muted",
		headerStyle: { width: '12%' },
	},


];