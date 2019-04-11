import React from 'react'
import {
  Row,
  Col,
  Icon,
  Button,
  Menu,
  Input,
  InputNumber,
  Table,
  Modal,
  Form,
} from 'antd'

import { connect } from 'react-redux'
import { getCategoryList, addCategory, deleteCategory } from '../../redux/goods.redux'
import CategoryForm from '../../component/categoryForm/categoryForm'
const confirm = Modal.confirm;

@connect(
  state => state,
  { getCategoryList, addCategory, deleteCategory }
)
class CategoryManage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      addVisible: false,
      editVisible: false,
      category_obj: null,
    }
    this.addCategory = this.addCategory.bind(this)
  }
  componentDidMount(){
    this.props.getCategoryList()
  }

  showModal(obj, result){
    this.setState({
      [obj]: true,
    });
    console.log(result);
    this.setState({
      category_obj: result
    })
  }

  handleOk(obj){
    this.setState({
      [obj]: false,
    });
  }

  handleCancel(obj){
    this.setState({
      [obj]: false,
    });
  }

  addCategory(data){
    console.log('新增分类');
    this.props.addCategory(data)
    console.log(data);
  }

  confirmDelete(data){
    const _this = this;
     confirm({
      title: '确认删除该分类?',
      content: <p>{data.title}</p>,
      onOk() {
        _this.props.deleteCategory(data._id)
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 500);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  render(){

    let data = this.props.goods.category

    const columns = [{
      title: '姓名',
      dataIndex: 'title',
      key: 'name',
    }, {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (text, record, index) => {
        return <div><a type="primary" onClick={()=>this.showModal('editVisible', record)}>edit</a> | <a type="danger" onClick={()=>this.confirmDelete(record)}>delete</a></div>
      }
    }];

    const WrappedCategoryForm = Form.create({ name: 'category' })(CategoryForm);

    return (
      <div>
        <Table dataSource={data} columns={columns} />
        <Button type="primary" onClick={()=>this.showModal('addVisible')}>添加</Button>
          <Modal
            title="新增"
            visible={this.state.addVisible}
            onOk={()=>this.handleOk('addVisible')}
            onCancel={()=>this.handleCancel('addVisible')}
          >
            <WrappedCategoryForm editCategory={this.addCategory}/>
          </Modal>
          <Modal
            title="编辑"
            visible={this.state.editVisible}
            onOk={()=>this.handleOk('editVisible')}
            onCancel={()=>this.handleCancel('editVisible')}
          >
            编辑
          </Modal>
      </div>

    )
  }
}
export default CategoryManage
