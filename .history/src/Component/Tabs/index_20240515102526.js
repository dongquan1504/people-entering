import { makeStyles, styled } from "@mui/styles";
import classnames from "classnames";
import queryString from "query-string";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Tab, Tabs, Theme } from "@mui/material";

import SkeletonWrapper from "components/core/SkeletonWrapper";

import TabPanel from "./TabPanel";

const FullWidthBox = styled(Box)({
  width: "100%",
});

export default function BasicTabs({
  sx,
  tabSx,
  className,
  queryKey = "tab",
  noUsingQueryKey = false,
  containerDisabled = false,
  loading = false,
  wrapped = false,
  defaultTab,
  tabItems,
  tabPanels,
}) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const classes = useStyles();

  const navigate = useNavigate();

  const parsedQuery = queryString.parse(window.location.search);

  const queryValue = parsedQuery[queryKey] ?? "";

  const [selectedTab, setSelectedTab] = useState(defaultTab);

  const handleChangeTabSearch = (value) => {
    if (noUsingQueryKey) return;

    const queryObj = { [queryKey]: value };

    const stringified = queryString.stringify(queryObj);

    navigate(
      {
        search: `?${stringified}`,
      },
      {
        replace: true,
      },
    );
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    handleChangeTabSearch(newValue);
  };

  useEffect(() => {
    if (queryValue || noUsingQueryKey) return;

    setSelectedTab(queryValue);
    handleChangeTabSearch(selectedTab);
  }, [selectedTab]);

  useEffect(() => {
    if (!queryValue || noUsingQueryKey) return;

    setSelectedTab(queryValue);
    handleChangeTabSearch(queryValue);
  }, [queryValue]);

  const a11yProps = (index) => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  });

  return (
    <FullWidthBox sx={sx} className={classnames(classes.root, className)}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "#fff", ...tabSx }}>
        {containerDisabled ? (
          <Tabs
            // eslint-disable-next-line jsx-a11y/aria-role
            role="tabs"
            aria-label="basic tabs"
            scrollButtons="auto"
            allowScrollButtonsMobile
            variant="scrollable"
            data-cy="tab-list"
            value={selectedTab || tabPanels[0]?.id}
            onChange={handleChange}
            className={classes.tab}
          >
            {tabItems?.map((item, index) => (
              <Tab
                key={tabPanels[index]?.id}
                sx={{
                  textTransform: "capitalize",
                  textAlign: "center",
                  fontSize: "12px",
                  minWidth: "150px",
                }}
                wrapped={wrapped}
                label={<SkeletonWrapper loading={loading}>{item}</SkeletonWrapper>}
                value={tabPanels[index]?.id}
                data-cy={item.split(" ").join("")}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...a11yProps(tabPanels[index]?.id)}
              />
            ))}
          </Tabs>
        ) : (
          <Box
            sx={{
              maxWidth: "100%",
              "& button.MuiTab-wrapped": {
                width: 100,
                "& > div": {
                  height: "initial",
                },
              },
            }}
          >
            <Tabs
              // eslint-disable-next-line jsx-a11y/aria-role
              role="tabs"
              aria-label="basic tabs"
              scrollButtons="auto"
              allowScrollButtonsMobile
              variant="scrollable"
              data-cy="tab-list"
              value={selectedTab}
              onChange={handleChange}
              className={classes.tab}
            >
              {tabItems?.map((item, index) => (
                <Tab
                  key={tabPanels[index]?.id}
                  sx={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    fontSize: "12px",
                    minWidth: "150px",
                  }}
                  wrapped={wrapped}
                  label={<SkeletonWrapper loading={loading}>{item}</SkeletonWrapper>}
                  value={tabPanels[index]?.id}
                  data-cy={item.split(" ").join("")}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...a11yProps(tabPanels[index]?.id)}
                />
              ))}
            </Tabs>
          </Box>
        )}
      </Box>

      {tabPanels?.map((panel) => (
        <TabPanel key={panel?.id} index={panel?.id} value={selectedTab}>
          {panel?.component}
        </TabPanel>
      ))}
    </FullWidthBox>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  tab: {
    padding: "0 !important",
    "& button": {
      width: "auto",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
