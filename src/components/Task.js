import { FaTimes } from 'react-icons/fa';

export default function Task({ task, onDelete, onToggle }) {
    return (
        <div
            className={`task ${task.reminder && 'reminder'}`}
            onDoubleClick={onToggle}
        >
            <h3>
                {task.name}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={onDelete}
                />
            </h3>
            <p>{task.date}</p>
        </div>
    );
}