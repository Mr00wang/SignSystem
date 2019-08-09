import React,{Component} from 'react';
import {Button, Card} from "antd";
import ReactEcharts from "echarts-for-react";
/*
    饼状图路由
 */
export default class Pie extends Component{
    state = {
        sales: [5, 20, 36, 10, 10, 20], // 销量的数组
        stores: [6, 10, 25, 20, 15, 10], // 库存的数组
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(sale => sale + 1),
            stores: state.stores.reduce((pre, store) => {
                pre.push(store-1)
                return pre
            }, []),
        }))
    }

    /*
    返回柱状图的配置对象
     */
    getOption = (sales, stores) => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量', '库存']
            },
            series: [{
                name: '销量',
                type: 'pie',
                data: sales
            }, {
                name: '库存',
                type: 'pie',
                data: stores
            }]
        }
    }

    render() {
        const {sales, stores} = this.state
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>

                <Card title='饼状图一'>
                    <ReactEcharts option={this.getOption(sales, stores)} />
                </Card>

            </div>
        )
    }
}