import React, { useState } from "react";
import { useGetContinentQuery } from "../../Redux/services/continentServices";
import {setSelectedContinent} from "../../Redux/slices/continentSlice"
import { ComponentTab } from "../../sharedComponent/componentTab";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Criteria,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiButton,
  EuiButtonEmpty,
  EuiConfirmModal,
  EuiFieldSearch,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiIcon,
  EuiPopover,
  EuiTitle,
} from "@elastic/eui";

export interface Continent {
  _id: string;
  continentName: string;
  totalPopulation: number;
  area: number;
  populationDensity: number;
  numberOfCountries: number;
}

export const ContinentDetails: React.FC = () => {
  const { data: continentData, isError, isLoading } = useGetContinentQuery();

  const dispatch= useDispatch();

  //For Edit page
  const navigate = useNavigate();
  

  //Pop Over
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [isPopOverOpenId, setIsPopOverOpenId] = useState<string | null>(null);

  //for Search Field
  const [isSearchFieldClearable, setIsSearchFieldClearable] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  //for Flyout
  const [isEditFlyoutVisible, setIsEditFlyoutVisible] = useState(false);
  // const [isDeleteFlyoutVisible, setIsDeleteFlyoutVisible] = useState(false);

  //For Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showModal = () => setIsDeleteModalVisible(true);
  const closeModal = () => setIsDeleteModalVisible(false);

  //Table
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  //Flyout
  let editFlyout;
  const closeEditFlyout = () => setIsEditFlyoutVisible(false);
  // const closeDeleteFlyout = () => setIsDeleteFlyoutVisible(false);

  if (isEditFlyoutVisible) {
    editFlyout = (
      <EuiFlyout
        ownFocus
        size="s"
        onClose={() => setIsEditFlyoutVisible(false)}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>A typical flyout</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <table>
            <tr>
              <td>Name</td>
              <td>
                <EuiFieldText />
              </td>
            </tr>
            <tr>
              <td>Population</td>
              <td>
                <EuiFieldText />
              </td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                <EuiFieldText />
              </td>
            </tr>
            <tr>
              <td>Density</td>
              <td>
                <EuiFieldText />
              </td>
            </tr>
            <tr>
              <td>No. Of Countries</td>
              <td>
                <EuiFieldText />
              </td>
            </tr>
          </table>
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                iconType="cross"
                onClick={closeEditFlyout}
                flush="left"
              >
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={closeEditFlyout} fill>
                Update
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }

  // let deleteFlyout;

  // if (isDeleteFlyoutVisible) {
  //   deleteFlyout = (
  //     <EuiFlyout
  //       ownFocus
  //       size="s"
  //       onClose={() => setIsDeleteFlyoutVisible(false)}
  //     >
  //       <EuiFlyoutHeader hasBorder>
  //         <EuiTitle size="m">
  //           <h2>A typical flyout</h2>
  //         </EuiTitle>
  //       </EuiFlyoutHeader>
  //       <EuiFlyoutBody>
  //         <EuiText>
  //           <p>
  //             For consistency across the many flyouts, please utilize the
  //             following code for implementing the flyout with a header.
  //           </p>
  //         </EuiText>
  //       </EuiFlyoutBody>
  //       <EuiFlyoutFooter>
  //         <EuiFlexGroup justifyContent="spaceBetween">
  //           <EuiFlexItem grow={false}>
  //             <EuiButtonEmpty
  //               iconType="cross"
  //               onClick={closeDeleteFlyout}
  //               flush="left"
  //             >
  //               Close
  //             </EuiButtonEmpty>
  //           </EuiFlexItem>
  //           <EuiFlexItem grow={false}>
  //             <EuiButton onClick={closeDeleteFlyout} fill>
  //               Save
  //             </EuiButton>
  //           </EuiFlexItem>
  //         </EuiFlexGroup>
  //       </EuiFlyoutFooter>
  //     </EuiFlyout>
  //   );
  // }

  //For Table

  const continentOnTableChange = ({ page }: Criteria<Continent>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
  };

  // haandling pagination of data

  const findContinents = (
    continentData: Continent[],
    pageIndex: number,
    pageSize: number
  ) => {
    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = continentData;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = continentData.slice(
        startIndex,
        Math.min(startIndex + pageSize, continentData.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: continentData.length,
    };
  };

  const { pageOfItems, totalItemCount } = findContinents(
    continentData ?? [],
    pageIndex,
    pageSize
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 0],
  };

  const column: Array<EuiBasicTableColumn<Continent>> = [
    {
      field: "continentName",
      name: "Continent Name",
    },
    {
      field: "totalPopulation",
      name: "Population",
    },
    {
      field: "area",
      name: "Area",
    },
    {
      field: "populationDensity",
      name: "Population Density",
    },
    {
      field: "numberOfCountries",
      name: "No. Of Countries",
    },
    {
      name: "Action",
      render: (item: Continent) => {
        const isOpen = isPopOverOpenId === item._id;

        const actionIconOnClick = () => {
          setIsPopOverOpenId(isOpen ? null : item._id);
        };

        const closePopOver = () => {
          setIsPopOverOpenId(null);
        };

        const button = (
          <EuiIcon type="boxesHorizontal" onClick={actionIconOnClick} />
        );

        return (
          <EuiPopover
            button={button}
            isOpen={isOpen}
            closePopover={closePopOver}
          >
            <EuiFlexGroup direction="column">
              <EuiFlexItem>
                <EuiButtonEmpty
                  onClick={() => {
                    closePopOver();
                    
                    dispatch(setSelectedContinent(item))
                    navigate("/edit-component");

                  }}
                >
                  Edit
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButtonEmpty
                  onClick={() => {
                    closePopOver();
                    showModal();
                  }}
                >
                  Delete
                </EuiButtonEmpty>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPopover>
        );
      },
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;
  if (!continentData) return <p>No data found.</p>;
  return (
    <>
    <EuiFlexGroup direction="column">
      <EuiFlexGroup>
        <EuiFlexItem>
          <ComponentTab/>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFieldSearch
            placeholder="Search Continent"
            value={searchValue}
            onChange={(e) => onSearchChange(e)}
            isClearable={isSearchFieldClearable}
            fullWidth={true}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <div>
          <EuiButton>Add</EuiButton>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiBasicTable
          items={pageOfItems}
          columns={column}
          onChange={continentOnTableChange}
          pagination={pagination}
        />
      </EuiFlexGroup>
      </EuiFlexGroup>
      {editFlyout}
      {isDeleteModalVisible && (
        <EuiConfirmModal
          style={{ width: 600 }}
          title="Update subscription to Platinum?"
          onCancel={closeModal}
          onConfirm={closeModal}
          cancelButtonText="Cancel"
          confirmButtonText="Update subscription"
          defaultFocusedButton="confirm"
        >
          <p>
            Your subscription and benefits increase immediately. If you change
            to a lower subscription later, it will not take affect until the
            next billing cycle.
          </p>
        </EuiConfirmModal>
      )}
    </>
  );
};
