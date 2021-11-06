import React from 'react'
import {  useRoutes } from "react-router-dom";
import ROUTER_LIST from './routerList'
import Dashboard from '../pages/Dashboard';
import AboutPage from '../pages/AboutPage'

// TODO: 增加导入路由脚本 使用 ROUTER_LIST 动态导入路由 简化导入模式
const routerToElement =  ()=>{
   return [
    {  path: "/",  element: <Dashboard /> },
    { path: "team", element: <AboutPage /> }
  ]
}
const Router =  ()=>  useRoutes(routerToElement()) 
export default Router