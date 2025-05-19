import React, { useState } from "react";
import "./UpdatesPopUp.css";

type Task = {
    _id: string;
    task: string;
    active: boolean;
}

type UpdateProps = {
    allData: Task;
    onClose: () => void;
    onSave: (modifiedData: Task) => void;
    onLoad: boolean
}

const UpdatesPopUp: React.FC<UpdateProps> = ({ allData, onClose, onSave, onLoad }) => {
    const [newText, setNewText] = useState(allData.task);    
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...allData, task: newText });
    };    

    return(
        <div className="popup_container">
            <div className="popup_section">
                <div className="popup_body">
                    <div className="close-popup" onClick={onClose}>
                        <img src="/cancel_icon_x.png" alt="Close icon" />
                    </div>
                    <h2>Update ToDo-List</h2>
                    <form>
                        <textarea rows={4} value={newText} onChange={handleChange} />
                        <button type="submit" className={onLoad ? 'create_task_loading' : 'create_task'} 
                        onClick={handleSubmit}
                        disabled={onLoad}>
                            {onLoad ? ( 
                                <img src='/loader_white.gif' alt='loading' />
                            ):
                            ('Update task')}
                        </button>
                    </form>                
                </div>   
            </div>         
        </div>
    )
}

export default UpdatesPopUp;