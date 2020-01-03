import React, { Component, Fragment } from 'react'
//2. 引入需要路由組件
import { HashRouter as Router, Route } from "react-router-dom"
//3. 引入需要顯示的組件
import Home from "./pages/home"
import Info from "./pages/info"
import List from "./pages/list"
import Profile from "./pages/profile"
//5. 引入 一個HKLayout 作我們的tabbar
import HKLayout from "./components/HKLaout"

//1. rcc 新建一個 App 組件
export default class App extends Component {
  render() {
    return (
      <Fragment>
        {/* 
          4. 配置路由信息
        */}
        <Router>
          <Route path="/" exact render={() => <HKLayout><Home /></HKLayout>} />
          <Route path="/list" exact render={() => <HKLayout><List /></HKLayout>} />
          <Route path="/info" exact render={() => <HKLayout><Info /></HKLayout>} />
          <Route path="/profile" exact render={() => <HKLayout><Profile /></HKLayout>} />
        </Router>
      </Fragment>
    )
  }
}
