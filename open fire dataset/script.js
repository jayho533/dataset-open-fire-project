//Data Source: https://data.cityofnewyork.us/Public-Safety/Bureau-of-Fire-Investigations-Fire-Causes/ii3r-svjz/about_data
//global variables
let data, info, output;

async function init(){
  let link = "mvc.json"; //https://data.cityofnewyork.us/resource/h9gi-nx95.json?$limit=200";
  info = await fetch(link);
  data = await info.json();
  console.log(data); 
  
  let output = document.getElementById("output");
  let build = "";

  for(let i = 0; i < data.length; i+=1){
    let fire = data[i];
    build += `<div class="fitted card">
                 <h3>${fire.case_number}</h3>
                 <hr>
                 <h4>${fire.borough}</h4><hr>
                 <p>${fire.fire_code_category}</p>
                 <p>${fire.cause_fire_description}</p>
                 <p>${fire.case_year}</p>
                 <hr>

              </div>`    
  }
  output.innerHTML = build;

}

function filterByBorough(){
  let output = document.getElementById("output");
  let boro = document.getElementById("borough").value;

  let build = "";

  for(let i = 0; i < data.length; i+=1){
    let fire = data[i];
    if(fire.borough == boro){
      build += `<div class="fitted card">
                 <h3>${fire.case_number}</h3>
                 <hr>
                 <p>${fire.fire_code_category}</p>
                 <p>${fire.cause_fire_description}</p>
                 <p>${fire.case_year}</p>
                 <hr>

              </div>`;
    }
  }
   output.innerHTML = build;
}

function accidentsByCauseFireDescription(){
  //Challenge: Create the same functionality as in the function accidentsByVehicle() above, except you will be aggregating for the following vehicle types: 'Sedan', 'Station Wagon/Sport Utility Vehicle', 'Taxi', 'Bus', 'Motorcycle' and "Other".  "Other" isn't a vehicle type but simply meant to capture all other vehicles.

  //Variables to keep count of vehicles by type
     let smoking = 0, incendiary = 0, holidayLighting = 0, other = 0;


  //Tally the count of vehicles by type using decisions
  for(let i = 0; i < data.length; i++){
    if( data[i].cause_fire_description == "SMOKING (Cigarette/Cigar)"){
        smoking++;
    }else if(  data[i].cause_fire_description == "Incendiary- Ignitable Liquid"){
        incendiary++;
    }else if(  data[i].cause_fire_description== "Holiday Lighting"){
        holidayLighting++;
    }else {
      other++;
    }
         
    }
  }

  //Create data for chart (as array of arrays) with 1st position of array being label
   let chartData2 = [
    ["SMOKING (Cigarette/Cigar)", smoking],
    ["Incendiary- Ignitable Liquid",incendiary],
    ["Holiday Lighting",holidayLighting],
    ["Other",other]
   
  ];
  
  //Retrieve chart type from user's selection of drop-down
   let type = get("chartType").value;
  
  //Generate and display chart
 displayChart(chartData2,"chart",type);



