import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";

import { sdk } from "../../helpers/CorsSessionHelper";

import "../../App.css";

import { Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup } from 'react-bootstrap';

import { dashboard } from "@looker/sdk/lib/3.1/funcs";
import images from "./images.js";


const genderOptions = [
  {
    value: "M",
    class: "red",
    label: "Male",
  },
  {
    value: "F",
    class: "lime",
    label: "Female",
  },
];

const defaultSelectedFilters = {
  Gender: [],
  State: [],
  ["Traffic Source"]: []
};



const DashboardFilters3 = ({ dashboard }) => {

const [selectedFilters, setSelectedFilters] = useState(
  defaultSelectedFilters
);




  const updateFilter = (filterName, value) => {
    setSelectedFilters((prevSelectedFilters) => {
      let newFilters;
      if (prevSelectedFilters[filterName].includes(value)) {
        // the library Immer makes these kinds of immutable updates easier, but I didn't want to add an additional library for this example
        newFilters = {
          ...prevSelectedFilters,
          [filterName]: prevSelectedFilters[filterName].filter(
            (filterValue) => filterValue !== value
          ),
        };
      } else {
        newFilters = {
          ...prevSelectedFilters,
          [filterName]: [...prevSelectedFilters[filterName], value],
        };
      }
      return newFilters;
    });
  };

  // Update embedded dashboard filters any time selectedFilters state changes
  useEffect(() => {
    if (dashboard) {
      const lookerFormattedFilters = {};
      Object.entries(selectedFilters).forEach(([filterName, value]) => {
        lookerFormattedFilters[filterName] = value.join(",");
      });
      dashboard.send("dashboard:filters:update", {
        filters: lookerFormattedFilters,
      });
      dashboard.send("dashboard:run");
    }
  }, [selectedFilters]);




return (
<div>



          <p className="moveDown">Filter Gender:</p>

          {genderOptions.map((genderOption) => (
            <Form.Group>
              <Form.Check
                type="checkbox"
                className={genderOption.class}
                label={genderOption.label}
                name="Gender"
                checked={selectedFilters.Gender.includes(genderOption.value)}
                value={genderOption.value}
                onClick={() => updateFilter("Gender", genderOption.value)}
              />
            </Form.Group>


          ))}

  </div>
)






};

export default DashboardFilters3;
