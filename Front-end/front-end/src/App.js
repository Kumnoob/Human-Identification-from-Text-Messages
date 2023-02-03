import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import OrganizerPage from "./components/OrganizerPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/search" element={<SearchPage/>}/>
          <Route exact path="/organizer" element={<OrganizerPage/>}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
    </Router>
  );
}

export default App;
