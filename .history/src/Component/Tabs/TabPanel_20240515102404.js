import React from "react";
import { Box } from "@mui/material";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";

interface TabPanelProps {
  className?: string;
  children?: React.ReactNode;
  index: any;
  value: any;
}

export default function TabPanel(props: TabPanelProps) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const classes = useStyles();

  const { className, children, value, index } = props;

  return value === index ? (
    <div
      className={classnames(className, classes.tabPanel)}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  ) : null;
}

const useStyles = makeStyles({
  tabPanel: {
    width: "100%",

    "& > div": {
      padding: 0,
    },
  },
});
