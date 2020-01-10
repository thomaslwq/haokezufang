import React, { Component, Fragment } from 'react'
//2. 引入需要路由組件
import { BrowserRouter as Router, Route } from "react-router-dom"
//3. 引入需要顯示的組件
import Home from "./pages/home"
import Info from "./pages/info"
import List from "./pages/list"
import Profile from "./pages/profile"
import CityList from "./pages/CityList"
import BMap from "./pages/BMap"
import Test from "./pages/Test"
//5. 引入 一個HKLayout 作我們的tabbar
import HKLayout from "./components/HKLaout"
import store  from "./store"
import { setCityNameAction } from "./store/actionCreator"
import { connect } from "react-redux"
import "./App.css"

//1. rcc 新建一個 App 組件
class App extends Component {

  componentDidMount(){
    var myCity = new window.BMap.LocalCity();
    myCity.get((result) => {
      let  cityName = this.props.cityName || result.name;
      store.dispatch(setCityNameAction(cityName));
    });

  }
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
          <Route path="/citylist" exact render={() => <CityList/>} />
          <Route path="/bmap" exact render={() =><BMap/>} />
          <Route path="/test" exact render={() =><Test/>} />
        </Router>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cityName: state.cityName
  }
}

export default connect(mapStateToProps,null)(App)
