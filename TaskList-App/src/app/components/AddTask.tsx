'use client';

import { FaPlus } from "react-icons/fa6"; 

const AddTask = () => {
    return <div className="w-full">
        <div my-5 flex-col gap-4>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
         <button className="btn btn-primary"> 
         Add Task <FaPlus className="ml-2" size={18}/>
         </button>
        </div>
    </div>;
}

export default AddTask