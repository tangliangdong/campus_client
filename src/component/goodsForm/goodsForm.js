import React from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  message,
  Modal,
} from 'antd';
import { connect } from 'react-redux'
import moment from 'moment';

const axios = require('axios');
const dateFormat = 'YYYY-MM-DD';

const { Option } = Select;
const { TextArea } = Input;

class GoodsForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      goods: {
        name: '',
        now_price: '',
        time: '',
        num: '',
        img: '',
        desc: ''
      },
      loading: false,
      previewVisible: false,
      previewImage: '',
      imgfileList: [],
    }
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.props);
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        this.props.handleGoods(values)
        this.props.form.resetFields()
      }else{
        console.log(err);
      }
    });
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleChange = (info) => {
    console.log(info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  multiHandleChange = (info) => {
    let fileList = info.fileList;
    console.log('multiHandleChange');
    console.log(info);
    // 2. Read from response and show file link
    // fileList = fileList.map((file) => {
    //   if (file.response) {
    //     // Component will show file.url as link
    //     file.url = file.response.url;
    //   }
    //   return file;
    // });
    // // 3. Filter successfully uploaded files according to response from server
    // fileList = fileList.filter((file) => {
    //   if (file.response) {
    //     return file.response.status === 'success';
    //   }
    //   return false;
    // });
    console.log(fileList);
    this.setState({ imgfileList: fileList });
  }

  handlePreview = (file) => {
   this.setState({
     previewImage: file.url || file.thumbUrl,
     previewVisible: true,
   });
 }


  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const goods = this.props.goods
    const { previewVisible, previewImage, imgfileList } = this.state;
    // 图片上传参数配置
    const imageUrl = this.state.imageUrl;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const props = {
      name: 'file',
      listType: 'picture',
      action: '/goods/upload_goods_img',
      accept: 'image/*',
      multiple: true,
    };
    // 商品类别下拉框
    let category_list = []
    if(this.props.category!==undefined){
      this.props.category.map((item) => (
        category_list.push(<Option key={item._id} value={item._id}>{item.title}</Option>)
      ))
    }
    return goods!==undefined?(
      <Form onSubmit={e=>this.handleSubmit(e)} className="login-form">
        <Form.Item
          label="名称">
          {getFieldDecorator('name', {initialValue: goods.name})(
            <Input disabled prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="商品名" />
          )}
        </Form.Item>
        <Form.Item
          label="原价">
          {getFieldDecorator('former_price', {
            rules: [{ required: true, message: '输入原价!' }],
            initialValue: goods.former_price
          })(
            <InputNumber min={0} precision={1} placeholder="原价" />
          )}
        </Form.Item>
        <Form.Item
          label="现价">
          {getFieldDecorator('now_price', {
            rules: [{ required: true, message: '输入现价!' }],
            initialValue: goods.now_price
          })(
            <InputNumber min={0} precision={1} placeholder="现价" />
          )}
        </Form.Item>
        <Form.Item
          label="数量">
          {getFieldDecorator('num', {
            rules: [{ required: true, message: '输入数量!' }],
            initialValue: goods.num
          })(
            <InputNumber min={1} max={1000} step={3} precision={0} prefix={<Icon type="calculator" />} placeholder="数量" />
          )}
        </Form.Item>
        <Form.Item
          label="添加时间">
          {getFieldDecorator('time', {
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                const edate = getFieldValue('time');
                console.log(edate,value);

                callback();
              }
            }],
            initialValue: moment(goods.time, dateFormat)
          })(
            <DatePicker disabled format={dateFormat}/>
          )}
        </Form.Item>
        <Form.Item
          label="类别"
        >
          {getFieldDecorator('category_id', {
            rules: [
              { message: '选择类别!' },
            ],
            initialValue: goods.category_id
          })(
            <Select placeholder="类别">
              {category_list}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="简介">
          {getFieldDecorator('desc', {
            rules: [{ message: '输入简介!' }],
            initialValue: goods.desc
          })(
            <TextArea rows={6}></TextArea>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {this.props.buttonText}
          </Button>
          <Button type="danger" block onClick={()=>this.props.delete(goods)}>删除</Button>
        </Form.Item>
      </Form>
    )
    :
    ((
      <Form onSubmit={e=>this.handleSubmit(e)} className="login-form">
        <Form.Item
          label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '输入名称!' }]
            })(
            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="商品名称" />
          )}
        </Form.Item>
        <Form.Item
          label="原价">
          {getFieldDecorator('former_price', {
            rules: [{ required: true, message: '输入原价!' }]
          })(
            <InputNumber min={0} precision={1} placeholder="原价" />
          )}
        </Form.Item>
        <Form.Item
          label="现价">
          {getFieldDecorator('now_price', {
            rules: [{ required: true, message: '输入现价!' }]
          })(
            <InputNumber min={0} precision={1} placeholder="现价" />
          )}
        </Form.Item>
        <Form.Item
          label="数量">
          {getFieldDecorator('num', {
            rules: [{ required: true, message: '输入数量!' }]
          })(
            <InputNumber min={1} max={1000} step={3} precision={0} prefix={<Icon type="calculator" />} placeholder="数量" />
          )}
        </Form.Item>
        <Form.Item
          label="类别"
        >
          {getFieldDecorator('category_id', {
            rules: [
              { message: '选择类别!' },
            ]
          })(
            <Select placeholder="类别">
              {category_list}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="商品图片"
        >
          {getFieldDecorator('img', {
            rules: [
              { required: true, message: '上传商品图片!' },
            ]
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/goods/upload_goods_img"
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: 140}}/> : uploadButton}
            </Upload>
          )}
        </Form.Item>
        <Form.Item
          label="商品介绍图片"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>

          )}
        </Form.Item>

        <Form.Item
          label="简介">
          {getFieldDecorator('desc', {
            rules: [{ message: '输入简介!' }]
          })(
            <TextArea rows={6}></TextArea>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {this.props.buttonText}
          </Button>
        </Form.Item>
      </Form>
    ))
  }

}

export default GoodsForm
