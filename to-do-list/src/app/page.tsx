// import Image from 'next/image'
// import TaskAdder from './TaskAdder'; 

// function App() {
//   return (
//     <main>
//       <div>
//         <TaskAdder />
//       </div>
//     </main>
    
//   );
// }

// export default App;

// import React from 'react';
// import TailwindTest from  './TailwindTest';
// import TaskAdder from  '.';


// const HomePage: React.FC = () => {
//   return (
//     <div>
//       <TailwindTest />
//       <TaskAdder />
//     </div>
//   );
// };

// export default HomePage;


import TodoList from './Todolist';

const Home = () => {
  return (
    <div>
      <h1>My Todo List</h1>
      <TodoList />
    </div>
  );
};

export default Home;
