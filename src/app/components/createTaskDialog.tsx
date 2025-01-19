"use client";

import { useStore } from "@/stores/store";
import theme from "@/themes/theme";
import { Task, TaskState } from "@/types";
import { MenuItem, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FC } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

// -----------------------------------------------------------------------------

type CreateTaskDialogProps = {
  open: boolean;
  handleClose: () => void;
  columnStatus: keyof TaskState;
  taskToEdit?: Task;
};

const styles = {
  textField: {
    "& .MuiInputLabel-root": { color: theme.palette.text.primary },
    "& .MuiInputBase-input": { color: theme.palette.text.primary },
    "& .MuiOutlinedInput-root": {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.text.primary,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.text.primary,
      },
    },
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// -----------------------------------------------------------------------------

export const CreateTaskDialog: FC<CreateTaskDialogProps> = ({
  open,
  handleClose,
  columnStatus,
  taskToEdit,
}) => {
  const { addTask, editTask, assignees } = useStore();

  const methods = useForm<Task>({
    defaultValues: taskToEdit
      ? {
          ...taskToEdit,
          createdDate: taskToEdit.createdDate
            ? dayjs(taskToEdit.createdDate)
            : null,
          dueDate: taskToEdit.dueDate ? dayjs(taskToEdit.dueDate) : null,
        }
      : {
          id: "",
          taskTitle: "",
          taskDescription: "",
          storyPoint: 0,
          createdDate: null,
          dueDate: null,
          assignee: [],
        },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid },
  } = methods;

  const formatTaskData = (data: Task): Task => ({
    ...data,
    id: taskToEdit ? taskToEdit.id : uuidv4(),
    createdDate: data.createdDate ? data.createdDate.toString() : "",
    dueDate: data.dueDate ? data.dueDate.toString() : "",
  });

  const onSubmit = (data: Task) => {
    const taskData = formatTaskData(data);
    if (taskToEdit) {
      editTask(columnStatus, taskData);
    } else {
      addTask(columnStatus, taskData);
    }
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <Dialog open={open} fullWidth>
        <DialogTitle>{taskToEdit ? "Edit Task" : "New Task"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 2 }}>
            <TextField
              {...register("taskTitle", { required: true })}
              required
              name="taskTitle"
              label="Title"
              fullWidth
              inputProps={{ maxLength: 50 }}
              sx={styles.textField}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              {...register("taskDescription", { required: true })}
              required
              name="taskDescription"
              label="Description"
              multiline
              rows={6}
              fullWidth
              inputProps={{ maxLength: 400 }}
              sx={styles.textField}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              {...register("storyPoint", {
                valueAsNumber: true,
              })}
              required
              name="storyPoint"
              label="Story point estimate"
              type="number"
              fullWidth
              sx={styles.textField}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <Controller
              name="assignee"
              rules={{ required: "Assignee is required" }}
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Assignee"
                  value={field.value}
                  onChange={(event) => {
                    const { value } = event.target;
                    field.onChange(
                      typeof value === "string" ? value.split(",") : value
                    );
                  }}
                  fullWidth
                  SelectProps={{ multiple: true, MenuProps }}
                  sx={styles.textField}
                  slotProps={{ inputLabel: { shrink: true } }}
                >
                  {assignees.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="createdDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value || null}
                  onChange={(date) => field.onChange(date)}
                  label="Created date"
                  sx={styles.textField}
                />
              )}
            />

            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value || null}
                  onChange={(date) => field.onChange(date)}
                  label="Due date"
                  sx={styles.textField}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
            {taskToEdit ? "Save Changes" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
