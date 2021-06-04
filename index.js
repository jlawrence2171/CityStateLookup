"use strict";
let cityStates = [{
    state: "California",
    stateAbbr: "CA",
    cities: ["Los Angeles", "San Francisco", "San Diego"]
 },
 {
    state: "Colorado",
    stateAbbr: "CO",
    cities: ["Aspen", "Boulder", "Denver", "Pagosa Springs"]
 },
 {
    state: "Texas",
    stateAbbr: "TX",
    cities: ["Austin", "Dallas", "Houston", "San Antonio"]
 }
];
window.onload = function () {
    // load state dropdown when page first loads
    loadStateDropdown();
    // connect onchange event handler for the leagues dropdown (hook up a function to it)
    // find the state dropdown
    const stateDropdown = document.getElementById("stateDropdown");
    stateDropdown.onchange = onStateDropdownChanged;
    // connect onchange event handler for the cities dropdown (hook up a function to it)
    // find the cities dropdown
    const citiesDropdown = document.getElementById("citiesDropdown");
    citiesDropdown.onchange = onCitiesDropdownChanged;
};
function loadStateDropdown() {
    // find the state dropdown
    const stateDropdown = document.getElementById("stateDropdown");
    // Add a "Select one..." <option>
    let selectOneOption = new Option("Select One...", "");
        stateDropdown.appendChild(selectOneOption);
    
    // loop thru the cityStates array to create an <option> for each cityStates
    for (let i = 0; i < cityStates.length; i++) {
        let theOption = document.createElement("option");
        theOption.textContent = cityStates[i].state;
        theOption.value = cityStates[i].stateAbbr;

        stateDropdown.appendChild(theOption);
}
    // find the cities dropdown
    const citiesDropdown = document.getElementById("citiesDropdown");
    // Add a "Select cities first..." <option>
    selectOneOption = document.createElement("option"); // creates <option> element
    selectOneOption.textContent = "Select Cities...";
    selectOneOption.value = "";
    citiesDropdown.appendChild(selectOneOption);
}
function onStateDropdownChanged() {
    // find the state and cities dropdowns
    const stateDropdown = document.getElementById("stateDropdown");
    const citiesDropdown = document.getElementById("citiesDropdown");
    // erase previous message
    const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = "";
    // remove the previous cities from the cities dropdown because the state list has changed
    citiesDropdown.options.length = 0;
    // find the state dropdown selection
    let selectedStateCode = stateDropdown.value;
    // did they pick "Select one..." option"
    if (selectedStateCode == "") {
        // Add a "Select States first..." <option>
        let selectOneOption = document.createElement("option"); // creates <option> element
        selectOneOption.textContent = "Select state first...";
        selectOneOption.value = "";
        citiesDropdown.appendChild(selectOneOption);
        // if they don't pick a league, we can't load teams
        return;
    }
    // go use the selected state to find the matchingstate from the array
    let matchingState = cityStates.find(arrayElement => arrayElement.stateAbbr == selectedStateCode);
    // Add a "Select one..." <option>
    let selectOneOption = document.createElement("option"); // creates <option> element
    selectOneOption.textContent = "Select one...";
    selectOneOption.value = "";
    citiesDropdown.appendChild(selectOneOption);
    // loop thru the cities in the matching state and create <option> elements for each
    for (let i = 0; i < matchingState.cities.length; i++) {
        let theOption = document.createElement("option");
        theOption.textContent = matchingState.cities[i];
        citiesDropdown.appendChild(theOption);
    }
}
function onCitiesDropdownChanged() {
    // find the state and cities dropdowns
    const stateDropdown = document.getElementById("stateDropdown");
    const citiesDropdown = document.getElementById("citiesDropdown");
    // erase previous message
    const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = "";
    // get the selected cities from dropdown
    let selectedCities = citiesDropdown.value;
    // if "Select one..." is picked, just exit the function
    if (selectedCities == "") {
        return;
    }
    // get the selected cities
    let selectedStateIndex = stateDropdown.selectedIndex;
    let selectedState = stateDropdown.options[selectedStateIndex].text;
    
    // build a message w/ state and cities info and display in <p>
    let displayMessage = "Cities: " + selectedCities + "<br>" +
        "State: " + selectedState;
    messagePara.innerHTML = displayMessage;
}