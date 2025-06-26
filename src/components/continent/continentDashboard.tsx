import React, { useState } from "react";
import {ComponentTab} from "../../sharedComponent/componentTab"
import { EuiCard, EuiFlexGrid, EuiFlexItem, EuiPanel, EuiTitle} from "@elastic/eui";
import {useGetContinentQuery} from "../../Redux/services/continentServices"
import { Chart, Settings, Partition, PartitionLayout,PartialTheme } from "@elastic/charts";
import { LIGHT_THEME } from '@elastic/charts';

export const ContinentDashboard: React.FC = () => {

  const {data: continentData, isError, isLoading}= useGetContinentQuery();
  console.log(continentData,"...dwdnwd")


  const chartData = continentData?.map((item)=>({
    continent : item.continentName,
    population : item.totalPopulation
  }))
  

  const chartColor = ['#1EA593', '#2B70F7', '#CE0060', '#38007E', '#FCA5D3'];

  // const chartBaseTheme = useChartBaseTheme();

  const themeOverrides : PartialTheme={
    ...LIGHT_THEME,
    partition : {
      ...LIGHT_THEME.partition,
      emptySizeRatio : 0.3},
  }


  if(isLoading) return <p>Loading....</p>
  if (isError) return <p>Something went wrong</p>

  return (
    <>
    <ComponentTab/>
      <EuiPanel>
        <EuiTitle><h3>Dashboard summary</h3></EuiTitle>
        <EuiFlexGrid columns={2}>
          <EuiFlexItem >
            <Chart size={{height : 300}}>
              <Settings
                baseTheme={ LIGHT_THEME}
                theme={themeOverrides}
              />
              <Partition
                id="pieByCP"
                data={chartData || []}
                layout={PartitionLayout.sunburst}
                valueAccessor={(d)=>d.population}
                layers={[
                  {
                    groupByRollup : (d: { continent: string; population: number })=> d.continent,
                    shape : {
                        fillColor : (_,sortIndex)=>
                          chartColor[sortIndex % chartColor.length],
                    },
                  },
                ]}
                clockwiseSectors={false}
              />

            </Chart>
            
          </EuiFlexItem>
          
        </EuiFlexGrid>
        

      </EuiPanel>
    </>
  );
};
