import logo from './logo.svg';
import './App.css';
import { Router, Link } from "@reach/router"


import Home  from "./pages/Home"
import SignUp from "./pages/SignUp"
import Dashboard from './pages/Dashboard'
import PrivateRoute from "./PrivateRoute";

import {AuthProvider} from "./contexts/AuthContext"


let Dash = () => <div>Dash</div>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
        <Router>
          <Home path="/" />
          <SignUp path="signup" />
          <Dashboard path="dashboard" />
        </Router>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
