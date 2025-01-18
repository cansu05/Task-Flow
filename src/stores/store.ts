import { create } from "zustand";
import { Store } from "@/types"; 

export const useStore = create<Store>((set) => ({
  tasks: {
    open: [],
    inProgress: [],
    review: [],
    done: [],
  },

  addTask: (column, task) =>
    set((state) => {
      if (!Array.isArray(state.tasks[column])) {
        console.error(`Invalid column: ${column}`);
        return state;
      }
      return {
        tasks: {
          ...state.tasks,
          [column]: [...state.tasks[column], task],
        },
      };
    }),

  moveTask: (source, destination, taskIndex) => {
    set((state) => {
      const updatedTasks = { ...state.tasks };
      const [movedTask] = updatedTasks[source].splice(taskIndex, 1);
      updatedTasks[destination].push(movedTask);

      return {
        tasks: updatedTasks,
      };
    });
  },
  deleteTask: (column, taskId) =>
    set((state) => {
      if (!Array.isArray(state.tasks[column])) {
        console.error(`Invalid column: ${column}`);
        return state;
      }

      const updatedTasks = {
        ...state.tasks,
        [column]: state.tasks[column].filter((task) => task.id !== taskId),
      };

      return {
        tasks: updatedTasks,
      };
    }),
  editTask: (column, updatedTask) =>
    set((state) => {
    
      if (!Array.isArray(state.tasks[column])) {
        console.error(`Invalid column: ${column}`);
        return state;
      }

      const updatedTasks = {
        ...state.tasks,
        [column]: state.tasks[column].map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      };

      return {
        tasks: updatedTasks,
      };
    }),
}));
