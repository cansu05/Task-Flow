"use client";

import { Grid, useTheme } from "@mui/material";
import { useState } from "react";
import { CreateTaskDialog } from "./createTaskDialog";
import { StatusColumn } from "./statusColumn";
import { useStore } from "@/stores/store";
import { getStatusMap } from "@/utils/statusMap";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "@/types";

// ---------------------------------------------------------

export default function Board() {
  const { tasks, moveTask } = useStore();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const statusMap = getStatusMap(theme);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleOpenDialog = (status: string) => {
    setCurrentStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentStatus("");
  };

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const sourceColumn = active.data.current?.column;
    const sourceIndex = active.data.current?.index;

    if (sourceColumn && sourceIndex !== undefined) {
      const task = tasks[sourceColumn][sourceIndex];
      setActiveTask(task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) {
      console.error("Over is null");
      return;
    }

    const sourceColumn = active.data.current?.column;
    const destinationColumn = over.data.current?.column;

    const sourceIndex = active.data.current?.index;
    const destinationIndex = over.data.current?.index ?? 0;

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
      moveTask(sourceColumn, destinationColumn, sourceIndex, destinationIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors} 
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Grid  container spacing={2}>
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

      <DragOverlay>
        {activeTask ? (
          <div
            style={{
              padding: "10px",
              background: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            {activeTask.taskTitle}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
