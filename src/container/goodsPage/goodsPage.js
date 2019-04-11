import React from 'react'
import GoodsCard from '../../component/goodsCard/goodsCard'
import {
  Row,
  Col,
  Icon,
  Button,
  Menu,
  Input,
  InputNumber,
} from 'antd'

import { connect } from 'react-redux'
import { getGoodsList, getCategoryList } from '../../redux/goods.redux'
import './goodsPage.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

@connect(
  state => state,
  {getGoodsList, getCategoryList}
)
class GoodsPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      low_price: null,
      high_price: null,
      navType: 1,
      topCurrent: 'default',
      category: null,
      searchContent: null,
    }
  }
  componentDidMount(){
    this.props.getGoodsList()
    this.props.getCategoryList()
  }

  componentWillReceiveProps(){

  }

  // 商品种类单击事件
  categoryClick(e){
    console.log(e);
    this.setState({
      category: e.key
    })
    this.props.getGoodsList(this.state.navType,this.state.low_price,this.state.high_price, e.key, this.state.searchContent)
  }

  // 导航栏点击事件
  topNavClick = (e) => {
    this.setState({
      topCurrent: e.key,
    });
    switch (e.key) {
      case 'default':
        this.setState({
          navType: 1
        })
        this.props.getGoodsList(1,this.state.low_price,this.state.high_price,this.state.category, this.state.searchContent)
        break;
      case 'price:1':
        this.setState({
          navType: 2
        })
        this.props.getGoodsList(2,this.state.low_price,this.state.high_price,this.state.category, this.state.searchContent)
        break;
      case 'price:2':
        this.setState({
          navType: 3
        })
        this.props.getGoodsList(3,this.state.low_price,this.state.high_price,this.state.category, this.state.searchContent)
        break;

    }
  }

  // 导航栏价格输入框change事件
  priceChange(type,e){
    switch (type) {
      case 1:
        this.setState({
          low_price: e
        })
        break;
      case 2:
        this.setState({
          high_price: e
        })
        break;
    }
  }

  // 价格搜索确定按钮
  searchClick(e){
    if(this.state.low_price <= this.state.high_price){
      this.props.getGoodsList(this.state.navType,this.state.low_price,this.state.high_price,this.state.category, this.state.searchContent)
    }else{
      this.props.getGoodsList(this.state.navType,this.state.low_price,null,this.state.category, this.state.searchContent)
    }

  }
  // 商品搜索按钮
  searchGoodsClick(v){
    console.log(v)
    this.setState({
      searchContent: v
    })
    this.props.getGoodsList(this.state.navType,this.state.low_price,null,this.state.category,v)
  }

  render(){
    const data = {
      name: "iphone Xs",
      former_price: 9999,
      now_price: 8888,
      desc: "九成新、外观完好",
      time: 1548997077,
      img: ""
    }
    const list = this.props.goods.goodsList
    let content = [];
    if(list!==null&&list!==undefined){
      for(let i=0; i < list.length / 4 + 1 ; i++){
        content.push(<Row gutter={16}>
          <Col className="gutter-row" span={6}><GoodsCard data={list[i*4]} /></Col>
          <Col className="gutter-row" span={6}><GoodsCard data={list[i*4+1]} /></Col>
          <Col className="gutter-row" span={6}><GoodsCard data={list[i*4+2]} /></Col>
          <Col className="gutter-row" span={6}><GoodsCard data={list[i*4+3]} /></Col>
        </Row>)
      }
    }

    let menu = [];
    // menu.push(<Menu.Item key="-1">
    //   <Icon type="setting" />
    //     <span>全部</span>
    //   </Menu.Item>)
    if(this.props.goods.category!=undefined&&this.props.goods.category!=null){
      this.props.goods.category.map((item) => (
        menu.push(
          <Menu.Item key={item._id}>
            <span>{item.title}</span>
          </Menu.Item>)
      ))
      // menu = this.props.goods.category.map((item) => {
      //   let subMenu = item.child.map((subItem) =>{
      //     return (
      //       <Menu.Item key={subItem._id}>{subItem.title}</Menu.Item>
      //     )
      //   })
      //
      //   return (
      //     <SubMenu key={item._id} title={<span><span>{item.title}</span></span>}>
      //       {subMenu}
      //     </SubMenu>
      //
      //   )
      // })


    }

    return (
      <div>
        <Row>
          <Col span={6}>
            <Menu
              mode="inline"
              theme="dark"
              onClick={(e)=>this.categoryClick(e)}
              selectedKeys={[this.state.category]}
              defaultSelectedKeys={['-1']}
            >
            {menu}
            </Menu>
          </Col>
          <Col span={18}>
            <Menu
            onClick={this.topNavClick}
            mode="horizontal"
            selectedKeys={[this.state.topCurrent]}

            >
              <Menu.Item key="default">
                综合排序
              </Menu.Item>
              <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />价格</span>}>
                <MenuItemGroup>
                  <Menu.Item key="price:1"><Icon type="up" />价格从低到高</Menu.Item>
                  <Menu.Item key="price:2"><Icon type="down" />价格从高到低</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
              <Menu.Item key="price-range">
                <InputNumber placeholder="￥" value={this.state.low_price} onChange={(e)=>this.priceChange(1,e)} style={{ width: 80 }}/>-
                <InputNumber placeholder="￥" value={this.state.high_price} onChange={(e)=>this.priceChange(2,e)} style={{ width: 80 }}/>
                <Button type="danger" onClick={(e)=>this.searchClick(e)}>确定</Button>
              </Menu.Item>
              <Search
                placeholder="搜索"
                onSearch={value => this.searchGoodsClick(value)}
                style={{ width: 150 }}
              />
            </Menu>
            <div className="goods-card-container">
              {content}

            </div>
          </Col>
        </Row>

      </div>

    )
  }
}
export default GoodsPage
