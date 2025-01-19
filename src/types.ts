// type.ts

export type TaskState = {
  open: Task[];
  inProgress: Task[];
  review: Task[];
  done: Task[];
  [key: string]: Task[];
};

export type StatusColors = {
  bgColor: string;
  btnColor: string;
  textColor: string;
};

export type Store = {
  tasks: TaskState;
  addTask: (column: keyof TaskState, task: Task) => void;
  moveTask: (
    source: keyof TaskState, 
    destination: keyof TaskState, 
    sourceIndex: number, 
    destinationIndex: number 
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
  assignee: TaskAssignee;
};

export type TaskAssignee = string[];
