import React from 'react'
import {
  Row,
  Col,
  Carousel,
  List,
  Button,
  message,
  Input,
} from 'antd'
import './goodsDetail.css'
import { connect } from 'react-redux'
import { transformTime } from '../../utils.js'
import { findOneGoods, addChat, uploadComment, getComment } from '../../redux/goods.redux'
import SlideImg from '../../component/slideImg/slideImg'
import AlertList from '../../component/alertList/alertList'
import CommentEle from '../../component/comment/comment'


@connect(
  state=>state,
  { findOneGoods, addChat, uploadComment, getComment }
)
class GoodsDetail extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      commentText: '',
    }
  }
  componentDidMount(){
    const id = this.props.match.params.id
    this.props.findOneGoods(id)
    this.props.getComment(id)
  }

  commentClick(){
    if(this.state.commentText.trim()===''){
      message.info('评论信息不能为空')
    }else{
      this.props.uploadComment(this.state.commentText,this.props.goods._id)
    }

  }

  changeText(e){
    this.setState({
      commentText: e.target.value
    })
  }

  render(){
    const data = this.props.goods
    // const data = {
    //   id: 201902021548997077,
    //   name: 'Apple/苹果 iPhone Xs Max',
    //   former_price: 10999,
    //   now_price: 9999,
    //   time: transformTime(1548997077000),
    //   desc: '256G 移动联通电信全网通4G手机 双卡双待苹果Xsmax',
    //   num: 1,
    //   img: [img1,img2,img3,img4,img5],
    // }

    // const img_div = (data==null?:"")
    // console.log(img_div);
    // <img src={`${URL}/img/${data.img}`} width="100%"/>
    return (
      <div>
        {this.props.goods.cart_msg?<AlertList msg={this.props.goods.cart_msg}></AlertList>:null}

        <div>
          <Row>
            <Col span={6}>
              <SlideImg imgs={data.imgs}/>
            </Col>
            <Col span={18}>
              <List className="detail-list">
                <List.Item>{data.name}</List.Item>
                <List.Item><s>原价：{data.former_price}￥</s></List.Item>
                <List.Item>现价：{data.now_price}￥</List.Item>
                <List.Item>上架日期：{transformTime(data.time)}</List.Item>
                <List.Item>商品简介：{data.desc}</List.Item>
                <List.Item>
                  <Row>
                    <Button onClick={(e)=>this.handleAddChat(data._id,e)} shape="round" icon="shopping-cart" size="large" type="primary">加入购物车</Button>
                  </Row>

                </List.Item>
              </List>
            </Col>
          </Row>
          <Row>
            <div dangerouslySetInnerHTML={{
             __html: "<p><span style='color: rgb(255, 0, 0);'><em><strong>1111</strong></em><em><strong><img src='http://localhost:9093/img/iphone Xs.jpg' title='xxxx.jpg' alt='1.jpg'/></strong></em></span></p>"
             }}/>
          </Row>
          <Row>
            评论：
            <CommentEle goodsId={data._id} />
          </Row>
          <Row>
            <Input.TextArea value={this.state.commentText} onChange={(e)=>this.changeText(e)}></Input.TextArea>
            <Button onClick={()=>this.commentClick()}>确定</Button>
          </Row>
        </div>
      </div>
    )
  }

  handleAddChat(id, e){
    const user_id = this.props.user._id;
    this.props.addChat(id,user_id)
  }
}

export default GoodsDetail
