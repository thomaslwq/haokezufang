import React, { Component, Fragment } from 'react'
//2. 引入需要路由組件
import { HashRouter as Router, Route } from "react-router-dom"
//3. 引入需要顯示的組件
import Home from "./pages/home"
import Info from "./pages/info"
import List from "./pages/list"
import Profile from "./pages/profile"

//1. rcc 新建一個 App 組件
export default class App extends Component {
  render() {
    return (
      <Fragment>
        {/* 
          4. 配置路由信息
        */}
        <Router>
          <Route path="/" exact render={(props) => <Home {...props}></Home>}></Route>
          <Route path="/info" exact render={(props) => <Info {...props}></Info>}></Route>
          <Route path="/list" exact render={(props) => <List {...props}></List>}></Route>
          <Route path="/profile" exact render={(props) => <Profile {...props}></Profile>}></Route>
        </Router>
      </Fragment>
    )
  }
}
