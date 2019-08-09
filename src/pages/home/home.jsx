import React,{Component} from 'react';
import './home.less'
import {BackTop, Card, Col, Icon, Row, Statistic} from "antd";
import Bar from "./bar";
/*
首页路由
 */

export default class Home extends Component{
    render() {
        return(
            <div>
                <Card title="338房间概况" extra={<a href="#">More</a>} style={{ width: '100%' }}>
                    <Row gutter={36} >
                        <div>
                            <BackTop />
                            <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>
                            </strong>
                        </div>
                        <Col span={3} style={{border:'1px', background: '#ECECEC', padding: '30px'}}>
                            <Statistic
                                title="338今日签到次数"
                                value={11.28}
                                //precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="like" />}
                                suffix="次"
                            />
                        </Col>
                        <Col span={20}>
                            <Bar/>
                        </Col>

                    </Row>

                </Card>
                <Card title="339房间概况" extra={<a href="#">More</a>} style={{ width: '100%' }}>
                    <Row gutter={36} >
                        <Col span={3} style={{border:'1px', background: '#ECECEC', padding: '30px'}}>
                            <Statistic
                                title="339今日签到次数"
                                value={11.28}
                                //precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="like" />}
                                suffix="次"
                            />
                        </Col>
                        <Col span={20}>
                            <Bar/>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}