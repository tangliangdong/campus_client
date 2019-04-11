import React from 'react'
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Icon,
 } from 'antd';
import { Link,Switch,Route } from 'react-router-dom'
import GoodsPage from '../../container/goodsPage/goodsPage'
import IdentityPage from '../../container/identityPage/identityPage'
import ShopCart from '../../container/shopCart/shopCart'
import AddressPage from '../../container/address/address'
import placeAnOrder from '../../container/placeAnOrder/placeAnOrder'
import GoodsDetail from '../../container/goodsDetail/goodsDetail'
import OrderPage from '../../container/orderPage/orderPage'
const { Header, Content, Footer } = Layout;

class Root extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const pathName = this.props.location.pathname
    const Search = Input.Search;
    let selectedKeys = this.props.location.pathname
    let selectedKey = selectedKeys.substring(selectedKeys.lastIndexOf('/')+1)
    return (<Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selectedKey]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="index"><Link to="/index">商品</Link></Menu.Item>
          <Menu.Item key="identity"><Link to="/index/identity">个人中心</Link></Menu.Item>
          <Menu.Item key="shopCart"><Link to="/index/shopCart"><Icon type="shopping-cart" />购物车</Link></Menu.Item>
          <Menu.Item key="orderPage"><Link to="/index/orderPage"><Icon type="shopping-cart" />订单</Link></Menu.Item>
          <Menu.Item key="search">
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
            />
          </Menu.Item>

        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Switch>
            <Route path="/index" exact component={GoodsPage}></Route>
            <Route path="/index/identity" component={IdentityPage}></Route>
            <Route path="/index/detail/:id" component={GoodsDetail}></Route>
            <Route path="/index/shopCart" component={ShopCart}></Route>
            <Route path="/index/address" component={AddressPage}></Route>
            <Route path="/index/orderPage" component={OrderPage}></Route>
            <Route path="/index/order" component={placeAnOrder}></Route>
            <Route component={GoodsPage}></Route>
          </Switch>

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>)
  }
}

export default Root
