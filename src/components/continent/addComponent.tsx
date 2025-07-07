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
import { ToastType } from "./componentEdit";


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

  const [errors,setErrors]=useState<{
    continentName?: string;
    totalPopulation?:string;
    area?: string;
    populationDensity?: string;
    numberOfCountries?:string;
  }>({});
  const [toast, setToast] = useState<ToastType[]>([]);

  const removeToast = () => {
    setToast([]);
  };

  const handleAddContinent=async ()=>{
    const newErrors: typeof errors = {};
    if (!formData.continentName){
      newErrors.continentName= "please enter continent name"
    }
    if (formData.totalPopulation <= 0){
      newErrors.totalPopulation=  "please enter positive number"
    }
    if (formData.area <=0){
      newErrors.area = " area must be positive number"
    }
    if (formData.populationDensity <= 0){
      newErrors.populationDensity = "please enter positive number"
    }
    if (formData.numberOfCountries <= 0){
      newErrors.numberOfCountries = "please enter positive number"
    }
    if (Object.keys(newErrors).length>0){
      setErrors(newErrors);
      return;
    }
    try{
      await addContinent(formData).unwrap()
      setFormData({
        continentName : "",
        totalPopulation : 0,
        area : 0,
        populationDensity : 0,
        numberOfCountries : 0
      })
      setErrors({});
      setToast([{
        id : "1",
        color : "success",
        title : "Post Completed",
        text : <p>your form data is added Successfully</p>
      }])
    }catch(error){
      console.log(error);
    }
  }


  return (
    <>
      <EuiFlexGroup className="add-title">
        <EuiFlexItem>
          <EuiText>Add Continent Details</EuiText>
          <EuiHorizontalRule margin="xs" />
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
              {errors.continentName && (
              <EuiText color="danger">{errors.continentName}</EuiText>
              )}
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
              {errors.totalPopulation && (
                <EuiText color="danger">{errors.totalPopulation}</EuiText>
              )}
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
              {errors.area &&  (
                <EuiText>{errors.area}</EuiText>
              )}
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
              {errors.populationDensity && (
                <EuiText color="danger">{errors.populationDensity}</EuiText>
              )}
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
              {errors.numberOfCountries && (
                <EuiText color="danger">{errors.numberOfCountries}</EuiText>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentEdit-btn" justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                color="danger"
                onClick={() => navigate("/overview")}
              >
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                color="success"
                onClick={handleAddContinent}
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
    </>
  );
};
