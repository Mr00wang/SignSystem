import React,{Component} from 'react';
import {Card, Col, message, Row, Table, BackTop} from "antd";
import './sum.less'
import {reqUsers} from "../../api";
/*
时长汇总路由
 */






const tabList = [
    {
        key: '338',
        tab: '338',
    },
    {
        key: '339',
        tab: '339',
    },
];

export default class Sum extends Component{
    state = {
        users:[],
        loading:false,
        key: '338',
        noTitleKey: 'app',

    };

    /*
    初始化Table所有列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'memberName', //显示数据对应的属性名
                width: 120,
            },
            {
                title: '房间号',
                dataIndex: 'place',
                width: 120,
            },
            {
                title: '累计时间',
                dataIndex: 'totalTime',
                width: 120,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.totalTime - b.totalTime,
            },
        ]
    }
    /*
     为第一次render()准备数据
     */
    componentWillMount() {
        this.initColumns()
    }

    /*
    异步获取人员列表
     */
    getUsers = async () => {
        this.setState({loading:true})
        const result = await reqUsers()
        this.setState({loading:false})
        if(result.error_code===7)
        {
            const users = result.data
                this.setState({
                    users
                })
        }else{
            message.error("获取列表错误！")
        }

    }
    /*
    执行异步任务，发送ajax请求,获取成员数据
     */
    componentDidMount() {
        this.getUsers()
    }



    onTabChange = (key, type) => {
        //console.log(key, type);
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
            const {users,loading} = this.state
            const o = this.groupBy(users, 'room'); // => {orange:[...], banana:[...]}
        return(
            <Card
                style={{ width: '100%' }}
                title="时间累计显示"
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {this.contentList= {
                    338:
                        <Row className="sum-338">
                            <div>
                                <BackTop />
                                <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>
                                </strong>
                            </div>
                            <Col span={16} className="left" >
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
                            <Col span={8} className="right">
                                <span>右边</span>
                            </Col>
                        </Row>,

                    339:
                        <Row>
                            <Col span={16} className="left" >
                                <div>
                                    <BackTop />
                                    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>

                                    </strong>

                                </div>
                                <Table
                                    bordered={true}
                                    rowKey='memberName'
                                    dataSource={o.room339}
                                    columns={this.columns}
                                    // pagination={{defaultPageSize: 6,showQuickJumper: true}}
                                    pagination={false}
                                />

                            </Col>
                            <Col span={8} className="right">
                                    <span>右边</span>
                            </Col>
                        </Row>,

                }[this.state.key]}
            </Card>
        )
    }
}