import React from "react";
import './ConfirmPopUp.css';

type DeleteProps = {
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmPopUp: React.FC<DeleteProps> = ({ onClose, onConfirm }) => {

    return(
        <div className="confirmation_popup">
            <div className="confirmation_popup_section">
                <div className="confirmation_popup_body">
                    <div className="close-popup" onClick={onClose}>
                        <img src="/cancel_icon_x.png" alt="Close icon" />
                    </div>
                    <h2>Are you sure?</h2>
                    <p>This action will remove the list.</p>
                    <div className="confirmation_popup_buttons">
                        <button type="button" className="cancel_delete_task" onClick={onClose}>Cancel</button>
                        <button type="button" className={'create_task'} onClick={onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPopUp;