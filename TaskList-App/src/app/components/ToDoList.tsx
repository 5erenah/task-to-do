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
    if (!a.due && !b.due) {
        return 0; // If both tasks have no due date, maintain their relative order
    } else if (!a.due) {
        return 1; // Place tasks with no due date ('a' has no due date) at the bottom
    } else if (!b.due) {
        return -1; // Place tasks with no due date ('b' has no due date) at the bottom
    } else {
        // Compare tasks with valid due dates
        if (a.due < b.due) return -1;
        if (a.due > b.due) return 1;
        return 0;
    }
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