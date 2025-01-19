import { Theme } from "@mui/material/styles";

export const getStatusMap = (theme: Theme) => [
  {
    name: "open",
    title: "Open",
    colors: {
      bgColor: theme.palette.info.main,
      btnColor: theme.palette.info.light,
      textColor: theme.palette.info.dark,
    },
  },
  {
    name: "inProgress",
    title: "In Progress",
    colors: {
      bgColor: theme.palette.warning.main,
      btnColor: theme.palette.warning.light,
      textColor: theme.palette.warning.dark,
    },
  },
  {
    name: "review",
    title: "Review",
    colors: {
      bgColor: theme.palette.error.main,
      btnColor: theme.palette.error.light,
      textColor: theme.palette.error.dark,
    },
  },
  {
    name: "done",
    title: "Done",
    colors: {
      bgColor: theme.palette.success.main,
      btnColor: theme.palette.success.light,
      textColor: theme.palette.success.dark,
    },
  },
];
