import React,{Component} from 'react';
import {Card,Button,Table,Modal,Icon,message} from "antd";
import LinkButton from "../../components/link-button";
import AddForm from "./addform";
import UpdateForm from "./updateform"
import {reqUsers, reqDeleteUser, reqAddUser, reqUpdateUser, reqLinkPicture} from "../../api";
/*
人员管理路由
 */
export default class User extends Component{
    state = {
        loading: false, //是否正在获取数据中
        users: [],  //人员分类列表
        showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
    };

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
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.place - b.place,
            },
            {
                title: '操作',
                width: 300,
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(user)}>修改人员</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除人员</LinkButton>
                    </span>

                )
            },
        ]
    };

    /*
    异步获取人员列表
     */
    getUsers = async () => {
        this.setState({loading:true})
        const result = await reqUsers()
        this.setState({loading:false})
        if (result.error_code===7){
            const users = result.data
            this.setState({
                users
            })
        }else{
            message.error('获取分类列表失败')
        }
    };

    /*
    为第一次render()准备数据
     */
    componentWillMount() {
        this.initColumns()
    }

    /*
    执行异步任务： 发异步ajax请求
     */
    componentDidMount() {
        this.getUsers()
    };
    /*
  响应点击取消: 隐藏确定框
   */
    handleCancel = () => {
        // 清除输入数据
        this.form.resetFields()
        // 隐藏确认框
        this.setState({
            showStatus: 0
        })
    };
    /*
  显示人员添加的确认框
   */
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    };

    /*
    添加成员请求
     */
    addUser = () => {
        this.form.validateFields(async (err,values) => {
            if(!err) {
                // 隐藏确认框
                this.setState({
                    showStatus: 0
                });
                //准备数据
                const {memberName, place} = values
                //const user = {memberName, place}
                //清除
                this.form.resetFields()
                const result = await reqAddUser(memberName, place)
                console.log(result.error_code)
                if(result.error_code === 13){
                    this.getUsers()
                    message.success("添加成功")
                }else{
                    message.error(result.msg)
                }
            }
        })
    };

    /*
    修改人员请求
     */
    updateUser = () => {

        this.form.validateFields(async (err,values) => {
            if(!err) {
                //1,隐藏确定框
                this.setState({
                    showStatus: 0
                });
                //准备数据
                const {memberName, place} = values
                const index = this.user.index
                //清除
                this.form.resetFields()
                const result = await reqUpdateUser(memberName, place, index)
                if(result.error_code === 15){
                    message.success("修改成功")
                    this.getUsers()
                }else{
                    message.error(result.msg)
                }
            }
        })
    };
    /*
  显示修改的确认框
   */
    showUpdate = (user) => {
        // 保存分类对象
        this.user = user;
        //console.log(user)
        //console.log(user.memberName)
        // 更新状态
        this.setState({
            showStatus: 2
        })
    };

    /*
  删除指定用户
   */
    deleteUser = (user) => {
        //console.log(user)
        Modal.confirm({
            title: `确认删除${user.memberName}吗?`,
            onOk: async () => {
                //const id = user.index
                const result = await reqDeleteUser(user.memberName);
                if(result.error_code===3) {
                    message.success(result.msg);
                    this.getUsers();
                }else{
                    message.error(result.msg);
                }
            }
        })
    };

    link = async () => {
        console.log("1");
        const result = await reqLinkPicture();
        console.log("12");
        console.log(result);
        if(result.error_code === 42){
            console.log("123");
            message.success(result.msg)
        }
    };

    render() {
        //读取状态
        const {users,showStatus,loading} = this.state;
        //读取指定的分类
        const user = this.user || {};
        //console.log(user)
        const title = <Button type="primary" onClick={this.showAdd}>
            <Icon type="plus"/>
            <span>人员添加</span>
        </Button>;

        const extra = <Button type="primary" onClick={this.link} >
            <Icon type='safety-certificate'/>
            <span>一键管理</span>
        </Button>;


        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    rowKey='index'
                    loading={loading}
                    dataSource={users}
                    columns={this.columns}
                    pagination={{defaultPageSize: 6,showQuickJumper: true}}

                />
                <Modal
                    title="人员添加"
                    visible={showStatus===1}
                    onOk={this.addUser}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>

                <Modal
                    title="修改人员"
                    visible={showStatus===2}
                    onOk={this.updateUser}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        memberName={user.memberName}
                        place={user.place}
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>
            </Card>
        )
    }
}