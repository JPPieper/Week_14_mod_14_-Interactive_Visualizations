// Build the metadata panel


// 8function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    //9 Get the samples field
    const samples = data.samples;

    //10 Filter the samples for the object with the desired sample number
    const selectedSample = samples.filter(obj => obj.id === sample)[0];

    //11 Get the otu_ids, otu_labels, and sample_values
    const otuIds = selectedSample.otu_ids;
    const otuLabels = selectedSample.otu_labels;
    const sampleValues = selectedSample.sample_values;

    //12 Build a Bubble Chart
    const bubbleTrace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Earth'
      }
    };

    const bubbleData = [bubbleTrace];
    const bubbleLayout = {
      title: 'OTU ID vs. Sample Values',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' }
    };

    //13 Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    //14 For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const yticks = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

    //15 Build a Bar Chart    
    //16 Don't forget to slice and reverse the input data appropriately
    const barTrace = {
      x: sampleValues.slice(0, 10).reverse(),
      y: yticks,
      type: 'bar',
      orientation: 'h',
      text: otuLabels.slice(0, 10).reverse()
    };

    const barData = [barTrace];
    const barLayout = {
      title: 'Top 10 OTUs Found',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU ID' }
    };

    //17 Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
  });
}

//18 Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    //19 Get the names field
    const names = data.names;

    //20 Use d3 to select the dropdown with id of `#selDataset`
    const dropdown = d3.select("#selDataset");

    //21 Use the list of sample names to populate the select options
    //22 Inside a loop, use d3 to append a new option for each sample name
    names.forEach((name) => {
      dropdown.append("option").text(name).property("value", name);
    });

    //23 Get the first sample from the list
    const firstSample = names[0];

    //24 Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data); // Check the data returned from the JSON file
    console.log(sample); 
    const metadata = data.metadata;
    console.log(metadata); // Check the metadata array

    const selectedMetadata = metadata.filter(obj => obj.id == sample)[0];
    console.log(selectedMetadata); // Check the selected metadata object

    const panel = d3.select("#sample-metadata");
    panel.html("");

    Object.entries(selectedMetadata).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}
//26 Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

//27 Initialize the dashboard
init();
