import Task from './Task';

export default function TaskList({ tasks, onDelete, onToggle }) {
    return (
        <>
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={() => onDelete(task.id)}
                    onToggle={() => onToggle(task.id)}
                />
            ))}
        </>
    )
}
