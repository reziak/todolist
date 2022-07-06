import logoSVG from './assets/logo.svg';
import plusSVG from './assets/plus.svg';
import clipboardSVG from './assets/clipboard.svg';

import './global.module.scss';
import styles from './app.module.scss';
import { FormEvent, useEffect, useState } from 'react';
import { TaskItem } from './components/TaskItem';

export type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface Tasks {
  completed: number;
  data: Task[];
}

const initialTasks: Task[] = [
  {
    id: 1,
    text: 'Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.',
    isCompleted: false,
  },
  {
    id: 2,
    text: 'Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Alcoolatra anonimis.',
    isCompleted: false,
  },
  {
    id: 3,
    text: 'Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.',
    isCompleted: true,
  },
  {
    id: 4,
    text: 'Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.',
    isCompleted: true,
  },
]

export const App = () => {
  const [tasks, setTasks] = useState<Tasks>({
    completed: 0,
    data: [],
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (initialTasks) {
      const completedTasks = initialTasks.reduce((acc, task) => {
        return task.isCompleted ? acc + 1 : acc;
      }, 0)
      
      const newTasks: Tasks = {
        completed: completedTasks,
        data: initialTasks,
      }

      setTasks(newTasks);
    }
  }, []);

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();
    const currentTasks = tasks;
    const newData = {
      id: currentTasks.data.length + 1,
      text: newTask,
      isCompleted: false,
    }
    setTasks({
      completed: currentTasks.completed,
      data: [
        ...currentTasks.data,
        newData,
      ],
    });
    setNewTask('');
  }

  const handleDeleteTask = (id: number) => {
    const currentTasks = tasks;
    const updatedTasks = currentTasks.data.filter(t => {
      return id !== t.id;
    });
    
    const updatedCompleted = updatedTasks.reduce((acc, task) => {
      return task.isCompleted ? acc + 1 : acc;
    }, 0)
    
    setTasks({
      completed: updatedCompleted,
      data: updatedTasks,
    });
  }

  const handleToggleTaskStatus = (id: number) => {
    const currentTasks = tasks;

    const updatedTasks = currentTasks.data.map(t => {
      if(id === t.id) {
        t.isCompleted = !t.isCompleted
      }

      return t;
    });

    const updatedCompleted = updatedTasks.reduce((acc, task) => {
      return task.isCompleted ? acc + 1 : acc;
    }, 0)

    setTasks({
      completed: updatedCompleted,
      data: updatedTasks,
    });
  }

  return (
    <>
      <div className={styles.top}>
        <img src={logoSVG} alt="logo ToDo" />
      </div>

      <main className={styles.container}>
        <form onSubmit={handleCreateNewTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa" 
            value={newTask}
            onChange={event => setNewTask(event.target.value)}
          />
          <button type="submit">
            Criar
            <img src={plusSVG} alt="Plus sign icon" />
          </button>
        </form>

        <div className={styles.tasks}>
          <header>
            <div>
              <p>Tarefas criadas</p>
              <span>{tasks.data.length}</span>
            </div>
            <div>
              <p>Concluídas</p>
              <span>
                {tasks.completed > 0 ? (
                  `${tasks.completed} de ${tasks.data.length}`
                ) : tasks.completed}
              </span>
            </div>
          </header>

          {tasks.data.length <= 0 ? (
            <div className={styles.empty}>
              <img src={clipboardSVG} alt="A clipboard icon" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <ul className={styles.taskList}>
              {tasks.data.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  toggleStatus={() => handleToggleTaskStatus(task.id)}
                  deleteTask={() => handleDeleteTask(task.id)}
                />
              ))}
            </ul>
          )}
          
        </div>
      </main>
    </>
  )
}
