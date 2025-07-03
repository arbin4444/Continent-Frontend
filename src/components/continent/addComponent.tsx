import {
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiGlobalToastList,
  EuiHorizontalRule,
  EuiText,
} from "@elastic/eui";
import React, { useState } from "react";
import { useAddContinentMutation } from "../../Redux/services/continentServices";
import { useNavigate } from "react-router-dom";
import {ToastType} from "./componentEdit";
import {ComponentTab} from "../../sharedComponent/componentTab"

interface AddContinentType {
  continentName: string;
  totalPopulation: number;
  area: number;
  populationDensity: number;
  numberOfCountries: number;
}

export const AddComponent: React.FC = () => {
  const [formData, setFormData] = useState<AddContinentType>({
    continentName: "",
    totalPopulation: 0,
    area: 0,
    populationDensity: 0,
    numberOfCountries: 0,
  });

  const [addContinent] = useAddContinentMutation();

  const navigate = useNavigate();


  const [toast,setToast]=useState<ToastType[]>([]);

  const removeToast =()=>{
    setToast([])
  }


  return (
    <>
    <div className="add-tab">
      <ComponentTab/>
    </div>
    <EuiFlexGroup className="add-title">
      <EuiFlexItem>
        <EuiText>Add Continent Details</EuiText>
        <EuiHorizontalRule margin="xs"/>
      </EuiFlexItem>
    </EuiFlexGroup>
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
          <EuiFlexGroup className="continentPopulation-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Total Population</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.totalPopulation || ""}
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
          <EuiFlexGroup className="continentArea-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Total Area</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.area || ""}
                onChange={(e) =>
                  setFormData({ ...formData, area: Number(e.target.value) })
                }
                placeholder="Enter Total Area"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentDensity-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Population Density</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.populationDensity || ""}
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
          <EuiFlexGroup className="continentCountry-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>No. Of Country</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                value={formData.numberOfCountries || ""}
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
              <EuiButtonEmpty onClick={() => navigate("/overview")}>
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                onClick={async () => {
                  if (formData) {
                    try {
                      await addContinent(formData).unwrap();
                      setFormData({
                        continentName: "",
                        totalPopulation: 0,
                        area: 0,
                        populationDensity: 0,
                        numberOfCountries: 0,
                      });
                      setToast((prev)=>[
                        ...prev,{
                            id : "1",
                            title :" Post Completed ",
                            color : "success",
                            text : <p>your post is completed</p>

                        }
                      ])
                      navigate("/overview");
                    } catch (error) {
                      console.log("error", error);
                    }
                  }
                }}
              >
                Add
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiGlobalToastList
            toasts={toast}
            dismissToast={removeToast}
            toastLifeTimeMs={6000}
          />
        </div>
      </div>
      <EuiFlexGroup className="add-title">
        <EuiFlexItem>
          <EuiHorizontalRule/>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
