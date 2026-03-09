import React, { useState, useEffect } from 'react';
import './styles/theme.css';
import Feature1 from './features/feature-1/index';
import Feature2 from './features/feature-2/index';
import Feature3 from './features/feature-3/index';
import Button from './components/ui/Button';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleTaskCreate = (task: any) => {
    setTasks([...tasks, task]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
  };

  const handleTaskUpdate = (task: any) => {
    const updatedTasks = tasks.map((t: any) => (t.id === task.id ? task : t));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskDelete = (taskId: number) => {
    const updatedTasks = tasks.filter((task: any) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handlePriorityChange = (taskId: number, priority: string) => {
    const updatedTasks = tasks.map((task: any) => (task.id === taskId ? { ...task, priority } : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleCompletedChange = (taskId: number, completed: boolean) => {
    const updatedTasks = tasks.map((task: any) => (task.id === taskId ? { ...task, completed } : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="app">
      <h1>Gestor de Tarefas</h1>
      <Feature1 onTaskCreate={handleTaskCreate} />
      <Feature2 onPriorityChange={handlePriorityChange} />
      <Feature3 onCompletedChange={handleCompletedChange} />
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Prioridade: {task.priority}</p>
            <p>Concluída: {task.completed ? 'Sim' : 'Não'}</p>
            <Button onClick={() => handleTaskDelete(task.id)}>Excluir</Button>
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;