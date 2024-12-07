import React from "react";
import './Modal.css';

function LoginPromptModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Authentication Required</h2>
                <p>You need to log in or sign up to perform this action.</p>
                <div className="modal-buttons">
                    <button className="btn btn-close" onClick={() => onClose("close")}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPromptModal;
