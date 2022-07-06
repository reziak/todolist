import { Task } from "../App";

import trashSVG from '../assets/trash.svg';

interface TaskItemProps {
  task: Task
  toggleStatus: () => void;
  deleteTask: () => void;
}

export const TaskItem = ({ task, toggleStatus, deleteTask }: TaskItemProps) => {
  return (
    <li key={task.id}>
      <input
        type="radio"
        checked={task.isCompleted}
        onClick={toggleStatus}
      />
      <p>{task.text}</p>
      <button 
        title='Deletar tarefa'
        onClick={deleteTask}
      >
        <img src={trashSVG} />
      </button>
    </li>
  )
}