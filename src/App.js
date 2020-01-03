import React, { Component } from 'react'

import Img from "./assets/images/logo192.png"
import { Button } from 'antd-mobile';

export default class App extends Component {
  render() {
    return (
      <div>
        <Button>我是ant-design的按鈕啊</Button>
        <img src={Img} alt=""></img>
      </div>
    )
  }
}
