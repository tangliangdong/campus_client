import React from 'react'
import {
  Form, Icon, Input, Button, Select,
} from 'antd';
import { connect } from 'react-redux'
import { add_address } from '../../redux/user.redux'

const axios = require('axios');
const { Option } = Select;

@connect(
  state=>state.user,
  { add_address }
)
class AddressForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      address: {
        dorm: '',
        content: '',
        phone: '',
        name: '',
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.add_address(values)
      }else{

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const dorms = this.props.dormList
    let dorm_list = []
    if(dorms!==undefined&&dorms!==null){
      dorms.map((dorm) => (
        dorm_list.push(<Option value={dorm.value}>{dorm.value}</Option>)
      ))
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item
          label="宿舍楼号"
        >
          {getFieldDecorator('dorm', {
            rules: [
              { required: true, message: '请选择宿舍楼号!' },
            ],
          })(
            <Select placeholder="宿舍楼号">
              {dorm_list}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入寝室号!' }],
          })(
            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="寝室号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入收件人!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="收件人" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号!' }],
          })(
            <Input type="number" prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            新增
          </Button>
        </Form.Item>
      </Form>
    );
  }

}

export default AddressForm
