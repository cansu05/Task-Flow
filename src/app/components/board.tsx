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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Board() {
  const { tasks, moveTask } = useStore();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");

  const statusMap = getStatusMap(theme);

  console.log(tasks)

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

    console.log("Active Data:", active.data.current);
    if (!over) {
      console.error("Over is null");
      return;
    }

    console.log("Over Data:", over.data.current);

    const sourceColumn = active.data.current?.column;
    const destinationColumn = over.data.current?.column;

    const sourceIndex = active.data.current?.index;
    const destinationIndex = over.data.current?.index;

    console.log("Source Column:", sourceColumn);
    console.log("Destination Column:", destinationColumn);
    console.log("Source Index:", sourceIndex);
    console.log("Destination Index:", destinationIndex);

    if (!sourceColumn || !destinationColumn) {
      console.error("Invalid source or destination column");
      return;
    }

    if (sourceIndex === undefined || destinationIndex === undefined) {
      console.error("Source or destination index is undefined");
      return;
    }

    if (sourceColumn === destinationColumn) {
      moveTask(sourceColumn, sourceColumn, sourceIndex, destinationIndex);
    } else {
      moveTask(sourceColumn, destinationColumn, sourceIndex, 0); // destinationIndex olarak 0
    }
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
