import React,{Component} from 'react';
import {Form, Input, Select} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item
const { Option } = Select
/*
人员更新分类组件
 */
class UpdateForm extends Component{

    static propTypes = {
        memberName: PropTypes.string.isRequired,
        place: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount () {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }


    render() {
        const {memberName,place} = this.props
        const {getFieldDecorator} = this.props.form
        return(
            <Form>
                <span>姓名</span>
                <Item>
                    {
                        getFieldDecorator("memberName",{
                            rules: [
                                {required: true, message: '姓名必须输入'}
                            ],
                            initialValue: memberName
                        })(
                            <Input placeholder="请修改姓名"/>
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
                            initialValue: place
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

export default Form.create()(UpdateForm)