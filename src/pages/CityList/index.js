import React, { Component, Fragment } from 'react'
import axios from "../../utils/request"
import { NavBar, Icon } from 'antd-mobile';
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import "./index.scss"
/* 
    城市選擇
    1. 構造城市選擇需要的數據結構
    a.左邊城市選擇的數據結構
    all_cities = [
        {"當前城市":["廣州"]},
        {"熱門城市":["廣州","深圳","北京","上海"]},
        {"A":["安慶"]},
        {"B":["北京"]},
        {"C":["..."]},
        ........
        {"Z":["..."]}
    ]
    b. 
    key_arrs = ["#","熱","A","B"....."Z"]
*/
export default class index extends Component {

    state = {
        all_cities: [],
        key_arrs: [],
        select_index:0
    }
    constructor(props){
        super(props);
        this.MainList = React.createRef();
    }

    //2. 發請求 拿數據 構造數據結構
    componentDidMount() {
        this.getAllCities();
    }

    //3. 獲取需要的城市的數據結構
    getAllCities = async (params) => {
        // all_cities = [
        //     {"當前城市":["廣州"]},
        //     {"熱門城市":["廣州","深圳","北京","上海"]},
        //     {"A":["安慶"]},
        //     {"B":["北京"]},
        //     {"C":["..."]},
        //     ........
        //     {"Z":["..."]}
        // ]
        let hot_cities = (await axios.get("/area/hot")).body;
        let all_cities = [
            { "當前城市": ["廣州"] },
            { "熱門城市": hot_cities.map(v => v.label) }
        ]
        let cityList = (await axios.get("/area/city?level=1")).body;
        // 要對cityList 進行排序
        /* 
          [{label: "佛山"
            pinyin: "foshan"
            short: "fs" F
            value: "AREA|0ee75d32-8a95-3f73"},
            {label: "佛山"
            pinyin: "foshan"
            short: "fs" F
            value: "AREA|0ee75d32-8a95-3f73"}
        ]
        */
        cityList.sort(function (a, b) {
            return a.short.localeCompare(b.short)
        })

        // cityList 裏面目前總共有  92條數據 歸類到 26個字母裏面去
        /* 
            v 的值 
            label: "佛山"
            pinyin: "foshan"
            short: "fs" F
            value: "AREA|0ee75d32-8a95-3f73"
        */
        cityList.map(v => {
            let firstLetter = v.short[0].toUpperCase();
            //拿到字母所在的索引
            let index = all_cities.findIndex(vv => {
                // vv {"當前城市":["廣州"]}  也可能是 {"A":["安慶"]}
                if (vv[firstLetter]) {
                    return true;
                }
            })
            index === -1 ? all_cities.push({ [firstLetter]: [v.label] }) : all_cities[index][firstLetter].push(v.label);
        })
        let key_arrs = all_cities.map(v => Object.keys(v)[0])
        key_arrs[0] = "#";
        key_arrs[1] = "熱";
        console.log(key_arrs);
        console.log(all_cities);
        this.setState({
            key_arrs, all_cities
        })
    }
    // index 當前行的索引
    getRowHeight({ index }) {
        let item = this.state.all_cities[index];
        // 每一個子元素給40高度
        return (Object.values(item)[0].length + 1) * 40;

    }
    // 每一行的渲染的邏輯
    rowRenderer({
        index, // 現在的行的記錄 
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        key, // Unique key within array of rendered rows
        parent, // Reference to the parent List (instance)
        style, // Style object to be applied to row (to position it);
        // This must be passed through to the rendered row element.
    }) {
        let item = this.state.all_cities[index];
        let key_name = Object.keys(item)[0];// "當前定位" 這個字符串
        let list = Object.values(item)[0];//["北京"]
        return <div className="city_item" key={key} style={style}>
            <div className="city_title">{key_name}</div>
            {
                list.map((v, i) =>
                    <div key={i} className="city_label" >
                        {v}
                    </div>
                )
            }
        </div>
    }
    onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {
        this.setState({
            select_index:startIndex
        })
    }
    onLetterClick = (row) => {
        //調用 list scrollToRow 方法
        this.MainList.current.scrollToRow(row);
        this.setState({
            select_index:row
        })
    }
    
    render() {
        return (
            <Fragment>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => window.history.go(-1)}
                >城市選擇</NavBar>
                <div className="city_list">
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                ref = {this.MainList}
                                height={height}
                                rowCount={this.state.all_cities.length}
                                rowHeight={this.getRowHeight.bind(this)}
                                rowRenderer={this.rowRenderer.bind(this)}
                                width={width}
                                onRowsRendered={this.onRowsRendered}
                                scrollToAlignment="start"
                            />
                        )}
                    </AutoSizer>
                    <div className="city_key_arrs">
                        {

                            this.state.key_arrs.map((v,i) =>
                                <div className={this.state.select_index === i ? "city_key_item active":"city_key_item"}
                                onClick={this.onLetterClick.bind(this,i)}
                                key={i}>
                                    {v}
                                </div>
                            )
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}
