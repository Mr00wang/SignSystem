import React,{Component} from 'react';
import {BackTop, Card, Col, Row, Table, Statistic, Icon, message} from "antd";
import {reqOnline} from "../../api";
/*
在线显示路由
 */

const tabListNoTitle = [
    {
        key: '338',
        tab: '338',
    },
    {
        key: '339',
        tab: '339',
    },

];


export default class Online extends Component{
    state = {
        key: '338',
        noTitleKey: '338',
        loading:false,
        online:[],
            /*{
                "index": 7,
                "memberName": "339a",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 9
            },
            {
                "index": 6,
                "memberName": "338d",
                "place": "338",
                "room": "room338",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 7
            },
            {
                "index": 5,
                "memberName": "338c",
                "place": "338",
                "room": "room338",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 6
            },
            {
                "index": 4,
                "memberName": "338b",
                "place": "338",
                "room": "room338",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 5
            },
            {
                "index": 1,
                "memberName": "汪京龙",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 2
            },
            {
                "index": 0,
                "memberName": "蔡济阳",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 1
            },
            {
                "index": 2,
                "memberName": "汪京龙1",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 2
            },
            {
                "index": 3,
                "memberName": "蔡济阳1",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 1
            },
            {
                "index": 8,
                "memberName": "汪京龙2",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 2
            },
            {
                "index": 9,
                "memberName": "蔡济阳2",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 1
            },
            {
                "index": 10,
                "memberName": "汪京龙3",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 2
            },
            {
                "index": 11,
                "memberName": "蔡济阳3",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 1
            },
            {
                "index": 12,
                "memberName": "汪京龙4",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 2
            },
            {
                "index": 13,
                "memberName": "蔡济阳4",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 1
            },
            {
                "index": 14,
                "memberName": "汪京龙5",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 2
            },
            {
                "index": 15,
                "memberName": "蔡济阳5",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 1
            },
            {
                "index": 16,
                "memberName": "汪京龙6",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 2
            },
            {
                "index": 17,
                "memberName": "蔡济阳6",
                "place": "339",
                "room": "room339",
                "getIntoTime":"2019/8/7 24/57/13",
                "time": "24",
                "totalTime": 1
            }*/
    }

    initColumns = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex:'memberName',
                width: 120
            },
            {
                title: "签到时间",
                dataIndex:  "getIntoTime",
                width: 120
            },
            {
                title: "总签到时间",
                dataIndex: "totalTime",
                width: 120
            }
            ]
    }

    //第一次渲染表格标题
    componentWillMount() {
        this.initColumns()

    }
    /*

     */
    getOnlineUser = async () => {
        this.setState({loading:true})
        const result = await reqOnline()
        this.setState({loading:false})
        if(result.error_code === 11){
            const online = result.data
            this.setState({
                online
            })
        }else{
            message.warn("当前无人在线！")
        }

    }


    /*
    获取在线人员列表
     */
    componentDidMount() {
        this.getOnlineUser()
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    //进行房间分组
    groupBy = (arr, property) => {
        return arr.reduce(function(memo, x) {
            if (!memo[x[property]]) { memo[x[property]] = []; }
            memo[x[property]].push(x);
            return memo;
        }, {});
    }
    render() {
        const {online,loading} = this.state
        const o = this.groupBy(online, 'room');
        //console.log(o.room339)
        //console.log(o.room339.length)
        return(

            <Card
                style={{ width: '100%' }}
                tabList={tabListNoTitle}
                activeTabKey={this.state.noTitleKey}
                onTabChange={key => {
                    this.onTabChange(key, 'noTitleKey');
                }}
            >
                {this.contentListNoTitle = {
                    338:
                        <Row className="sum-338" gutter={16}>
                            <Col span={8} className="left" >
                                <Card>
                                    <Statistic
                                        title="338房间当前在线人数为"
                                        value={o.room338 === undefined ? "0" : o.room338.length}
                                        //precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="team" />}
                                        suffix="人"
                                    />
                                </Card>
                            </Col>
                            <Col span={16} className="right">
                                <div>
                                    <BackTop />
                                    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>
                                    </strong>
                                </div>
                                <Table
                                    bordered={true}
                                    loading={loading}
                                    rowKey='index'
                                    dataSource={o.room338}
                                    columns={this.columns}
                                    // pagination={{defaultPageSize: 6,showQuickJumper: true}}
                                    pagination={false}
                                />
                            </Col>
                        </Row>,
                    339:
                        <Row className="sum-339">

                            <Col span={8} className="left" >
                                <Card>
                                    <Statistic
                                        title="339房间当前在线人数为"
                                        value={o.room339 === undefined ? "0" : o.room339.length}
                                        //precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="team" />}
                                        suffix="人"
                                    />
                                </Card>
                            </Col>
                            <Col span={16} className="right">
                                <div>
                                    <BackTop />
                                    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>
                                    </strong>
                                </div>
                                <Table
                                    bordered={true}
                                    loading={loading}
                                    rowKey='index'
                                    dataSource={o.room339}
                                    columns={this.columns}
                                    // pagination={{defaultPageSize: 6,showQuickJumper: true}}
                                    pagination={false}
                                />
                            </Col>
                        </Row>,
                }[this.state.noTitleKey]}

            </Card>


        )
    }
}