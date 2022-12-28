import React from "react";

// Data
import { translations } from "../data/translations";


// This function is used to fill the translations select input in the two forms
export const addTranslationOptions = () => {
    return (
      <>
        {translations.map((version) => (
          <option key={translations.indexOf(version)} value={version.value}>
            {version.label}
          </option>
        ))}
      </>
    );
  };
  
  
  // Function to select a particular option based on the params sent by the URL
  // I didn't find any proper way to do it because the optgroup is hindering to set a value to refBook, or to iterate through the select input in the DOM.
  const setSelectedOption = (option, param, property) => {
    if (param && property === param) {
      option.setAttribute('selected', true);
    }
  }
  
  // Fonction to add an optgroup to a select input
  
  const addOptgroup = (optgroupName, select) => {
    let optgroup = document.createElement('optgroup');
    optgroup.setAttribute('label', optgroupName);
    select.appendChild(optgroup);
    return optgroup;
  }
  
  // Function to set option values and append it to an optgroup
  
  const addOptionValues = (options, optgroup, param) => {
    for (let i=0; i<options.length; i++) {
      let option = document.createElement('option');
      const shortname = options[i].shortname;
      option.setAttribute('value', shortname);
      setSelectedOption(option, param, shortname);
      option.innerText = options[i].name;
      optgroup.appendChild(option);
    }
  }
  
  export const fillBookSelectInput = (data, select, param) => {
    data.forEach(
      item => {
        for (let itemName in item) {
          const optgroup = addOptgroup(itemName, select);
          addOptionValues(item[itemName], optgroup, param);
        } 
      }
    )
  }