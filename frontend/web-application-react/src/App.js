
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Calendar } from './Pages/Calendar';
import { Create } from './Pages/Create';
import { Dashboard } from './Pages/Dashboard';
import { Progress } from './Pages/Progress';
import { Authentication } from './Pages/Authentication';
import { Sidebar } from './Components/Sidebar';
import { ProtectedRoute } from './Helpers/ProtectedRoute';
import './App.css';

function App() {
  const location = useLocation();
  const shouldShowSidebar = location.pathname !== '/auth';
  return (
    <div className="App">
      {shouldShowSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/progress" element={<ProtectedRoute element={<Progress />} />} />
        <Route path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
        <Route path="/create" element={<ProtectedRoute element={<Create />} />} />
        <Route path="/auth" element={<Authentication />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
