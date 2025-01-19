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

// -----------------------------------------------------------------------------

type CreateTaskDialogProps = {
  open: boolean;
  handleClose: () => void;
  columnStatus: keyof TaskState; 
  taskToEdit?: Task;
}

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

// -----------------------------------------------------------------------------

export const CreateTaskDialog: FC<CreateTaskDialogProps> = ({
  open,
  handleClose,
  columnStatus,
  taskToEdit,
}) => {

  const { addTask, editTask } = useStore();

 const methods = useForm<Task>({
   defaultValues: taskToEdit
     ? {
         ...taskToEdit,
         createdDate: taskToEdit.createdDate
           ? new Date(taskToEdit.createdDate).toISOString()
           : "",
         dueDate: taskToEdit.dueDate
           ? new Date(taskToEdit.dueDate).toISOString()
           : "",
       }
     : {
         id: "",
         taskTitle: "",
         taskDescription: "",
         status: columnStatus as keyof TaskState,
         createdDate: "",
         dueDate: "",
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
    createdDate: data.createdDate
      ? new Date(data.createdDate).toISOString()
      : "",
    dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : "",
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
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="createdDate"
              rules={{ required: "Created date is required" }}
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={null}
                  onChange={(date) => field.onChange(date)}
                  label="Created date"
                  sx={styles.textField}
                />
              )}
            />

            <Controller
              name="dueDate"
              rules={{ required: "Due date is required" }}
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={null}
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
