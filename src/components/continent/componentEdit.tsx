import {
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedContinent } from "../../Redux/slices/continentSlice";
import { useUpdateContinentMutation } from "../../Redux/services/continentServices";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";

export const ComponentEdit: React.FC = () => {
  const dispatch = useDispatch();
  const selectedContinent = useSelector(
    (state: RootState) => state.selectedContinent.data
  );

  const [updateContinent] = useUpdateContinentMutation();

  const [formData, setFormData] = useState(selectedContinent);

  const navigate=useNavigate();


  useEffect(() => {
    if (selectedContinent) setFormData(selectedContinent);
  }, [selectedContinent]);

  if (!formData) {
  return <p>No continent selected for editing.</p>;
}
  return (
    <>
      <div className="main-editFlexDiv">
        <div className="sub-editFlexDiv">
          <EuiFlexGroup className="continentName-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Continent Name</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.continentName}
                onChange={(e) =>
                  setFormData({ ...formData, continentName: e.target.value })
                }
                placeholder="Enter Continent Name"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentPopulation-grp">
            <EuiFlexItem grow={false}>
              <EuiText>Total Population</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.totalPopulation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalPopulation: Number(e.target.value),
                  })
                }
                placeholder="Enter Total Population"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentArea-grp">
            <EuiFlexItem grow={false}>
              <EuiText>Total Area</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: Number(e.target.value) })
                }
                placeholder="Enter Total Area"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentDensity-grp">
            <EuiFlexItem grow={false}>
              <EuiText>Population Density</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.populationDensity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    populationDensity: Number(e.target.value),
                  })
                }
                placeholder="Enter Population Density"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentCountry-grp">
            <EuiFlexItem grow={false}>
              <EuiText>No. Of Country</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.numberOfCountries}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfCountries: Number(e.target.value),
                  })
                }
                placeholder="Enter Number Of Country"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentEdit-btn" justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                onClick={() => {
                  dispatch(clearSelectedContinent());
                  setFormData(null);
                  navigate ('/overview')
                }
              }
              >
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                onClick={async () => {
                  if (formData) {
                    try {
                      await updateContinent({
                        id: formData._id,
                        ...formData,
                      }).unwrap();
                      dispatch(clearSelectedContinent());
                      navigate ('/overview')
                    } catch (error) {
                      console.error("error occured", error);
                    }
                  }
                }}
              >
                Update
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </div>
    </>
  );
};
