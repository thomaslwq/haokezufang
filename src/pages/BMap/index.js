import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { NavBar, Icon } from 'antd-mobile';
import { connect } from "react-redux"
import axios from "../../utils/request"
import "./index.scss"
import { API_URL } from '../../utils/urls';
let BMap = window.BMap
/* 
    获取房源信息
    1. 根据城市的名称 获取城市的 value /area/info?name=%E5%B9%BF%E5%B7%9E"
    2. 根据城市的value 获取城市的房源信息 /area/map?id=AREA%7Ce4940177-c04c-383d"

*/
class Index extends Component {


    state = {
        house_list: [], //房源信息接口
        show: false
    }

    //层级显示的数据结构
    Sites = [
        { level: 1, zoom: 11, shape: "circle", name: "城市" },
        { level: 2, zoom: 13, shape: "circle", name: "区域" },
        { level: 3, zoom: 15, shape: "rect", name: "街道" },
    ]
    //目前所在的层级
    index = 0
    componentDidMount() {
        this.init_map();
    }

    //初始化百度地圖的内容
    init_map = async (params) => {
        this.map = new BMap.Map("allmap");          // 创建地图实例  
        this.map.centerAndZoom(this.props.cityName, this.Sites[this.index].zoom);
        this.map.addControl(new BMap.NavigationControl());
        this.map.addControl(new BMap.ScaleControl());
        let cityObj = (await axios.get("/area/info?name=" + this.props.cityName)).body
        console.log(cityObj);
        this.drawHouse(cityObj);
        this.map.addEventListener("dragstart", (params) => {
            this.setState({
                show: false
            })
        }
        )
    }
    // 画房源
    drawHouse = async (cityObj) => {
        //获取房源信息
        let res = (await axios.get("/area/map?id=" + cityObj.value)).body;
        //清除障碍物
        this.map.clearOverlays();
        //如果不是第一次进入 并且 深度小于3 
        if (this.index !== 0 && this.index < 3) {
            this.map.centerAndZoom(new BMap.Point(cityObj.coord.longitude, cityObj.coord.latitude), this.Sites[this.index].zoom)
        }
        /* 
        coord:
        latitude: "23.17599"
        longitude: "113.261927"
        __proto__: Object
        count: 375P
        label: "白云"
        value: "AREA|8b5511b3-7699-f921"    
        */

        res.map(v => {
            let point = new BMap.Point(v.coord.longitude, v.coord.latitude);
            let label = "";
            if (this.Sites[this.index].shape === "circle")
                label = new BMap.Label("<div class='circle'>" + v.label + "<br/>" + v.count + "套</div>",     //为label填写内容
                    {
                        offset: new BMap.Size(0, 0),
                        position: point
                    });
            else
                label = new BMap.Label("<div class='rect'>" + v.label + "<br/>" + v.count + "套</div>",     //为label填写内容
                    {
                        offset: new BMap.Size(0, 0),
                        position: point
                    });
            label.setStyle({
                backgroundColor: "tranparent",
                border: "none"
            })
            label.addEventListener("click", (params) => {
                //进入到最后一层了
                if (this.index === 3) {
                    this.getHouseList(v);
                    this.setState({
                        show: true
                    })
                } else {
                    this.drawHouse(v);
                }

            });
            this.map.addOverlay(label);
        })
        // 地图进入层级 加1 
        this.index++;
    }
    //渲染地图底部弹出框
    getHouseList = async (v) => {
        //1. 首先要将房源列表数据拿到手
        let house_list = (await axios.get("/houses?cityId=" + v.value)).body.list;
        console.log(house_list);
        this.setState({
            house_list
        })

    }
    //渲染下层房源
    /* 
    desc: "二室/66/南|北/美林湖畔花园"
        houseCode: "5cc484f61439630e5b49c348"
        houseImg: "/newImg/7biblf9lk.jpg"
        price: 6500
        tags: Array(2)
        0: "近地铁"
        1: "精装"
        length: 2
        __proto__: Array(0)
        title: "整租 · 美林湖畔花园 2室1厅 6500元" 

    */
    renderHouseList = (params) => {

        return <div className="map_house_list_bottom">
            <div className="map_house_list_header">
                <span>房屋列表</span>
                <span>更多房源</span>
            </div>
            <div className="map_house_list_content">
                {
                    this.state.house_list.map((v, i) => <div key={i} className="map_house_list_item">
                        <div className="img_wrapper">
                            <img alt="" src={API_URL + v.houseImg}></img>
                        </div>
                        <div className="map_house_list_text">
                            <div className="houseInfo1">{v.title}</div>
                            <div className="houseInfo2">{v.desc}</div>
                            <div className="houseInfo3">{v.tags.map((v, index) => <span key={index}>{v}</span>)}</div>
                            <div className="houseInfo4">{v.price}元/月</div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    }



    // 在地圖上面 畫 房源 
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    style={{ backgroundColor: "#f6f5f6" }}
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/")}
                >地圖找房</NavBar>
                <div className="bMap_content">
                    <div id="allmap"></div>
                    {/* 
                        底层房源
                    */}
                    <div className={this.state.show ? "map_house_list h40" : "map_house_list"}>
                        {
                            this.renderHouseList()
                        }
                    </div>
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
