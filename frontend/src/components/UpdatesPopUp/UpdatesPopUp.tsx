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
}

const UpdatesPopUp: React.FC<UpdateProps> = ({ allData, onClose, onSave }) => {
    const [newText, setNewText] = useState(allData.task);

    const handleSubmit = () => {
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
                        <textarea rows={4} value={newText} onChange={(e) => setNewText(e.target.value)} />
                        <button type="submit" className='create_task' onClick={handleSubmit}>Update</button>
                    </form>                
                </div>   
            </div>         
        </div>
    )
}

export default UpdatesPopUp;