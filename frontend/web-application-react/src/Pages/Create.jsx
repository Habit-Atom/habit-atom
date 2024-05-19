import React, { useState } from 'react'
import "../Css/Create.css"
import { HabitForm } from "../Components/HabitForm"
import { TaskForm } from "../Components/TaskForm"

export const Create = () => {
    const [toggle, setToggle] = useState(false);
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