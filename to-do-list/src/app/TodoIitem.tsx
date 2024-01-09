// components/TodoItem.tsx
interface TodoItemProps {
    task: string;
  }
  
  const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
    return <li>{task}</li>;
  };
  
  export default TodoItem;
  