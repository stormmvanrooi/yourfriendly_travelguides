let plotData = [];
let hotelNames = [];
let hotelDistance = [];
function getData(respHotel) {
    let parsingData = respHotel;
    for (let index = 0; index < parsingData.length; index++) {
        let hotel_data = parsingData[index];
        plotData.push(
            {
                "name": hotel_data.name,
                "dist": hotel_data.distance
            }
        )
        //console.log(hotel_data)
    }
    // Sort data in descending order
    let descData = plotData.sort(function sortFunction(a,b){
        return a.dist - b.dist;
    }).slice(0,10);
    // Trace1 for the Greek Data
    console.log(descData)
    // Create traceBar for horizontal bar graph
    let colors = ['#4169e1', '#324ab2', '#2a52be',  '#0047ab', '#0038a8', '#003399', '#041690', '#002387', '#002366', '#002147']
    let trace1 = {
        x: descData.map(i => i.dist),
        y: plotData.map(i => i.name),
        text: plotData.map(i => i.name),
        type: "bar",
        orientation: "h",
        mode: 'markers',
        marker: {
                color: colors
        }
    };
    // Data array
    // `data` has already been defined, so we must choose a new name here:
    let traceData = [trace1];
    // Apply a title to the layout
    let layout = {
        xaxis: {autorange: true, 
            title: 'Distance in meters from Manhattan',},
        showticklabels: true,
        yaxis:{
        tickangle: 0},
        tickfont: {
            family: 'Old Standard TT, serif',
            size: 12,
        color: 'black'
        },
            width: 750,
            height: 400,
            plot_bgcolor: 'rgb(248,248,255)',
        margin: {
            l: 250,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        }
    };

    // Render the plot to the div tag with id "plot"
    // Note that we use `traceData` here, not `data`

    Plotly.newPlot("plot-id", traceData, layout, {responsive:true});
console.log(traceData)
}
getData(respHotel)