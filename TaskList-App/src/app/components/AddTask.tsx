'use client';

import { FaPlus } from "react-icons/fa6"; 
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | string>('');  //it can hold either a Date object or a string.
    // temporarily hold a string (from the input field) before being converted into a Date object.

    const handleSubmitNewToDo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (!newTaskValue.trim()) {
            // If newTaskValue is empty or contains only whitespace, prevent submission
            alert("Unable to Add Task: Please enter a task name.");
            return;
        }

        await addTodo({
            id: uuidv4(),
            text: newTaskValue,
            due: typeof dueDate === 'string' ? new Date(dueDate) : dueDate, // Handle string or Date type
        });

        setNewTaskValue("");
        setDueDate("");
        setModalOpen(false);
        router.refresh();
    };

    return (
    <div>
         <button onClick={() => setModalOpen(true)} className='btn btn-primary w-full'> 
         Add Task <FaPlus className="ml-2" size={18}/>
         </button>
 
         <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}> 
            <form onSubmit={handleSubmitNewToDo}>
                <h3 className = 'font-bold text-lg'>Add New Task</h3>
                <div className="modal-action"> 
                <input 
                value={newTaskValue}
                onChange={e => setNewTaskValue(e.target.value)}
                    type="text" 
                    placeholder="Type here" 
                    className="input input-bordered w-full" 
                />
                <input
                    value={typeof dueDate === 'string' ? dueDate : dueDate.toISOString().substr(0, 10)}
                    onChange={(e) => setDueDate(e.target.value)}
                    type="date"
                    placeholder="Due Date"
                    className="input input-bordered w-full"
                />
                
                <button type="submit" className='btn btn-primary'> SUBMIT</button>

                </div>
            </form>
         </Modal>
    </div>
    );
};

export default AddTask