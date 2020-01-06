import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
//1. 引入一個withRouter 組件
import { withRouter } from "react-router-dom"


/* 
    用來顯示底部的tabbar
*/
 class HKLayout extends Component {

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#21B97A"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="首頁"
                        key="Life"
                        icon={<i className="iconfont icon-ind"></i>
                        }
                        selectedIcon={<i className="iconfont icon-ind"></i>
                        }
                        selected={this.props.match.path === '/'}
                        onPress={() => {
                            this.props.history.push("/");
                        }}
                    >
                        {this.props.match.path === '/'&&this.props.children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="iconfont icon-findHouse"></i>
                        }
                        selectedIcon={<i className="iconfont icon-findHouse"></i>
                        }
                        title="找房"
                        key="findHouse"
                        selected={this.props.match.path === '/list'}
                        onPress={() => {
                            this.props.history.push("/list");
                        }}
                    >
                        {this.props.match.path === '/list'&&this.props.children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="iconfont icon-infom"></i>
                        }
                        selectedIcon={
                            <i className="iconfont icon-infom"></i>
                        }
                        title="咨詢"
                        key="info"
                        selected={this.props.match.path=== '/info'}
                        onPress={() => {
                            this.props.history.push("/info");
                        }}
                    >
                        {this.props.match.path=== '/info'&&this.props.children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className="iconfont icon-myinfo"></i>}
                        selectedIcon={<i className="iconfont icon-myinfo"></i>}
                        title="我的"
                        key="my"
                        selected={this.props.match.path === '/profile'}
                        onPress={() => {
                            this.props.history.push("/profile");
                        }}
                    >
                        {this.props.match.path === '/profile'&&this.props.children}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
//2. 將HKLayout 進行包裝
export default  withRouter(HKLayout)