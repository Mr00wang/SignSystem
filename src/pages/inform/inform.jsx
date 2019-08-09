import React,{Component} from 'react';
import {Card, Form, Button, message} from "antd";
import RichTextEditor from "./richtexteditor";
import {reqGetInform, reqInform} from "../../api";
/*
公告编辑路由
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


class Inform extends Component{


    constructor (props) {
        super(props)
        this.editor = React.createRef()
    }

    /*
    提交申请
     */
    submit = () => {
        //console.log(this.editor)
        const place = this.state.key
        //const NoticeMessage = ''
        const detail = this.editor.current.getDetail()
        /*this.setState({
            detail: detail
        })*/
        this.setState({
            NoticeMessage : detail
        },async () => {

            const result = await reqInform(this.state.NoticeMessage.trim(),place)
            if(result.error_code===5){
                message.success(result.msg)
            }
        })
        //const NoticeMessage = detail1

    }

    /*
    获取公告信息
     */
    getInform = async () => {
        const place = this.state.key
        const result = await reqGetInform(place)
        if(result.error_code === 17){
            //const inform = result.data
            const content = result.data[0].content
            //console.log('content+'+content)
            this.setState({
                detail: content
            })
        }
    }

    /*
    异步获取
     */
    componentDidMount() {
        this.setState({

        },async () => {
            this.getInform()
        })


    }

    state = {
        detail:"",
        NoticeMessage:"",
        key: '338',
        noTitleKey: 'app',
    };

    /*
    setState()不能立即获取最新的状态: 因为setState()是异步更新状态的
     */
    onTabChange = (key, type) => {
        this.setState({
            [type]: key
        },() => {  // 在状态更新且重新render()后执行
            this.getInform()
        });
        //this.getInform()
    };

    render() {
        const {detail} = this.state
        // console.log('render+'+detail1.trim(),detail2.trim(),key)
        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    title="公告编辑"
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}

                >
                    {this.contentList= {
                        338:
                            <div>
                                <RichTextEditor key={Math.random()}  ref={this.editor} detail={detail} /><br/><br/>
                                <Button type='primary'  onClick={this.submit}>提交</Button>
                            </div>,
                        339:
                            <div>
                                <RichTextEditor key={Math.random()}  ref={this.editor} detail={detail} /><br/><br/>
                                <Button type='primary' onClick={this.submit}>提交</Button>
                            </div>,
                    }[this.state.key]}
                </Card>
            </div>
        );
    }
}

export default Form.create()(Inform)

/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pw = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pw} />
3. 通过ref容器读取标签元素: this.pw.current
 */