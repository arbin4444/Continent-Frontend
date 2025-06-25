import React, { useState } from "react";
import {ComponentTab} from "../../sharedComponent/componentTab"
import { EuiCard, EuiFlexGrid, EuiFlexItem, EuiPanel, EuiTitle} from "@elastic/eui";
import {useGetContinentQuery} from "../../Redux/services/continentServices"
import { Chart, Settings, Partition, PartitionLayout,PartialTheme } from "@elastic/charts";
import { LIGHT_THEME } from '@elastic/charts';

export const ContinentDashboard: React.FC = () => {

  const {data: continentData, isError, isLoading}= useGetContinentQuery();
  console.log(continentData,"...dwdnwd")

  const [selectedContinent, setSelectedContinent]= useState<string | null>();

  const chartData = continentData?.map((item)=>({
    continent : item.continentName,
    population : item.totalPopulation
  }))
  

  const chartColor = ['#1EA593', '#2B70F7', '#CE0060', '#38007E', '#FCA5D3'];

  // const chartBaseTheme = useChartBaseTheme();

  const themeOverrides : PartialTheme={
    partition : {emptySizeRatio : 0.4},
  }

  const selectedData = continentData?.find((item)=>item.continentName === selectedContinent)


  if(isLoading) return <p>Loading....</p>
  if (isError) return <p>Something went wrong</p>

  return (
    <>
    <ComponentTab/>
      <EuiPanel>
        <EuiTitle><h3>Dashboard summary</h3></EuiTitle>
        <EuiFlexGrid columns={2}>
          <EuiFlexItem >
            <Chart size={{height : 200}}>
              <Settings
                baseTheme={ LIGHT_THEME}
                theme={themeOverrides}
                onElementClick={(e:any)=>{
                  const clickedContinent = e[0]?.[0]?.groupByRollup;
                  if(typeof clickedContinent=== "string"){
                    setSelectedContinent(clickedContinent);

                  }
                }}
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
          {selectedData ? (
            <>
              <EuiFlexItem>
                <EuiCard
                  title="Continent"
                  description={selectedData.continentName}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiCard
                  title="Total Population"
                  description={`${selectedData.totalPopulation}B`}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiCard
                  title="Area"
                  description={`${selectedData.area} million km²`}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiCard
                  title="Density"
                  description={`${selectedData.populationDensity} /km²`}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiCard
                  title="Number of Countries"
                  description={String(selectedData.numberOfCountries)}
                />
              </EuiFlexItem>
            </>
          ) : (
            <EuiFlexItem>
              <EuiCard
                title="Click a continent"
                description="Select a slice on the pie chart to view details"
              />
            </EuiFlexItem>
          )}
        </EuiFlexGrid>
        

      </EuiPanel>
    </>
  );
};
