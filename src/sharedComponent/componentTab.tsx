import { EuiTabbedContent, EuiTabbedContentTab } from "@elastic/eui";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ComponentTab: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: EuiTabbedContentTab[] = [
    {
      id: "dashboard--id",
      name: "Dashboard",
      content: <></>,
    },
    {
      id: "overview--id",
      name: "Overview",
      content: (
        <>
        </>
      ),
    },
  ];

  const selectedTab = location.pathname === "/overview" ? tabs[1] : tabs[0];

  return (
    <>
      <div className="tab-component">
        <EuiTabbedContent
          tabs={tabs}
          selectedTab={selectedTab}
          onTabClick={(tab) => {
            if (tab.id === "dashboard--id") navigate("/dashboard");
            else if (tab.id === "overview--id") navigate("/overview");
          }}
          autoFocus="initial"
        />
      </div>
    </>
  );
};
