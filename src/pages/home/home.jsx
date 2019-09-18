import React,{Component} from 'react';
import './home.less'
import {BackTop, Card, Col, Icon, Row, Statistic} from "antd";
import Bar from "./bar";
import {reqSignTimes} from "../../api";
/*
首页路由
 */

export default class Home extends Component{
    state = {
        times1:"",
        times2:"",
    };

    /**
     * 获取签到次数
     */
    getSignTimes = async () => {
        const result1 = await reqSignTimes("338");
        const result2= await reqSignTimes("339");
        this.setState({
            times1:result1.data,
            times2:result2.data
        })
    };

    /**
     * 获取签到次数
     * @returns {*}
     */
    componentDidMount() {
        this.getSignTimes();
    }

    render() {
        const {times1,times2} = this.state;
        return(
            <div>
                <Card title="338房间概况" style={{ width: '100%' }}>
                    <Row gutter={36} >
                        <div>
                            <BackTop />
                            <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>
                            </strong>
                        </div>
                        <Col span={3} style={{border:'1px', background: '#ECECEC', padding: '30px'}}>
                            <Statistic
                                title="338今日签到次数"
                                value={times1}
                                //precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="like" />}
                                suffix="次"
                            />
                        </Col>
                        <Col span={20}>
                            <Bar
                                place={"338"}
                            />
                        </Col>
                    </Row>

                </Card>
                <Card title="339房间概况"  style={{ width: '100%' }}>
                    <Row gutter={36} >
                        <Col span={3} style={{border:'1px', background: '#ECECEC', padding: '30px'}}>
                            <Statistic
                                title="339今日签到次数"
                                value={times2}
                                //precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="like" />}
                                suffix="次"
                            />
                        </Col>
                        <Col span={20}>
                            <Bar
                                place={"339"}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}