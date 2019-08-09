import React,{Component} from 'react';
import {Card, message, Table} from "antd";
import {reqHistory} from "../../api";
/*
历史记录路由
 */

export default class History extends Component{

    state = {
        history:[],
        loading:false,
    }

    initColumns = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'memberName',
                width: 120,
            },
            {
                title: '房间号',
                dataIndex: 'place',
                width: 120,
            },
            {
                title: '签到时间',
                dataIndex: 'getIntoTime',
                width: 150,
            },
            {
                title: '签退时间',
                dataIndex: 'exitTime',
                width: 150,
            },
            {
                title: '累计时长',
                dataIndex: 'totalTime',
                width: 150,
            },
        ];
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
    getHistory = async () => {
        this.setState({loading:true})
        const result = await reqHistory()
        this.setState({loading:false})
        if (result.error_code===9){
            const history = result.data
            this.setState({
                history
            })
        }else{
            message.error('获取历史记录失败')
        }
    }

    /*
    执行异步任务： 发异步ajax请求
     */
    componentDidMount() {
        this.getHistory()
    }
    render() {
        const {history,loading} = this.state
        return(

            <Card title="历史记录">
                <Table
                    bordered={true}
                    rowKey="id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={history}
                    pagination={{ pageSize: 50 ,showQuickJumper:true}}
                    //pagination={false}
                    scroll={{ y: 343 }}
                />
            </Card>
        )
    }
}