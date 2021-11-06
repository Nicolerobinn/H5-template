import * as React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage'


const Routers =  ()=> {
  const element = useRoutes([
    {  path: "/",  element: <Dashboard />
    },
    { path: "team", element: <AboutPage /> }
  ]);

  return element ;
}
const App  =()=>{
  return <Router>
  <Routers/>
</Router>
}
export default App