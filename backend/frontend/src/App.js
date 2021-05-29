
import './App.css';
import {BrowserRouter ,Route,Switch,useHistory} from 'react-router-dom'
import React,{useEffect,createContext,useReducer,useContext} from "react"
import {reducer,initialState} from './reducer/useReducer'
import Signup from './components/signup'
import Signin from './components/signin'
import Dashboard from './components/dashboard'

export const UserContext = createContext()
 
// we cannot aceess history in app becoz we wrap all the components in Browser router so we create new component

const Routing = () =>{
  
  const history = useHistory()
  const {state,dispatch}= useContext(UserContext)
  console.log("state",state);
  


    return(<Switch>
  
      <Route exact path="/">
        <Signup />
      </Route>
      <Route path="/signin">
        <Signin/>
        </Route>
        <Route path="/dashboard">
          {localStorage.getItem("user")?<Dashboard/>:"you are not authorize"}
        
        </Route>
        </Switch>
    
      )}
      
    



function App() {
  const [state,dispatch]  = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
