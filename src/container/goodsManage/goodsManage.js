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
  message,
  Form,
} from 'antd'
import Message from '../../component/message/message'
import { connect } from 'react-redux'
import { getGoodsList, getCategoryList, findOneGoods, editGoods, deleteGoods, addGoods, multiDeleteGoods } from '../../redux/goods.redux'
import GoodsForm from '../../component/goodsForm/goodsForm'
import moment from 'moment';

const confirm = Modal.confirm;


@connect(
  state => state,
  { getGoodsList, getCategoryList, findOneGoods, editGoods, addGoods, deleteGoods, multiDeleteGoods }
)
class GoodsManage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      editVisible: false,
      selectedGoods: null,
    }
    this.editGoodsSubmit = this.editGoodsSubmit.bind(this);
    this.deleteGoodsClick = this.deleteGoodsClick.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.addGoodsSubmit = this.addGoodsSubmit.bind(this);
  }
  componentDidMount(){
    console.log('goodsManage');
    this.props.getGoodsList(1)
    this.props.getCategoryList()
  }

  handle(data, obj){
    console.log(data);
    this.setState({
      [obj]: true,
    });
    this.props.findOneGoods(data._id)
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

  // 商品信息编辑提交
  editGoodsSubmit(data){
    console.log(data);
    data.time = data.time.format('YYYY-MM-DD')
    data._id = this.props.goods._id
    this.props.editGoods(data)
    this.setState({
      editVisible: false,
    });
  }

  // 商品信息新增提交
  addGoodsSubmit(data){
    console.log('新增商品');
    console.log(data);
    this.props.addGoods(data)
    this.setState({
      addVisible: false,
    });
  }

  // 商品删除
  deleteGoodsClick(data){
    console.log(data._id);
    this.showConfirm(data)
  }

  // 删除确认提示框
  showConfirm(data) {
    console.log(this);
    const _this = this
    confirm({
      title: '确定删除' + data.name,
      onOk() {
        _this.props.deleteGoods(data._id)
        _this.setState({
          editVisible: false,
        });
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000, function(){

          });
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  // 商品多选删除
  multiDelete(){
    const _this = this
    let content = []
    let ids = []
    console.log(this.state.selectedGoods);
    if(this.state.selectedGoods!==null&&this.state.selectedGoods.length!==0){
      for( let i = 0; i < this.state.selectedGoods.length; i++){
        content.push(<p key={this.state.selectedGoods[i]._id}><img src={`${URL}/img/${this.state.selectedGoods[i].img}`} style={{width: 40}}/>{this.state.selectedGoods[i].name+'   '+ this.state.selectedGoods[i].now_price}</p>)
        ids.push(this.state.selectedGoods[i]._id)
      }
      console.log(content);
    }

    confirm({
      title: '删除商品信息',
      content:
        <div>
          {content}
        </div>,
      onOk() {
        _this.props.multiDeleteGoods(ids)
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  render(){
    let msg = this.props.goods.cart_msg?<Message msg={this.props.goods.cart_msg}></Message>:null
    // const data = this.props.goods
    let data = this.props.goods.goodsList || null
    for(let i = 0; data!==null&&i< data.length; i++){
      data[i].key = data[i]._id
    }
    const columns = [{
      title: '头像',
      dataIndex: 'img',
      key: 'img',
      render: (text, record, index) => {
        let content = "";
        if(record.img){
          content = `${URL}/img/${record.img}`;
        }
        return <img src={content} alt="" style={{width: 50}}/>
      }
    }
    ,{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '原价',
      dataIndex: 'former_price',
      key: 'former_price',
    },{
      title: '现价',
      dataIndex: 'now_price',
      key: 'now_price',
    }, {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (text, record, index) => {
        let content = "";
        var date = new Date()
        if(record.img){
          date = new Date(record.time)

        }
        content += date.getFullYear() + '-'
        content += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        content += date.getDate() + ' '
        content += date.getHours() + ':'
        content += date.getMinutes()
        // content += date.getSeconds();
        return <p>{content}</p>
      }
    },{
      title: 'Action',
      dataIndex: '',
      key: 'edit',
      render: (text, record, index) => {

        return <a onClick={()=>this.handle(record, 'editVisible')}>edit</a>
      },
  }];


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          selectedGoods: selectedRows
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const WrappedGoodsForm = Form.create({ name: 'horizontal_login' })(GoodsForm);



    return (
      <div>
        {msg}
        <Table rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.desc}</p>} />
        <Row>
          <Button type="primary" onClick={()=>this.setState({
            addVisible: true,
          })}>新增</Button>
        <Button type="danger" onClick={()=>this.multiDelete()}>删除</Button>
        </Row>
          <Modal
              title="商品编辑"
              visible={this.state.editVisible}
              onOk={()=>this.handleOk('editVisible')}
              onCancel={()=>this.handleCancel('editVisible')}
              cancelText="返回"
              okType="danger"
            >
            <WrappedGoodsForm handleGoods={this.editGoodsSubmit}
              buttonText='保存' goods={this.props.goods}
              category={this.props.goods.category}
            delete={this.deleteGoodsClick} />
          </Modal>
          <Modal
              title="商品新增"
              visible={this.state.addVisible}
              onOk={()=>this.handleOk('addVisible')}
              onCancel={()=>this.handleCancel('addVisible')}
              cancelText="返回"
              okType="danger"
            >
            <WrappedGoodsForm handleGoods={this.addGoodsSubmit}
              buttonText='添加'
            delete={this.deleteGoodsClick} category={this.props.goods.category}/>
          </Modal>
      </div>

    )
  }
}
export default GoodsManage
