import React, { Component, Fragment } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from "react-router-dom"
import "./index.scss"
import { connect } from "react-redux"
import axios from "../../utils/request"
// 引入搜索框
import SearchInput from "../../components/SearchInput"
import { API_URL } from '../../utils/urls';
// 引入 react-virtulized 需要的组件
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
class Index extends Component {

    state = {
        house_list: []
    }
    count = 0 //存储列表有多少条数据的
    pageSize = 10
    Qparam = {
        start:1,
        end:10
    }
    loading = false
    componentDidMount() {
        console.log(this.props.cityName);
        this.getList();
    }
    /* 
        获取我们的房源列表
    
    */
    getList = async (params) => {
        //1. 发请求获取我们城市的 value
        //2 根据区域的id 获取区域的房源
        let cityId = (await axios.get("/area/info?name=" + this.props.cityName)).body.value;
        this.Qparam.cityId = cityId;
        let res = (await axios.get("/houses",{
            params:this.Qparam
        } )).body;
        this.count = res.count;
        this.loading = false;
        this.setState({
            house_list: [...this.state.house_list,...res.list]
        })

    }



    // 渲染列表 

    /*     desc: "四室/105/南/岭南新世界锦云峰"
    houseCode: "5cc485f11439630e5b49f9c0"
    houseImg: "/newImg/7bj1g5jm5.jpg"
    price: 2260
    tags: ["公寓", "独立卫生间", "近地铁", "押一付一", "随时看房"]
    title: "合租 · 岭南新世界锦云峰 4室1厅" */
    rowRenderer = ({key, index, style}) => {
        let v = this.state.house_list[index];
        return  <div key={key} className="list_content_item" style={style}>
                    <div className="list_content_img_wrapper">
                        <img src={API_URL + v.houseImg} alt=""></img>
                    </div>
                    <div className="list_content_desc">
                        <div className="houseInfo1">{v.title}</div>
                        <div className="houseInfo2">{v.desc}</div>
                        <div className="houseInfo3">{v.tags.map((v, ii) => <span key={ii}>{v}</span>)}</div>
                        <div className="houseInfo4"><span>{v.price}</span>元/月</div>
                    </div>
                </div>
    }
    //处理触底事件
    handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        //console.log("clientHeight:"+clientHeight);  列表组件的外层高度
        //console.log("scrollHeight:"+scrollHeight); 列表已经滚动的长度
        //console.log("scrollTop:"+scrollTop); 滚动距离
        if( (scrollHeight - clientHeight - scrollTop) < 20){ //是否触底
            //1-20 21-40 41-60
            if(this.Qparam.end < this.count && !this.loading)
            {
                this.Qparam.start += this.pageSize;
                this.Qparam.end += this.pageSize;
                this.loading = true;
                this.getList();
            }

        }
        
    }
    

    render() {
        return (
            <div className="list_container">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    style={{
                        backgroundColor: "#f6f5f6",
                    }}
                    onLeftClick={() => this.props.history.push("/")}
                >

                </NavBar>
                <div className="list_header_searchInput">
                    <SearchInput />
                </div>
                <div className="list_content">
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                height={height}
                                rowCount={this.state.house_list.length}
                                rowHeight={150}
                                rowRenderer={this.rowRenderer}
                                width={width}
                                onScroll={this.handleScroll}
                            />
                        )}
                    </AutoSizer>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cityName: state.cityName
    }
}

export default connect(mapStateToProps, null)(withRouter(Index))
