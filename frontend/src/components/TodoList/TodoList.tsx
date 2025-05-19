import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./TodoList.css";
import UpdatesPopUp from '../UpdatesPopUp/UpdatesPopUp';
import { ToastContainer, toast } from 'react-toastify';

type Task = {
    _id: string;
    task: string;
    active: boolean;
};

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [descriptionTask, setDescriptionTask] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [updateTask, setUpdateTask] = useState<Task | null>(null);
    const [loaderList, setLoaderList] = useState<boolean>(false);  
    const [loader, setLoader] = useState<boolean>(false);    
    const [loaderTasks, setLoaderTasks] = useState<boolean>(false);
    const [loaderButton, setLoaderButton] = useState<boolean>(false);  
    const apiUrl = process.env.REACT_APP_API_URL;

    const getTaskList = async () => {
        setLoaderList(true);
        try {
            const response = await axios.get<Task[]>(`${apiUrl}/api/toDoList`);
            setTasks(response.data);                                   
        }
        catch (error) {
            console.error('Something went wrong... ', error);
            const id = toast.error("Oops! Something went wrong. Try again later.");
        }
        finally {
            setLoaderList(false);
        }        
    }

    useEffect(() => {
        getTaskList();
    }, []);

    const createNewtask = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoader(true);

        try {
            const response = await axios.post<Task>(`${apiUrl}/api/toDoList`, {
                task: descriptionTask
            });

            setTasks(prev => [...prev, response.data]);
            const id = toast.success("List created successfully!"); 
            setDescriptionTask('');  
        }
        catch (error) {
            console.error('Error creating task:', error);
            const id = toast.error("Oops! Something went wrong. Try again later.");
            
        }
        finally {
            setLoader(false);                      
        }
    }

    const setAsDone = async (taskId: string, isActive: boolean) => {
        setLoaderTasks(true);

        try {
            await axios.put(`${apiUrl}/api/toDoList/${taskId}`, {
                active: !isActive
            });
            getTaskList();
            const id = isActive ? toast.success("Great job! One list completed.") : toast.success("Back to work! The list is active again."); 
        }
        catch (error) {
            console.error('Error updating the task:', error);
            const id = toast.error("Oops! Something went wrong. Try again later.");
        }
        finally {
            setLoaderTasks(false);            
        }
    }

    const modifyTask = async (modifiedData: Task) => {
        setLoaderButton(true);

        try {
            await axios.put(`${apiUrl}/api/toDoList/${modifiedData._id}`, {
                task: modifiedData.task,
                active: modifiedData.active
            });
            const id = toast.success("List updated successfully!");             
        } catch (error) {
            console.error("Error updating task:", error);
            const id = toast.error("Oops! Something went wrong. Try again later.");
        }
        finally {
            setUpdateTask(null);
            getTaskList();
            setLoaderButton(false);            
        }      
    }

    const removeTask = async (taskId: string) => {
        setLoaderTasks(true);

        try {
            await axios.delete(`${apiUrl}/api/toDoList/${taskId}`);
            const id = toast.success("One less thing! List deleted."); 
            getTaskList();            
        }
        catch (error) {
            console.error('Error updating the task:', error);
            const id = toast.error("Oops! Something went wrong. Try again later.");
        }
        finally {
            setLoaderTasks(false);            
        }
    }

    return (
        <>
        <div className='todolist_container'>
            <section className='todolist_section'>
                <div className='todolist_body'>
                    <div className='new_task'>
                        <h2>To-Do List</h2>
                        <form onSubmit={createNewtask}>
                            <textarea name='newTask' rows={4} placeholder='Add your task' 
                            value={descriptionTask} onChange={e => setDescriptionTask(e.target.value)} />
                            <button type='submit' className={loader ? 'create_task_loading' : 'create_task'} disabled={loader}>
                                {loader ? ( 
                                    <img src='/loader_white.gif' alt='loading' />
                                ):
                                ('Create task')}
                            </button>
                        </form>
                    </div>
                    <div className='all_lists'>
                        {loaderList ? (
                           <img src='/loader_white.gif' alt='loading' className='principal_loader' />
                        ): tasks.length === 0 ? (
                            <p className='welcome_msg'>Start fresh! Create your first to-do list.</p>
                        )
                        :(
                        <ul>{tasks.map((t, index) => (
                            <li key={index} value={t._id}>
                                <div className={`text ${!t.active ? 'taskDone' : ''}`}>
                                    <input type='radio' checked={selectedId === t._id}
                                    onChange={() => {setSelectedId(prev => (prev === t._id ? null : t._id));}} /> {t.task}
                                </div>
                                {selectedId === t._id && (
                                <div className='actions'>
                                    {
                                        loaderTasks ? (
                                            <div className='rounded-background'>                                            
                                                <img src='/loader_white.gif' alt='loading' />
                                            </div>
                                        ):(
                                            <>
                                                <div className='action_btn' onClick={() => setAsDone(t._id, t.active)}><img src='/check_icon.png' alt='Icon mark as done' /></div>
                                                <div className='action_btn' onClick={() => {setUpdateTask(t)}}><img src='/update_icon.png' alt='Icon update' /></div>
                                                <div className='action_btn' onClick={() => removeTask(t._id)}><img src='trash_icon.png' alt='Icon delete' /></div>
                                            </>
                                        )
                                    }
                                </div>
                                )}
                            </li>
                        ))}                        
                        </ul>
                        )}
                    </div>
                </div>
            </section>
        </div>
        {updateTask && (
            <UpdatesPopUp 
            allData={updateTask} 
            onClose={() => setUpdateTask(null)} 
            onSave={modifyTask}
            onLoad={loaderButton} 
        />    
        )}
        <ToastContainer
            position="top-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick={true}
        />            
        </>
    )
}

export default TodoList;