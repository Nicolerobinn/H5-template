import React,{  lazy}from 'react'
import {  useRoutes,RouteObject } from "react-router-dom";
import ROUTER_LIST from './routerList'

const routerToElement =  ():RouteObject[] =>{
  // TODO: 此处没有考虑路由嵌套以及携带参数的情况
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