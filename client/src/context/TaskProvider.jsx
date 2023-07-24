import { createContext, useContext, useState } from "react";
import { 
    getTasksRequest, 
    deleteTaskRequest, 
    createTaskRequest, 
    getTaskRequest, 
    updateTaskRequest, 
    toggleTaskStatusRequest 
} from "../api/task.api";
import { TaskContext } from "./TaskContext";


export const useTasks = ()  => {
    const context = useContext(TaskContext);
    if(!context){
        throw new Error("useTasks must be used within a TaskContextProvider")
    }
    return context;
};


export const TaskContextProvider = ({children}) => {

    const [tasks, setTasks] = useState([]);

    async function loadTasks() {
        const response = await getTasksRequest()
        setTasks(response.data);
        console.log(response);
    }

    const deleteTask = async (id) => {
        try{
            const response = await deleteTaskRequest(id);
            setTasks(tasks.filter(task => task.id !== id))
        }catch(error){
            console.error(error);
        }
    };

    const createTask = async (task) => {
        try{
            await createTaskRequest(task);
            //setTasks([...tasks, response.data]);
        }catch(error){
            console.log(error)
        }
    };

    const getTask = async (id) => {
        try{
            const response = await getTaskRequest(id)
            return response.data
        }catch(error){
            console.error(error)
        }
    }

    const updateTask = async (id, newFields) => {
        try{
            const response = await updateTaskRequest(id, newFields);
            console.log(response)
        }catch(error){
            console.error(error)
        }
    };

    const toggleTaskStatus = async (id) => {
        try{
            const taskFound = tasks.find((task) => task.id === id);
            await toggleTaskStatusRequest(id, taskFound.status === 0 ? true : false);
            setTasks(
                tasks.map((task) => 
                task.id === id ? { ... task, status: !task.status } : task
              )
            );
        }catch(error){
            console.error(error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loadTasks, deleteTask, createTask, getTask, updateTask, toggleTaskStatus }}>
            {children}
        </TaskContext.Provider>
    );
};