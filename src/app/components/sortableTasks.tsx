"use client";

import { TaskItem } from "./taskItem";
import { Task } from "@/types";
import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableTaskProps = {
  task: Task;
  currentStatus: string;
  index: number;
  statusColors: {
    bgColor: string;
    btnColor: string;
    textColor: string;
  } | null;
};

export const SortableTask: FC<SortableTaskProps> = ({
  task,
  currentStatus,
  index,
  statusColors,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: { column: currentStatus, index },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItem
        task={task}
        currentStatus={currentStatus}
        statusColors={statusColors}
      />
    </div>
  );
};
