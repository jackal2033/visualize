var arraySize = 150;
var svg = d3.select("svg");
var heightModifier = 2;
var width = 0,
	height = 0;

var dataArray = [];
var sourceArray=[];
generateArray();

function generateArray()
{
	//clear out data and source arrays
	clearArray(sourceArray);
	clearArray(dataArray);

	//populate source array with 0-arraySize values
	for(var i = 0; i < arraySize; i++)
		sourceArray[i] = i;
	console.log(sourceArray);
	resetDisplay();
}

function clearArray(array)
{
	while (array.length>0)
		array.pop();
}

function resetDisplay()
{
	//clear out dataArray
	//set dataArray equal to sourceArray
	clearArray(dataArray);
	dataArray = sourceArray.slice(0);
	console.log(dataArray);
	//shuffle data array
	var i = dataArray.length,
      j = 0,
      temp;

    while (i--)
		{

      j = Math.floor(Math.random() * (i+1));

      // swap randomly chosen element with current element
      temp = dataArray[i];
      dataArray[i] = dataArray[j];
      dataArray[j] = temp;

    }
		console.log(dataArray);

	redraw();
}


//function handles initial drawing of dataset
//loaded on webpage load
window.onload = function()
{
	width = +svg.attr("width");
	height = +svg.attr("height");



	redraw();
}


function redraw()
{
	//wipe canvas clean
	d3.selectAll("svg > *").remove();


	var rectArray = [];
	//redraw elements
	for (var count = 0; count < arraySize; count++)
	{
		rectHeight = heightModifier * dataArray[count];
		rectArray[count] = svg.append("rect")
			.attr("x", count * 4)
			.attr("y", height - rectHeight)
			.attr("width", 3)
			.attr("height", rectHeight);
	}
}

//does not actually sort
//calls respective sorting algorihm function
function sort()
{
	//TODO: add if statement with selection box
	//detailing which alfgo to use
	selectionSort();
}

/*
swap

Purpose: swaps two elements of array
Args: first and second: indexes to swap
*/
function swap(first, second)
{
	var temp = dataArray[first];
	dataArray[first] = dataArray[second];
	dataArray[second]= temp;
}


//runner for selection sort
//nonrecursive
function selectionSort()
{
	for (var i = 0; i < dataArray.length; i++)
		{
		sSort(i);
		sleep(500);
		redraw();
		}
}

function sSort(index)
{
	min = index;
	for (var j = index + 1; j < dataArray.length; j++)
	{
		if (dataArray[j] < dataArray[min])
			min = j;
	}
	console.log(dataArray);
	swap(min, index);
}

function sleep(ms)
{
	const date = Date.now();
	let currentDate = null;

	do{
		currentDate = Date.now();
	}
	while ( currentDate - date < ms);

}
