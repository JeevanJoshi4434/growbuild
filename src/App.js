import React from "react"
import Router from "./Router"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import axios from "axios"
import { useEffect } from "react"
import Cookies from 'js-cookie';
const App = props => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(`https://growbuild-jg.onrender.com/api/all/project`)
        if (res.status !== 200 && res.status !== 304) {
          if (window.location.pathname.slice(0, 12) !== '/pages/login') {
            let redirectPath = `${window.location.pathname}${window.location.search}`;
            let route = `/pages/login?redirect=${redirectPath}`;

            // Use the History API to navigate without automatic encoding
            window.history.pushState(null, null, route);

            // Trigger a popstate event to ensure proper behavior (optional)
            const popstateEvent = new PopStateEvent('popstate');
            dispatchEvent(popstateEvent);
            // window.location.pathname = `/pages/login?${route}`;
          }
        }

      } catch (error) {
        // console.error('Error while checking token:', error);
        if (error.response.status !== 500 && error.response.status !== 304) {
          if (window.location.pathname.slice(0, 12) !== '/pages/login') {
            let redirectPath = `${window.location.pathname}${window.location.search}`;
            let route = `/pages/login?redirect=${redirectPath}`;

            // Use the History API to navigate without automatic encoding
            window.history.pushState(null, null, route);

            // Trigger a popstate event to ensure proper behavior (optional)
            const popstateEvent = new PopStateEvent('popstate');
            dispatchEvent(popstateEvent);
            // window.location.pathname = `/pages/login?${route}`;
          }
        }
      }
    };

    checkToken();
  }, [window.location.pathname]);

  // const check = async()=>{
  //   const res = await axios.get(`${process.env.REACT_APP_PORT}/api/all/unit`);
  //   if(res.status !== 200){
  //     const redirectToRoute = (route) => {
  //       window.location.pathname = route;
  //     };
  //     redirectToRoute('/pages/login');
  //   }
  // }
  // useEffect(() => {


  //   check();
  // }, [])

  return <Router />
}

export default App
