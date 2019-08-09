import React,{Component} from 'react';
import {Card, message, Table,Icon} from "antd";
import LinkButton from "../../components/link-button";
import {reqSingleDetail, reqUsers} from "../../api";
/*
个人记录路由
 */

export default class Single extends Component{

    state = {
        loading: false, //是否正在获取数据中
        users: [],  //人员分类列表
        singleDetail: [], //个人记录
        detailName: '',
    }

    /*
    初始化Table所有列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'memberName', //显示数据对应的属性名
            },
            {
                title: '房间号',
                dataIndex: 'place',
            },
            {
                title: '操作',
                width: 300,
                render: (user) => (
                    <span>
                        <LinkButton onClick={ () => {this.showSingleDetail(user)}}>查看详情</LinkButton>
                    </span>

                )
            },
        ]
        this.detailColumns = [
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
        ]

    }

    /*
    为第一次render()准备数据
     */
    componentWillMount() {
        this.initColumns()
    }

    /*
   异步获取人员列表一级分类
    */
    getUsers = async () => {
        //在发请求前显示loading
        this.setState({loading: true})
        const result = await reqUsers()
        this.setState({loading: false})
        if (result.error_code===7){
            const users = result.data
            //更新状态
            this.setState({
                users
            })
        }else{
            message.error('获取成员列表失败')
        }
    }

    /*
    执行异步任务： 发异步ajax请求
     */
    componentDidMount() {
        this.getUsers()
    }
    /*
    个人记录
     */
    getSingleDetail = async (user) => {
        this.setState({loading:true})
        //console.log(user.memberName)
        const result = await reqSingleDetail(user.memberName)
        this.setState({loading:false})
        if(result.error_code === 11){
            const singleDetail = result.data
            //更新状态
            this.setState({
                singleDetail
            })
        }else{
            message.warn('该成员还没有记录')
        }

    }

    /*
    显示个人记录详情
     */
    showSingleDetail = (user) => {
        this.setState({
            detailName: user.memberName
        },() => { // 在状态更新且重新render()后执行
            //console.log(user)
                this.getSingleDetail(user)
            }
        )
    }

    /*
    显示成员
     */
    showUsers = () => {
        //更新为显示一级列表的状态
        this.setState({
            detailName: '',
            singleDetail:[]
        })
    }
    render() {
        //读取状态
        const {users,loading,detailName,singleDetail} = this.state
        const title = detailName === "" ? '个人记录' : (
            <span>
                <LinkButton onClick={this.showUsers}>个人记录</LinkButton>
                <Icon type="arrow-right" style={{marginRight: 5}}/>
                <span>{detailName}</span>
            </span>
        )
        return(
            <Card title={title} >
                <Table
                    bordered={true}
                    loading={loading}
                    rowKey={detailName === "" ? 'index' : 'id'}
                    //loading={true}
                    dataSource={detailName === "" ? users : singleDetail}
                    columns={detailName === "" ? this.columns : this.detailColumns}
                    pagination={{defaultPageSize: 6,showQuickJumper: true}}

                />
            </Card>
        )
    }
}