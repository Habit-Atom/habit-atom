import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HabitForm } from "../Components/HabitForm"
import { TaskForm } from "../Components/TaskForm"
import "../Css/Create.css"

export const Create = () => {
    const location = useLocation();
    const initialToggleState = location.state?.toggle ?? false;
    const [toggle, setToggle] = useState(initialToggleState);

    useEffect(() => {
        if (location.state && location.state.toggle !== undefined) {
            setToggle(location.state.toggle);
        }
    }, [location.state]);
    return (
        <main className='create'>
            <div id="create-buttons-container">
                <div className="checkbox-wrapper-22">
                    <label className="switch" htmlFor="checkbox">
                        <input
                            type="checkbox"
                            id="checkbox"
                            checked={toggle}
                            onChange={() => setToggle(!toggle)}
                        />
                        <div className="slider round"></div>
                        <p id="habit-text">Habit</p>
                        <p id="task-text">Task</p>
                    </label>
                </div>
            </div>
            {toggle ? <TaskForm /> : <HabitForm />}
        </main>
    )
}