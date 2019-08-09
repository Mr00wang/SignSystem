import React,{Component} from 'react';
import {Form,Input,Select} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item
const { Option } = Select

/*
人员添加分类组件
 */
class AddForm extends Component{

    static propTypes = {
        setForm: PropTypes.func.isRequired // 用来传递form对象的函数
    }

    componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator} = this.props.form
        return(
            <Form>
                <span>姓名</span>
                <Item>
                    {

                        getFieldDecorator("memberName",{
                            rules: [
                                {required: true, message: '姓名必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入姓名"/>
                        )
                    }
                </Item>
                <span>房间号</span>
                <Item>
                    {
                        getFieldDecorator("place",{
                            rules: [
                                {required: true, message: '房间号必须输入'}
                            ],
                            initialValue: '338'
                        })(
                            <Select>
                                <Option value="338" >338</Option>
                                <Option value="339">339</Option>
                                <Option value="351" disabled>351</Option>
                            </Select>
                        )
                    }

                </Item>

            </Form>
        )
    }
}

export default Form.create()(AddForm)