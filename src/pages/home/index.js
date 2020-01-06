import React, { Component, Fragment } from 'react'
import axios from "../../utils/request"
//2. 加載輪播圖組件 
import { Carousel } from 'antd-mobile';
import { API_URL } from "../../utils/urls"
import Nav1 from "../../assets/images/nav-1.png"
import Nav2 from "../../assets/images/nav-2.png"
import Nav3 from "../../assets/images/nav-3.png"
import Nav4 from "../../assets/images/nav-4.png"
import "./index.scss"
/* 
    首頁
*/

export default class Index extends Component {


    state = {
        swiper_list: [],
        imgHeight: 176,
        navs: [
            { id: 1, imgSrc: Nav1, title: "整租" },
            { id: 2, imgSrc: Nav2, title: "合租" },
            { id: 3, imgSrc: Nav3, title: "地圖找房" },
            { id: 4, imgSrc: Nav4, title: "去出租" },
        ],
        home_group: [],
        news: []
    }

    componentDidMount() {
        //1. 加載輪播圖的數據 
        axios.get("/home/swiper").then(res => {
            this.setState({
                swiper_list: res.body
            })
        })
        //2. 咨詢列表
        axios.get("/home/news").then(res => {
            console.log(res.body)
            this.setState({
                news: res.body
            })
        })
        //3. 租房小組
        axios.get("/home/groups").then(res => {
            console.log(res.body)
            this.setState({
                home_group: res.body
            })
        })


    }
    render() {
        return (
            <Fragment>
                <div className="hk_home">
                    {/* 
                        首頁輪播圖 開始
                    */}
                    <div className={"hk_swiper"}>
                        <Carousel
                            autoplay={true}
                            infinite
                        >
                            {this.state.swiper_list.map(val => (
                                <a
                                    key={val.id}
                                    href="http://www.alipay.com"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={API_URL + val.imgSrc}
                                        alt={val.alt}
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </div>
                    {/* 
                        首頁的導航 
                    */}
                    <div className="hk_nav">
                        {
                            this.state.navs.map(v => <div key={v.id} className="hk_nav_item">
                                <div className="item_wrrapper">
                                    <img src={v.imgSrc} alt={v.title}></img>
                                    <p>{v.title}</p>
                                </div>
                            </div>)
                        }

                    </div>

                    {/* 租房小組開始 */}
                    <div className="hk_group">
                        <div className="hk_group_title">
                            <span>租房小組</span>
                            <span>更多</span>
                        </div>
                        <div className="hk_group_content">
                            {
                                this.state.home_group.map( v => 
                                    <div className="hk_group_item" key={v.id}>
                                        <div className="hk_group_item_desc">
                                            <div className="hk_group_item_titleone">
                                                { v.title}
                                            </div>
                                            <div className="hk_group_item_titletwo">
                                                { v.desc}
                                            </div>
                                        </div>
                                        <div className="hk_group_imageWrapper">
                                            <img src={ API_URL + v.imgSrc }></img>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    {/* 租房小組結束 */}


                    {/* 首頁的資訊列表開始 */}
                    <div className="hk_news">
                        <div className="hk_news_title">
                            <span>最新資訊</span>
                        </div>
                        <div className="hk_news_content">
                            {
                                this.state.news.map(v =>
                                    <div className="hk_news_item" key={v.id}>
                                        <div className="hk_news_img_wrapper">
                                            <img src={API_URL + v.imgSrc} alt=""></img>
                                        </div>
                                        <div className="hk_news_item_info">
                                            <div className="hk_news_item_info_top">
                                                <span>{v.title}</span>
                                            </div>
                                            <div className="hk_news_item_info_bottom">
                                                <div className="hk_news_item_info_from">{v.from}</div>
                                                <div className="hk_news_item_info_to">{v.date}</div>
                                            </div>
                                        </div>


                                    </div>

                                )
                            }

                        </div>
                    </div>
                    {/* 首頁的資訊列表結束 */}
                </div>
            </Fragment>
        )
    }
}
