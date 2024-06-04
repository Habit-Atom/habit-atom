import React from 'react';
import "../Css/IconModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faDumbbell, faBook, faSpa, faGlassWater, faOm, faUtensils, faPen, faWalking, faLaptop,
    faBed, faBroom, faSeedling, faPalette, faGuitar, faHandsHelping, faHeart, faLanguage,
    faMusic, faPhone, faCalendarAlt, faMobileAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faDumbbell,faBook,faSpa,faGlassWater,faOm,faUtensils,faPen,faWalking,faLaptop,faBed,faBroom,
    faSeedling,faPalette,faGuitar,faHandsHelping,faHeart,faLanguage,faMusic,faPhone,faCalendarAlt,faMobileAlt);

const icons = [
    'dumbbell','book','spa','glass-water','om','utensils','pen','walking','laptop','bed','broom','seedling','palette',
    'guitar','hands-helping','heart','language','music','phone','calendar-alt','mobile-alt'];

export const IconModal = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <p>Choose an Icon</p>

                </div>
                <div className="modal-body">
                    {icons.map(icon => (
                        <button key={icon} className='icon-modal-button' onClick={() => onSelect(icon)}>
                            <FontAwesomeIcon
                                icon={icon}
                                className="icon-select"
                            />
                        </button>

                    ))}
                </div>
                <button id="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    );
};

