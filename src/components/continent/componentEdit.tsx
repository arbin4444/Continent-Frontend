import {
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiGlobalToastList,
  EuiHorizontalRule,
  EuiText,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedContinent } from "../../Redux/slices/continentSlice";
import { useUpdateContinentMutation } from "../../Redux/services/continentServices";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";

export interface ToastType {
  id: string;
  title: string;
  color: any;
  text: any;
}

export const ComponentEdit: React.FC = () => {
  const dispatch = useDispatch();
  const selectedContinent = useSelector(
    (state: RootState) => state.selectedContinent.data
  );

  const [updateContinent] = useUpdateContinentMutation();

  const [formData, setFormData] = useState(selectedContinent);

  const [errors, setErrors] = useState<{
    continentNameError?: string;
    totalPopulationError?: string;
    areaError?: string;
    populationDensityError?: string;
    numberOfCountriesError?: string;
  }>({});

  const [toast, setToast] = useState<ToastType[]>([]);

  const removeToast = () => {
    setToast([]);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedContinent) setFormData(selectedContinent);
  }, [selectedContinent]);

  if (!formData) {
    return <p>No continent selected for editing.</p>;
  }

  const handleEditContinent = async () => {
    const newErrors: typeof errors = {};

    if (!formData.continentName.trim()) {
      newErrors.continentNameError = "please enter continent name";
    }
    if (formData.totalPopulation <= 0) {
      newErrors.totalPopulationError = "should be positive number";
    }
    if (formData.area <= 0) {
      newErrors.areaError = "should be positive number";
    }
    if (formData.populationDensity <= 0) {
      newErrors.populationDensityError = "should be positive number";
    }
    if (formData.numberOfCountries <= 0) {
      newErrors.numberOfCountriesError = "should be positive number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (formData) {
      try {
        await updateContinent({ id: formData._id, ...formData }).unwrap();
        setToast([
          {
            id: "1",
            color: "success",
            title: "Update Complete",
            text: <p>your data is updated Successfully</p>,
          },
        ]);
        setErrors({});
      } catch (errors) {
        console.log(errors);
      }
    }
  };

  return (
    <>
      <div className="edit-title">
        <EuiText>Edit Continent Details</EuiText>
        <EuiHorizontalRule margin="xs" />
      </div>
      <div className="main-editFlexDiv">
        <div className="sub-editFlexDiv">
          <EuiFlexGroup className="continentName-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Continent Name</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                fullWidth
                isInvalid={!!errors.continentNameError}
                value={formData.continentName}
                onChange={(e) =>
                  setFormData({ ...formData, continentName: e.target.value })
                }
                placeholder="Enter Continent Name"
              />
              {errors.continentNameError && (
                <EuiText color="danger">{errors.continentNameError}</EuiText>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentPopulation-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Total Population</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                fullWidth
                isInvalid={!!errors.totalPopulationError}
                value={formData.totalPopulation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalPopulation: Number(e.target.value),
                  })
                }
                placeholder="Enter Total Population"
              />

              {errors.totalPopulationError && (
                <EuiText color="danger" size="s">
                  {errors.totalPopulationError}
                </EuiText>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentArea-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Total Area</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                fullWidth
                isInvalid={!!errors.areaError}
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: Number(e.target.value) })
                }
                placeholder="Enter Total Area"
              />
              {errors.areaError && (
                <EuiText color="danger">{errors.areaError}</EuiText>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentDensity-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>Population Density</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                fullWidth
                isInvalid={!!errors.populationDensityError}
                value={formData.populationDensity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    populationDensity: Number(e.target.value),
                  })
                }
                placeholder="Enter Population Density"
              />
              {errors.populationDensityError && (
                <EuiText color="danger">
                  {errors.populationDensityError}
                </EuiText>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentCountry-grp" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText>No. Of Country</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFieldText
                fullWidth
                isInvalid={!!errors.numberOfCountriesError}
                value={formData.numberOfCountries}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfCountries: Number(e.target.value),
                  })
                }
                placeholder="Enter Number Of Country"
              />
              {errors.numberOfCountriesError && (
                <EuiText color="danger">
                  {errors.numberOfCountriesError}
                </EuiText>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup className="continentEdit-btn" justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                color="danger"
                onClick={() => {
                  dispatch(clearSelectedContinent());
                  setFormData(null);
                  navigate("/overview");
                }}
              >
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty color="success" onClick={handleEditContinent}>
                Update
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
