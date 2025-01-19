'use client'

import { Grid, useTheme } from "@mui/material";
import { useState } from "react";
import { CreateTaskDialog } from "./createTaskDialog";
import StatusColumn from "./statusColumn";
import { useStore } from "@/stores/store";
import { getStatusMap } from "@/utils/statusMap";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Board() {
  const { tasks, moveTask } = useStore();
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

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceColumn = active.data.current?.column;
    const destinationColumn = over.data.current?.column;

    if (!sourceColumn || !destinationColumn) {
      console.error("Invalid source or destination column");
      return;
    }

    moveTask(sourceColumn, destinationColumn, active.id);
  };



  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        {statusMap.map((status) => (
          <Grid item xs={12} sm={6} md={3} key={status.name}>
            <SortableContext
              items={tasks[status.name].map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <StatusColumn
                status={status}
                taskList={tasks[status.name]}
                handleOpenDialog={handleOpenDialog}
              />
            </SortableContext>
          </Grid>
        ))}
        <CreateTaskDialog
          open={open}
          handleClose={handleClose}
          columnStatus={currentStatus}
        />
      </Grid>
    </DndContext>
  );
}
