/* eslint-disable no-unused-vars, no-mixed-spaces-and-tabs */
// import React from 'react';



export const options = {
	paginationSize: 10,
	pageStartIndex: 0,
	alwaysShowAllBtns: false, // Always show next and previous button
	withFirstAndLast: true, // Hide the going to First and Last page button
	showTotal: true,
	pageButtonRenderer: ({ disabled }) => {
		const handleClick = (e) => {
			e.preventDefault();
		};
	}
};


export const options3 = {
	paginationSize: 50,
	pageStartIndex: 1,
	alwaysShowAllBtns: false, // Always show next and previous button
	withFirstAndLast: false, // Hide the going to First and Last page button
	hideSizePerPage: true, // Hide the sizePerPage dropdown always
	hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
	firstPageText: 'First',
	prePageText: 'Back',
	nextPageText: 'Next',
	lastPageText: 'Last',
	nextPageTitle: 'First page',
	prePageTitle: 'Pre page',
	firstPageTitle: 'Next page',
	lastPageTitle: 'Last page',
	// paginationTotalRenderer: customTotal,
	showTotal: true, // range of current page
	onSizePerPageChange: (sizePerPage, page) => {
		// console.log('Size per page change!!!' , ' Newest size per page:' , sizePerPage , ' Newest page:' , page);
	},
	onPageChange: (page, sizePerPage) => {
		// console.log('Page change!!!' , 'Newest size per page:' , sizePerPage , ' Newest page:' , page);
	}
};

export const options2 = {
	paginationSize: 10,
	pageStartIndex: 1,
	alwaysShowAllBtns: false, // Always show next and previous button
	withFirstAndLast: false, // Hide the going to First and Last page button
	hideSizePerPage: true, // Hide the sizePerPage dropdown always
	hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
	firstPageText: 'First',
	prePageText: 'Back',
	nextPageText: 'Next',
	lastPageText: 'Last',
	nextPageTitle: 'First page',
	prePageTitle: 'Pre page',
	firstPageTitle: 'Next page',
	lastPageTitle: 'Last page',
	// paginationTotalRenderer: customTotal,
	showTotal: true, // range of current page
	onSizePerPageChange: (sizePerPage, page) => {
		// console.log('Size per page change!!!' , ' Newest size per page:' , sizePerPage , ' Newest page:' , page);
	},
	onPageChange: (page, sizePerPage) => {
		// console.log('Page change!!!' , 'Newest size per page:' , sizePerPage , ' Newest page:' , page);
	}
};