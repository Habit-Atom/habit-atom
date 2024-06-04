import React from 'react'
import { NavLink } from "react-router-dom"
import '../Css/Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faChartSimple,faCalendarCheck, faPlus} from '@fortawesome/free-solid-svg-icons'

export const Sidebar = () => {
    
    return (
        <aside id='sidebar'>
                <div id="nav-bar-buttons-container">
                    <NavLink to="/" className="page-button">
                        <FontAwesomeIcon icon={faTableColumns} size="xl"/>
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink to="/progress" className="page-button">
                        <FontAwesomeIcon icon={faChartSimple} size="xl"/>
                        <p>Progress</p>
                    </NavLink>
                      

                    <NavLink to="/calendar" className="page-button">
                        <FontAwesomeIcon icon={faCalendarCheck} size="xl"/>
                        <p>Calendar</p>
                    </NavLink>

                    <NavLink to="/create" className="page-button">
                        <FontAwesomeIcon icon={faPlus} size="xl"/>
                        <p>Create</p>
                    </NavLink>


                </div>

            <div id="logo-container">
                <img src="/logo2.png" alt="HabitAtom" />
            </div>

        </aside>
            
    )
}