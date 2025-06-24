import {
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from "@elastic/eui";
import React from "react";
import { UseDispatch,useSelector } from "react-redux";
import {setSelectedContinent} from "../../Redux/slices/continentSlice";
import {clearSelectedContinent} from "../../Redux/slices/continentSlice"



export const ComponentEdit: React.FC = () => {
  return (
    <>
      <div className="main-editFlexDiv">
        <div className="sub-editFlexDiv">
        <EuiFlexGroup className="continentName-grp" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiText>Continent Name</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldText placeholder="Enter Continent Name" />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup className="continentPopulation-grp">
          <EuiFlexItem grow={false}>
            <EuiText>Total Population</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldText placeholder="Enter Total Population" />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup className="continentArea-grp">
          <EuiFlexItem grow={false}>
            <EuiText>Total Area</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldText placeholder="Enter Total Area" />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup className="continentDensity-grp">
          <EuiFlexItem grow={false}>
            <EuiText>Population Density</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldText placeholder="Enter Population Density" />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup className="continentCountry-grp">
          <EuiFlexItem grow={false}>
            <EuiText>No. Of Country</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldText placeholder="Enter Number Of Country" />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup className="continentEdit-btn" justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty>Cancel</EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty>Update</EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
        </div>
        </div>
    </>
  );
};
