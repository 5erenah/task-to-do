'use client';

import { ITask } from "../../../types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { deleteTodo, editTodo } from "../../../api";
import { useRouter } from "next/navigation";



interface TaskProps {
    task: ITask;
  }
  
  const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const [dateToEdit, setDateToEdit] = useState<Date | string>(
        task.due ? new Date(task.due) : ''
      );      
    // console.log(typeof(task.due));
  
    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      await editTodo({
        id: task.id,
        text: taskToEdit,
        due: dateToEdit
      });
      setOpenModalEdit(false);
      router.refresh();
    };
  
    const handleDeleteTask = async (id: string) => {
      await deleteTodo(id);
      setOpenModalDeleted(false);
      router.refresh();
    };
  
    return (
      <tr key={task.id}>
        <td className='w-full'>{task.text}</td>
        <td className='w-full'>{task.due ? new Date(task.due).toLocaleDateString('en-GB') : 'No due date'}</td>
        <td className='flex gap-5'>
          <FiEdit
            onClick={() => setOpenModalEdit(true)}
            cursor='pointer'
            className='text-blue-500'
            size={25}
          />

        {/* Edit Task */}
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className='font-bold text-lg'>Edit task</h3>
              <div className='modal-action'>
                <input
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full'
                />
                
                <input
                    // value={dateToEdit instanceof Date ? dateToEdit.toLocaleDateString('en-GB'): 'No due date'} 
                    value={dateToEdit instanceof Date ? dateToEdit.toISOString().substr(0, 10) : ''} 
                    // onChange={(e) => setDateToEdit(new Date(e.target.value))} // Convert input value back to 'Date'
                    onChange={(e) => {
                        const newDate = new Date(e.target.value);
                        setDateToEdit(isNaN(newDate.getTime()) ? '' : newDate);
                    }}
                    type="date"
                    placeholder="Due Date"
                    className="input input-bordered w-full"
                />
                
                <button type='submit' className='btn'>
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        
        {/* Delete Task */}
            <FiTrash2
            onClick={() => setOpenModalDeleted(true)}
            cursor='pointer'
            className='text-red-500'
            size={25}
            />
          <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
            <h3 className='text-lg'>
              Are you sure, you want to delete this task?
            </h3>
            <div className='modal-action'>
              <button onClick={() => handleDeleteTask(task.id)} className='btn'>
                Yes
              </button>
            </div>
          </Modal>
        </td>
      </tr>
    );
  };
  
  export default Task;