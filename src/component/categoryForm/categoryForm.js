import React from 'react'
import {
  Form, Icon, Input, Button, Select
} from 'antd';
import { connect } from 'react-redux'

const axios = require('axios');

const { Option } = Select;

class CategoryForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      info: {
        username: '',
        nikename: '',
        phone: '',
        name: '',
        content: '',
      }
    }
    console.log(this.props);
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.props);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.editCategory(values)
      }else{
        console.log(err);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={e=>this.handleSubmit(e)} className="login-form">
        <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入类别名!' }],
          })(
            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="类别" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            添加
          </Button>
        </Form.Item>
      </Form>
    )
  }

}

export default CategoryForm
