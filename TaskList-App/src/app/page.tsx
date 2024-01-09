import { getAllTodos } from '../../api';
import AddTask from  './components/AddTask';
import ToDoList from './components/ToDoList';

export default async function HomePage() {
  const tasks = await getAllTodos();
  console.log(tasks);

  return (
    <main className="max-w-4xl mx-auto">
      <div text-center my-5 flex-col gap-4>
        <h1 className="text-center underline">My Todo List</h1>
        <AddTask />
      </div>
      <ToDoList tasks={tasks} />
     </main>
  );
};



