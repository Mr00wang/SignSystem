import React,{Component} from 'react'
import {Card} from "antd"
import ReactEcharts from "echarts-for-react"
/*
柱状图路由
 */
export default class Bar extends Component{
    state = {
        sales: [5, 20, 36, 10, 10, 20], // 销量的数组
        stores: [6, 10, 25, 20, 15, 10], // 库存的数组
    }


    /*
    返回柱状图的配置对象
     */
    getOption = (sales, stores) => {
        return {
            title: {
                text: '总体浏览'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['签到次数','总签到时间']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'签到次数',
                    type:'line',
                    stack: '次',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'总签到时间',
                    type:'line',
                    stack: '分',
                    data:[3000, 2500, 4000, 2800, 2500, 3800, 2800]
                },
            ]
        }
    }

    render() {
        const {sales, stores} = this.state
        return (
            <div>
                <Card title='折线图'>
                    <ReactEcharts option={this.getOption(sales, stores)} />
                </Card>

            </div>
        )
    }
}