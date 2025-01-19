"use client";

import {
  Avatar,
  Box,
  Typography,
  useTheme,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import { Task } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStore } from "@/stores/store";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { CreateTaskDialog } from "./createTaskDialog";
import { format } from "date-fns";
import { FC } from "react";

// -----------------------------------------------------------------------

type TaskItemProps = {
  task: Task;
  statusColors: {
    bgColor: string;
    btnColor: string;
    textColor: string;
  } | null;
  currentStatus: string;
};

// -----------------------------------------------------------------------

export const TaskItem: FC<TaskItemProps> = ({
  task,
  statusColors,
  currentStatus,
}) => {
  const { palette } = useTheme();
  const { deleteTask } = useStore();
  const [isEditOpen, setEditOpen] = useState(false);

  const handleDelete = () => {
    deleteTask(currentStatus, task.id);
  };

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          padding: 2,
          backgroundColor: palette.background.default,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          cursor: "grab",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="subtitle1"
            sx={{
              color: statusColors?.textColor,
              fontWeight: "bold",
              wordWrap: "break-word",
              overflow: "hidden",
              maxHeight: "10.5em",
              lineHeight: "1.5em",
            }}
          >
            {task.taskTitle}
          </Typography>
          <Stack direction="row" alignSelf="flex-start">
            <IconButton onClick={handleEdit}>
              <EditIcon sx={{ width: "18px", height: "18px" }} />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon
                sx={{ width: "18px", height: "18px", color: "red" }}
              />
            </IconButton>
          </Stack>
        </Box>

        <Typography
          variant="body1"
          mb={1}
          sx={{
            color: statusColors?.textColor,
            wordWrap: "break-word",
            overflow: "hidden",
            maxHeight: "60.5em",
            lineHeight: "1.5em",
          }}
        >
          {task.taskDescription}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          {task.assignee.map((assignee, index) => (
            <Box key={index} display="flex" alignItems="center" gap={1}>
              <Avatar
                alt={assignee}
                sx={{
                  width: "20px",
                  height: "20px",
                  fontSize: "10px",
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                }}
              >
                {assignee[0].toUpperCase()}{" "}
              </Avatar>
              <Typography variant="caption">{assignee}</Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="caption" sx={{ mt: 2 }}>
          Created: {format(new Date(task.createdDate), "dd/MM/yyyy")} <br />
          Due: {format(new Date(task.dueDate), "dd/MM/yyyy")}
        </Typography>

        {!Number.isNaN(task.storyPoint) && task.storyPoint > 0 && (
          <Chip
            label={`Story Point: ${task.storyPoint}`}
            size="small"
            color="primary"
            sx={{
              mt: 1,
              alignSelf: "end",
              backgroundColor: "primary.light",
              fontSize: "10px",
            }}
          />
        )}
      </Box>

      <CreateTaskDialog
        open={isEditOpen}
        handleClose={handleClose}
        columnStatus={currentStatus}
        taskToEdit={task}
      />
    </>
  );
};
