
import { Route, Routes } from "react-router-dom";
import './App.css';
import { Calendar } from './Pages/Calendar';
import { Create } from './Pages/Create';
import { Dashboard } from './Pages/Dashboard';
import { Progress } from './Pages/Progress';
import { Sidebar } from './Components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Dashboard />}> </Route>
        <Route path="/progress" element={<Progress />}> </Route>
        <Route path="/calendar" element={<Calendar />}> </Route>
        <Route path="/create" element={<Create />}> </Route>
      </Routes>
      
    </div>
  );
}

export default App;
