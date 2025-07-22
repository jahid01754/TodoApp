"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { MdDeleteForever } from "react-icons/md";


export default function TodoApp(){

    const [inputField, setInputField] = useState("");
    const [addTask, setAddTask] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleTask = () => {
        if(inputField.trim() === ""){
            setErrorMessage("Please Enter a Task");
            return;
        }

        const newTask = {
            id: crypto.randomUUID(),
            text: inputField,
            complete: false,
        };

        setAddTask((prevTask) => [...prevTask, newTask]);
        setInputField("");
        setErrorMessage("");
        

    };

    const handleClear = () => {
        setInputField("");
        setErrorMessage("")
    };

    const handleToggleComplete = (id) => {
        const updateTask = addTask.map((task) => (
            task.id === id ? {...task, complete: !task.complete} : task
        ));

        setAddTask(updateTask);
    };

    const handleDelete = (id) => {
        const filteredTask = addTask.filter((task) => (
            task.id !== id
        ));
        setAddTask(filteredTask);
    };

    return(
        <>
            <div className="flex items-center justify-center mt-10">
                <div className="w-full max-w-xl h-[40rem] border border-gray-200 rounded-xl shadow-xl p-6 gap-8">
                    <div className="flex flex-col items-center gap-4 w-full">
                        <input
                            value={inputField}
                            onChange={(e) => setInputField(e.target.value)}
                            className="w-full h-10 border-none outline-none bg-gray-200 px-4 rounded-lg"
                            placeholder="Add a task..."
                        />

                        
                        <div className="flex w-full gap-2">
                            <button 
                                className="flex-1 bg-green-400 rounded-md py-2 hover:bg-green-500 active:shadow-md transition duration-200"
                                onClick={handleTask}    
                            >
                                Add Task
                            </button>
                            <button 
                                className="flex-1 bg-red-400 rounded-md py-2 hover:bg-red-500 active:shadow-md transition duration-200"
                                onClick={handleClear}
                            >
                                Clear
                            </button>
                        </div>

                        {/* error message */}
                        {
                             
                            <p className="text-red-400 ">{errorMessage}</p>
                        }
                    </div>
                    <div className="flex-1 overflow-y-auto w-full mt-6">
                        <p className="font-semibold text-lg text-center">
                            Today's Task
                        </p>
                        <ul className="space-y-2">
                            {
                                addTask.map((task) => (
                                    <li 
                                        key={task.id}
                                        className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md"
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked = {task.complete}
                                                className=""
                                                onChange={() => handleToggleComplete(task.id)}
                                            />

                                            <span className={`${task.complete ? "line-through text-gray-500" : ""}`}>
                                                {task.text}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            <MdDeleteForever className="text-red-500 text-2xl"/>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}