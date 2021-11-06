import React,{  lazy}from 'react'
import {  useRoutes,RouteObject } from "react-router-dom";
import ROUTER_LIST from './routerList'

const routerToElement =  ():RouteObject[] =>{
  return ROUTER_LIST.map((e):RouteObject=>{
    const Element = lazy(() => import(`pages/${e.src}`)) 
    return {
      path:e.path,
      element:<Element/>
    }
  })
}
const Router =  ()=>  useRoutes(routerToElement()) 
export default Router