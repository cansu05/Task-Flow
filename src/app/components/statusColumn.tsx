"use client";

import { TaskCounter } from "./taskCounter";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Task, StatusColors } from "@/types";
import { FC } from "react";
import { SortableTask } from "./sortableTasks";
import { useDroppable } from "@dnd-kit/core";

// -----------------------------------------------------

type StatusColumnProps = {
  status: {
    colors: StatusColors;
    title: string;
    name: string;
  };
  taskList: Task[];
  handleOpenDialog: (status: string) => void;
};

// -----------------------------------------------------

export const StatusColumn: FC<StatusColumnProps> = ({
  status,
  taskList,
  handleOpenDialog,
}) => {
  const { colors, title, name } = status;

  const { isOver, setNodeRef } = useDroppable({
    id: name,
    data: { column: name },
  });

  return (
    <Stack
      ref={setNodeRef}
      spacing={2}
      sx={{
        padding: 2,
        backgroundColor: isOver ? "rgba(0, 128, 0, 0.1)" : colors.bgColor,
        borderRadius: 3,
        minHeight: "50px",
        maxHeight: "700px",
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: colors.textColor,
          borderRadius: "4px",
        },
      }}
    >
      <TaskCounter count={taskList.length} title={title} colors={colors} />

      {taskList.map((task, index) => (
        <SortableTask
          key={task.id}
          task={task}
          currentStatus={name}
          index={index}
          statusColors={colors}
        />
      ))}

      <Button
        onClick={() => handleOpenDialog(name)}
        startIcon={<AddIcon sx={{ color: colors.textColor }} />}
        sx={{
          color: colors.textColor,
          border: `1px dashed ${colors.textColor}`,
          borderRadius: 3,
          backgroundColor: colors.btnColor,
        }}
      >
        Add new task
      </Button>
    </Stack>
  );
};
