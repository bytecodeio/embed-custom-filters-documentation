import React, { useState, useRef, useEffect } from "react";


import EmbedSDKInit from "../common/EmbedInit";

import { Col, Container, Row } from "react-bootstrap";

import EmbedDashboard from "../EmbedDashboard/EmbedDashboard";

import DashboardFilters3 from "../EmbedDashboard/DashboardFilters3";




function MiddleSection() {
  EmbedSDKInit();


const [filters, setFilters] = useState();
const [dashboard, setDashboard] = useState();



  return (


    <div className="position-relative">


            <DashboardFilters3
              filters={filters}
              setFilters={setFilters}
              dashboard={dashboard}
            />


            <EmbedDashboard
              setDashboard={setDashboard}
              setFilters={setFilters}
            />


</div>



  );
}

export default MiddleSection;
