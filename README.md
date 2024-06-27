# belly-button-challenge

## The link to the deployment is: https://rock2638.github.io/belly-button-challenge/

### Background
In this challenge, an interactive dashboard is built to explore the Belly Button Biodiversity dataset, which catalogues the microbes that colonise human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Preparation
1.  A new repository called `belly-button-challenge' is created.  
2.  The new repository is cloned to the local computer.
3.   The files:  '**index.html'**, '**samples.json**', and the '**static**' folder are copied inside the local git repository. 
4.   The above changes are pushed to GitHub and the new repository is deployed to GitHub Pages.

### Development
 The following are the steps in building the interactive dashboard: 
1.  D3 library is used to read in`samples.json`  from the URL  `https://static.bc-edx.com/data/dla-1-2/m14/lms/starter/samples.json`.

3.  A horizontal bar chart with a dropdown menu to display the top 10 OTUs found in an individual is created:
    -   Using`sample_values` as the values for the bar chart.
    -   Using`otu_ids` as the labels for the bar chart.
    -   Using `otu_labels` as the hovertext for the chart.    

4.  A bubble chart that displays each sample is created:
    -   Using  `otu_ids`  for the x values.
    -   Using  `sample_values`  for the y values.
    -   Using  `sample_values`  for the marker size.
    -   Using  `otu_ids`  for the marker colors.
    -   Using  `otu_labels`  for the text values.

5.  The sample's metadata is displayed as follows:
-   Looping through each key-value pair from the metadata JSON object and creating a text string.
-   Appending an html tag with that text to the `#sample-metadata` panel.

6. The plots are updated when a new sample is selected.

7. Inside the JavaScript code, **console.log** was used to see what the data looks like at each step.

8. The app is deployed to GitHub Pages. 






