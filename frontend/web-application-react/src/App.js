
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Calendar } from './Pages/Calendar';
import { Create } from './Pages/Create';
import { Dashboard } from './Pages/Dashboard';
import { Progress } from './Pages/Progress';
import { Authentication } from './Pages/Authentication';
import { Sidebar } from './Components/Sidebar';
import './App.css';

function App() {
  const location = useLocation();
  const shouldShowSidebar = location.pathname !== '/auth';
  return (
    <div className="App">
      {shouldShowSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Dashboard />}> </Route>
        <Route path="/progress" element={<Progress />}> </Route>
        <Route path="/calendar" element={<Calendar />}> </Route>
        <Route path="/create" element={<Create />}> </Route>
        <Route path="/auth" element={<Authentication />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
