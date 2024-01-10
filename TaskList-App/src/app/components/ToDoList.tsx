import React from 'react';
import { ITask } from "../../../types/tasks";
import Task from './Task';

interface TodoListProps {
  tasks: ITask[]
}


const ToDoList: React.FC<TodoListProps> = ({ tasks }) => {
  // Clone the tasks array to avoid mutating the original
  const sortedTasks = [...tasks];

  // Sort tasks based on the 'due' date
  sortedTasks.sort((a, b) => {
    // Check if either 'a' or 'b' has no due date
    if (!a.due && !b.due) return 0; // Both have no due date, keep order unchanged
    if (!a.due) return 1; // 'a' has no due date, move it to the end
    if (!b.due) return -1; // 'b' has no due date, move 'a' before 'b'

    // Ensure 'due' is a valid Date object before calling getTime()
    const dueTimeA = a.due instanceof Date ? a.due.getTime() : Infinity;
    const dueTimeB = b.due instanceof Date ? b.due.getTime() : Infinity;

    return dueTimeA - dueTimeB; // Sort by due date
});


  return (
      <div className="overflow-x-auto">
          <table className="table">
              {/* head */}
              <thead>
                  <tr color="fffff">
                      <th>Task</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {sortedTasks.map((task) => (
                      <Task key={task.id} task={task}/>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default ToDoList