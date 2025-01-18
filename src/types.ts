// type.ts
export type TaskState = {
  open: string[];
  inProgress: string[];
  review: string[];
  done: string[];
};

export type statusColors = {
    bgColor: string;
    btnColor: string;
    textColor: string;
};

export type Store = {
  tasks: TaskState;
  addTask: (column: keyof TaskState, task: string) => void;
  moveTask: (
    source: keyof TaskState,
    destination: keyof TaskState,
    taskIndex: number
  ) => void;
  deleteTask: (column: keyof TaskState, taskId: string) => void;
  editTask: (column: keyof TaskState, updatedTask: Task) => void;
};

export type Id = string;

export type Task = {
  id: Id;
  taskTitle: string;
  taskDescription: string;
  status: "Open" | "In Progress" | "Review" | "Done";
  createdDate: string;
  dueDate: string;
  assignee: string[];
};


export type TaskAssignee = string[];
