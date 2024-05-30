import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Css/LogoutButton.css"
import { setAuthHeader } from '../Helpers/axios_helper';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    setAuthHeader("")
    navigate('/auth');
  };

  return (
    <button id='logout-button' onClick={handleLogOut}>
      Log Out
    </button>
  );
};