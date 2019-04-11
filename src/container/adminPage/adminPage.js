import React from 'react'
import { connect } from 'react-redux'
import {
  Menu,
  Icon,
  Button,
  Layout,
} from 'antd';
import { Link,Switch,Route, Redirect } from 'react-router-dom'
import { getGoodsList } from '../../redux/goods.redux'
import { logout } from '../../redux/user.redux'
import GoodsManage from '../../container/goodsManage/goodsManage'
import OrderManage from '../../container/orderManage/orderManage'
import UserManage from '../../container/userManage/userManage'
import CategoryManage from '../../container/categoryManage/categoryManage'


const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

@connect(
  state=>state,
  { getGoodsList, logout }
)
class AdminPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      current: 'goods',
    }
  }


  // 导航栏点击事件
  topNavHandle = (e) => {
    this.setState({
      current: e.key,
    });
    switch (e.key) {
      case 'goods':
        // this.props.getGoodsList(1)
        break;
      case 'order_form':

        break;
      case 'user':

        break;

      default:

    }
  }

  logout(){
    this.props.logout()
  }

  render(){

    return (
      <Layout className="layout">
        <Redirect to={this.props.user.redirectTo}></Redirect>
        <Header>
          <Menu
          onClick={this.topNavHandle}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
            <Menu.Item key="goods">
              <Link to="/admin"><Icon type="shop" />商品管理</Link>
            </Menu.Item>
            <Menu.Item key="order_form">
              <Link to="/admin/order"><Icon type="file-text" />订单管理</Link>
            </Menu.Item>
            <Menu.Item key="category">
              <Link to="/admin/category"><Icon type="person" />分类管理</Link>
            </Menu.Item>
            <Menu.Item key="user">
              <Link to="/admin/user"><Icon type="person" />用户管理</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Button onClick={()=>this.logout()}>注销</Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Switch>
            <Route path="/admin" exact component={GoodsManage}></Route>
            <Route path="/admin/order" component={OrderManage}></Route>
            <Route path="/admin/category" component={CategoryManage}></Route>
            <Route path="/admin/user" component={UserManage}></Route>
          </Switch>

        </div>
      </Content>
      </Layout>
    )
  }
}

export default AdminPage
