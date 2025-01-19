import { Grid, useTheme } from "@mui/material";
import { useState, useMemo } from "react";
import {CreateTaskDialog} from "./createTaskDialog";
import StatusColumn from "./statusColumn";
import { useStore } from "@/stores/store";
import { getStatusMap } from "@/utils/statusMap";

export default function Board() {
  const { tasks } = useStore();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");

  const statusMap = getStatusMap(theme);

  const handleOpenDialog = (status: string) => {
    setCurrentStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentStatus("");
  };

  const taskColumns = useMemo(() => {
    return statusMap.map((status) => {
      const taskList = tasks[status.name] || [];
      return (
        <Grid item xs={12} sm={6} md={3} key={status.name}>
          <StatusColumn
            status={status}
            taskList={taskList}
            handleOpenDialog={handleOpenDialog}
          />
        </Grid>
      );
    });
  }, [tasks, statusMap]);

  return (
    <Grid container spacing={2}>
      {taskColumns}
      <CreateTaskDialog
        open={open}
        handleClose={handleClose}
        columnStatus={currentStatus}
      />
    </Grid>
  );
}
