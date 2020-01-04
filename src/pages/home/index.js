import React, { Component, Fragment } from 'react'
import axios  from "../../utils/request"

/* 
    首頁
*/

export default class Index extends Component {



    componentDidMount() {
        axios.get("/home/swiper").then(res => {
            console.log(res);
        
        })
    }
    render() {
        return (
            <Fragment>
                home
            </Fragment>
        )
    }
}
