import {Form, Formik} from 'formik';
import { useTasks } from '../context/TaskProvider';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TaskForm(){

    const { createTask, getTask, updateTask } = useTasks();
    const[task, setTask] = useState({
        title: "",
        description: "",
    });
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadTask = async () => {
            if(params.id) {
                const task = await getTask(params.id);
                console.log(task)
                setTask({
                    title: task.title,
                    description: task.description,
                });
            }
        };
        loadTask();
    },[])

    return(
        <div>

            <Formik
               initialValues={task}
               enableReinitialize={true}
                onSubmit={async(values, actions) => {
                console.log(values);
                
                if(params.id){
                    await updateTask(params.id, values);
                    navigate("/");
                }else{
                    await createTask(values);
                    navigate("/");
                }

                setTask({
                    title: "",
                    description: "",
                });
               }}
            >

                {({handleChange, handleSubmit, values, isSubmitting}) => (
                     <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto">
                        <h1 className="text-xl uppercase text-center">{params.id ? "Edit Task" : "New Task"}</h1>
                     <label className="block">Title </label>
                     <input 
                       type="text" 
                       name="title" 
                       placeholder="Title"
                       className="px-2 py-1 rounded-sm w-full"
                       onChange={handleChange}
                       value={values.title}
                     />
 
                     <label className="block">Description </label>
                     <textarea 
                       name="description" 
                       rows="3" 
                       placeholder="Write a description..." 
                       className="px-2 py-1 rounded-sm w-full"
                       onChange={handleChange}
                       value={values.description}
                     ></textarea>
 
                     <button type="submit" disabled={isSubmitting} className="block bg-slate-500 text-white w-full rounded-md px-2 py-1">
                         {isSubmitting ? "Saving..." : "Save"}
                     </button>
                 </Form>
                )}
            </Formik>
        </div>
    )
}

export default TaskForm;