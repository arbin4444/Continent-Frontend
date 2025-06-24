import React from "react";
import {ComponentTab} from "../../sharedComponent/componentTab"
import { EuiCard, EuiFlexGrid, EuiFlexItem, EuiPanel, EuiTitle } from "@elastic/eui";

export const ContinentDashboard: React.FC = () => {

  

  return (
    <>
    <ComponentTab/>
      <EuiPanel>
        <EuiTitle><h3>Dashboard summary</h3></EuiTitle>
        <EuiFlexGrid columns={2}>
          <EuiFlexItem>
            <EuiCard title= "continent-name" description=" so the continent name is asia"></EuiCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard title= "continent-name" description=" so the continent name is asia"></EuiCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard title= "continent-name" description=" so the continent name is asia"></EuiCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard title= "continent-name" description=" so the continent name is asia"></EuiCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard title= "continent-name" description=" so the continent name is asia"></EuiCard>
          </EuiFlexItem>
        </EuiFlexGrid>
      </EuiPanel>
    </>
  );
};
