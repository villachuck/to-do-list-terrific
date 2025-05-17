import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./TodoList.css";
import UpdatesPopUp from '../UpdatesPopUp/UpdatesPopUp';

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
    const apiUrl = process.env.REACT_APP_API_URL;

    console.log(apiUrl);


    const getTaskList = async () => {
        try {
            const response = await axios.get<Task[]>(`${apiUrl}/api/toDoList`);
            setTasks(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error('Something went wrong... ', error);
        }
    }

    useEffect(() => {
        getTaskList();
    }, []);

    const createNewtask = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post<Task>(`${apiUrl}/api/toDoList`, {
                task: descriptionTask
            });

            setTasks(prev => [...prev, response.data]);
            setDescriptionTask('');
        }
        catch (error) {
            console.error('Error creating task:', error);
        }
    }

    const setAsDone = async (taskId: string, isActive: boolean) => {

        try {
            await axios.put(`${apiUrl}/api/toDoList/${taskId}`, {
                active: !isActive
            });

            getTaskList();
        }
        catch (error) {
            console.error('Error updating the task:', error);
        }
    }

    const modifyTask = async (modifiedData: Task) => {
        try {
            await axios.put(`${apiUrl}/api/toDoList/${modifiedData._id}`, modifiedData);
            setUpdateTask(null);
            getTaskList();
        } catch (error) {
            console.error("Error updating task:", error);
        }        
    }

    const removeTask = async (taskId: string) => {

        try {
            await axios.delete(`${apiUrl}/api/toDoList/${taskId}`);
            getTaskList();
        }
        catch (error) {
            console.error('Error updating the task:', error);
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
                            <button type='submit' className='create_task'>Create task</button>
                        </form>
                    </div>
                    <div className='all_lists'>
                        <ul>{tasks.map((t, index) => (
                            <li key={index} value={t._id}>
                                <div className={`text ${!t.active ? 'taskDone' : ''}`}>
                                    <input type='radio' checked={selectedId === t._id}
                                    onChange={() => {setSelectedId(prev => (prev === t._id ? null : t._id));}} /> {t.task}
                                </div>
                                {selectedId === t._id && (
                                <div className='actions'>
                                    <div className='action_btn' onClick={() => setAsDone(t._id, t.active)}><img src='/check_icon.png' alt='Icon mark as done' /></div>
                                    <div className='action_btn' onClick={() => {setUpdateTask(t)}}><img src='/update_icon.png' alt='Icon update' /></div>
                                    <div className='action_btn' onClick={() => removeTask(t._id)}><img src='trash_icon.png' alt='Icon delete' /></div>
                                </div>
                                )}
                            </li>
                        ))}                        
                        </ul>
                    </div>
                </div>
            </section>
        </div>
        {updateTask && (
            <UpdatesPopUp allData={updateTask} onClose={() => setUpdateTask(null)} onSave={modifyTask}  />    
        )}            
        </>
    )
}

export default TodoList;