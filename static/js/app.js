// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
   
    // Filter the metadata for the object with the desired sample number
    let desired_sample = metadata.filter(item => item.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let desired_panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    desired_panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    if (desired_sample.length > 0) {
      let result = desired_sample[0];
      Object.entries(result).forEach(([key, value]) => {

    // capitalised the first letter
      let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      desired_panel.append("h5").text(`${capitalizedKey}: ${value}`);

      });
    }
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let filteredSample = samples.filter(item => item.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = filteredSample[0].otu_ids;

    let otu_labels = filteredSample[0].otu_labels;

    let sample_values = filteredSample[0].sample_values;

    // Build a Bubble Chart
    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];

    let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      margin: { t: 0 },
      hovermode: 'closest',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      margin: { t: 40}
    };
     // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Calculate the maximum sample value for the x-axis range
  let maxSampleValue = Math.max(...sample_values.slice(0, 10));

    // Build a Bar Chart
    // Slice and reverse the input data appropriately
    let barData = [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    }];

    let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria',
    // Set the range with some padding
      range: [0, maxSampleValue + 10] 
      },
      margin: { t: 40, l:150}
    };
    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
});
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options   
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    names.forEach(function(value) {
    // Append a new option to the dropdown
      dropdownMenu.append("option")
        .attr("value", value)  // Set the value attribute
        .text(value);          // Set the text content 
    });

    // Get the first sample from the list
    let firstsample = names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstsample)
    buildCharts(firstsample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialise the dashboard
init();
