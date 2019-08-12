import React,{Component} from 'react';
import {Form, Input} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item
/*
人员更新分类组件
 */
class UpdateForm extends Component{

    static propTypes = {
        memberName: PropTypes.string.isRequired,
        seat: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount () {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }


    render() {
        const {memberName,seat} = this.props
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
                            <Input placeholder="请输入姓名" disabled/>
                        )
                    }
                </Item>
                <span>位置号</span>
                <Item>
                    {
                        getFieldDecorator("seat",{

                            initialValue: seat
                        })(

                            <Input placeholder="请输入位置编号"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm)