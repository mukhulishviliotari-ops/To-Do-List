import { useState } from 'react';

interface TaskItem {
  id: number;
  text: string;
  isCompleted: boolean;
  isDeleting?: boolean; 
}

function Content() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, text: "Morning workout", isCompleted: false },
    { id: 2, text: "Read for 20 minutes", isCompleted: false },
    { id: 3, text: "Review pull requests", isCompleted: true },
    { id: 4, text: "Fix project layout bugs", isCompleted: false },
    { id: 5, text: "Call the bank", isCompleted: false }
  ]);

  const createNewTask = () => {

    if (tasks.length >= 10) {
      return;
    }

    const newTask: TaskItem = {
      id: Date.now(),
      text: "",
      isCompleted: false
    };
    setTasks([newTask, ...tasks]); 
  };

  const updateTaskText = (id: number, text: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === id ? { ...task, isDeleting: true } : task)
    );

    setTimeout(() => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }, 400);
  };

  return (
    <div className="Tasks">
      <div className="HeaderControls">
        <h1 className="HeaderOfTheTasks">Tasks</h1>
        <button className="newTask" onClick={createNewTask}>+ Add Task</button>
      </div>

      <div className="TasksList">
        {tasks.map((task) => (
          <div 
            className={`Container ${task.isDeleting ? 'pencil-erase' : ''}`} 
            key={task.id}
          >
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={task.isCompleted}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            
            <input 
              type="text" 
              placeholder="Write a task..." 
              className="Task"
              value={task.text}
              onChange={(e) => updateTaskText(task.id, e.target.value)}
            />

            <button className="deleteBtn" onClick={() => deleteTask(task.id)} title="Delete Task">
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;