import React,{Component} from 'react'
import {Card} from "antd"
import ReactEcharts from "echarts-for-react"
import {reqSevenDaySignTime, reqSevenDaySignTimes} from "../../api";
import {formateDate1} from "../../utils/dateUtils";
import PropTypes from "prop-types";
/*
柱状图路由
 */
export default class Bar extends Component{
    static propType = {
        place: PropTypes.string.isRequired,
    };
    state = {
        times: [], // 签到次数
        time: [], // 签到时长
        date:formateDate1(Date.now()),
    };


    /**
     *
     */
    getDatas = async () => {
        //签到次数
      const result = await reqSevenDaySignTimes(this.props.place);
      console.log(result.data);
      //签到时长
        const result1 = await reqSevenDaySignTime(this.props.place);
        console.log(result1.data);
        this.setState({
            times:result.data,
            time:result1.data
        })
    };
    /**
     *
     */
    componentDidMount() {
        this.getDatas();
    }

    /*
    返回柱状图的配置对象
     */
    getOption = (times, time) => {
        const date = formateDate1(Date.now());
        return {
            title: {
                text: '总体浏览'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['总签到次数','总签到时间']
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
                data: ['9-11','9-12','9-13','9-14','9-15','9-16','9-17']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'总签到次数',
                    type:'line',
                    stack: '次',
                    data:this.state.times
                },
                {
                    name:'总签到时间',
                    type:'line',
                    stack: '分',
                    data:this.state.time
                },
            ]
        }
    };

    render() {
        const {sales, stores} = this.state;
        return (
            <div>
                <Card title='折线图'>
                    <ReactEcharts option={this.getOption(sales, stores)} />
                </Card>

            </div>
        )
    }
}