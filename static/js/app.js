let hotelNames = [];
let hotelRatings = [];

d3.json("http://127.0.0.1:5005/api").then(function (response) {
    for (let index = 0; index < response.length; index++) {
        let restaurant = response[index];
        hotelNames.push(restaurant.Name);
        hotelRatings.push(restaurant.Rating);
    }

    // Trace1 for the Greek Data
    let trace1 = {
        x: hotelNames,
        y: hotelRatings,
        name: "New York City Hotel Ratings",
        type: "bar",
        orientation: "h"
    };

    // Data array
    // `data` has already been defined, so we must choose a new name here:
    let traceData = [trace1];

    // Apply a title to the layout
    let layout = {
        title: "New York Hotels",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    // Render the plot to the div tag with id "plot"
    // Note that we use `traceData` here, not `data`
    Plotly.newPlot("plot-id", traceData, layout);

})
