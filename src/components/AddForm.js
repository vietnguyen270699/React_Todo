import { useState } from 'react';

export default function AddForm({ onAdd }) {
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [reminder, setReminder] = useState();

    const onSubmit = (e) => {
        e.preventDefault();

        if(!name) {
            alert('Name is required!');
            return;
        }

        onAdd({name, date, reminder});
        setName('');
        setDate('');
        setReminder(false);
    };

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input
                    type="text"
                    placeholder="Add task"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Date time</label>
                <input
                    type="text"
                    placeholder="Add date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label>Set reminder</label>
                <input
                    type="checkbox"
                    checked={reminder}
                    value={reminder}
                    onChange={e => setReminder(e.currentTarget.checked)}
                />
            </div>

            <input type="submit" value="Save task" className="btn btn-block" />
        </form>
    )
}