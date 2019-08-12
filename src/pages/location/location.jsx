import React,{Component} from 'react';
import {BackTop, Card, Col, Icon, message, Modal, Row, Statistic, Table} from "antd";
import {reqGetSeat, reqOnline, reqUpdateSeat, reqUpdateUser} from "../../api";
import LinkButton from "../../components/link-button";
import UpdateForm from "../location/updateform";

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

export default class Location extends Component{
    state = {
        key: '338',
        noTitleKey: '338',
        loading:false,
        users:[],
        showStatus: false, //false不显示，true为显示
    }

    initColumns = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex:'memberName',
                width: 120
            },
            {
                title: "位置",
                dataIndex:  "seat",
                width: 120
            },
            {
                title: '操作',
                width: 120,
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(user)}>编辑位置</LinkButton>
                    </span>

                )
            }
        ]
    }

    //第一次渲染表格标题
    componentWillMount() {
        this.initColumns()

    }
    /*

     */
    getSeatUser = async () => {
        this.setState({loading:true})
        const result = await reqGetSeat()
        this.setState({loading:false})
        if(result.error_code === 31){
            const users = result.data
            this.setState({
                users
            })
        }else{
            message.warn("获取人员失败！")
        }

    }


    /*
    获取在线人员列表
     */
    componentDidMount() {
        this.getSeatUser()
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

    /*
    响应点击取消: 隐藏确定框
    */
    handleCancel = () => {
        // 清除输入数据
        this.form.resetFields()
        // 隐藏确认框
        this.setState({
            showStatus: false
        })
    }

    /*
    显示修改的确认框
    */
    showUpdate = (user) => {
        // 保存分类对象
        this.user = user
        //console.log(user)
        //console.log(user.memberName)
        // 更新状态
        this.setState({
            showStatus: true
        })
    }
    /*
    修改人员请求
     */
    updateSeat = () => {

        this.form.validateFields(async (err,values) => {
            if(!err) {
                //1,隐藏确定框
                this.setState({
                    showStatus: false
                })
                //准备数据
                const {memberName, seat} = values
                //清除
                this.form.resetFields()
                const result = await reqUpdateSeat(memberName, seat)
                if(result.error_code === 29){
                    message.success("编辑成功")
                    this.getSeatUser()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }
    render() {
        const {users,loading,showStatus} = this.state
        const o = this.groupBy(users, 'room');

        //读取指定的分类
        const user = this.user || {}
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
                            <Col  className="right">
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
                                    pagination={{defaultPageSize: 6,showQuickJumper: true}}
                                    //pagination={false}
                                />
                            </Col>
                            <Modal
                                title="编辑位置编号"
                                visible={showStatus===true}
                                onOk={this.updateUser}
                                onCancel={this.handleCancel}
                            >
                                <UpdateForm
                                    memberName={user.memberName}
                                    seat={user.seat}
                                    setForm={(form) => {this.form = form}}
                                />
                            </Modal>
                        </Row>,

                    339:
                        <Row className="sum-339">
                            <Col className="right">
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
                                    pagination={{defaultPageSize: 6,showQuickJumper: true}}
                                    //pagination={false}
                                />
                            </Col>
                            <Modal
                                title="编辑位置编号"
                                visible={showStatus===true}
                                onOk={this.updateSeat}
                                onCancel={this.handleCancel}
                            >
                                <UpdateForm
                                    memberName={user.memberName}
                                    seat={user.seat}
                                    setForm={(form) => {this.form = form}}
                                />
                            </Modal>
                        </Row>,
                }[this.state.noTitleKey]}

            </Card>
        )
    }
}