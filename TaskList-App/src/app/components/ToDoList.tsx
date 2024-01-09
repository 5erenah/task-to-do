import React from 'react';
import { ITask } from "../../../types/tasks";


interface TodoListProps {
  tasks: ITask[]
}

const ToDoList: React.FC<TodoListProps> = ({ tasks }) => {
    return <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr color="fffff">
          <th>Date</th>
          <th>Task</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((tasks) => (
          <tr key={tasks.id}>
          <td>{tasks.text}</td>
          <td>blue</td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>;
}

export default ToDoList