import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";

function TaskCard({task}){

    const { deleteTask, toggleTaskStatus } = useTasks()
    const navigate = useNavigate()

    const handleStatus = async () => {
        await toggleTaskStatus(task.id)
    }

    return (
        <div className="bg-zinc-700 rounded-md p-4 text-white">
        <header className="flex justify-between">
          <h2 className="text-sm font-bold">{task.title}</h2>
          <span>{task.status == 1 ? "ACTIVO" : "PENDIENTE"}</span>
        </header>
        <p>{task.description}</p>
        
        <span>{task.createAt}</span>
        <div className="flex gap-x-1">
          <button className="bg-slate-400 px-2 py-1 text-white" onClick={() => deleteTask(task.id)}>Delete</button>
          <button className="bg-slate-400 px-2 py-1 text-white" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
          <button className="bg-slate-500 px-2 py-1 text-white" onClick={() => handleStatus(task.status)}>Status</button>
        </div>
    </div>
    );
}

export default TaskCard;