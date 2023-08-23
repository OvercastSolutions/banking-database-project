import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

/*******************************
 * Import Components
 */
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';


/*******************************
 * User Token
 */
function setUserToken(userToken) {
  const token_string = JSON.stringify(userToken);
  console.log(`Setting User Token: ${token_string}`);
  sessionStorage.setItem('user_token', token_string);
}

function getUserToken() {
  const token_string = sessionStorage.getItem('user_token');
  console.log(`Getting User Token: ${token_string}`);
  const userToken = JSON.parse(token_string);
  return userToken?.token;
}

function deleteUserToken() {
  console.log(`Deleting User Token`);
  sessionStorage.removeItem('user_token');
}


/*******************************
 * Login/Logout
 */
function handleLogin(userToken) {
  setUserToken(userToken);
  window.location.reload();
}

function handleLogout() {
  deleteUserToken();
  window.location.reload();
}


/*******************************
 * Main App Component
 */
function App() {
  const userToken = getUserToken();

  return (
    <div className="App">
      {userToken ? (
        <>
          <Logout func={handleLogout} />
          <Dashboard />
        </>
      ) : (
        <Login func={handleLogin} />
      )}
    </div>
  );
}

export default App;
