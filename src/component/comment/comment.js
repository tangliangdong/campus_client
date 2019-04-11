import React from 'react'
import {
  Row,
  Col,
  Avatar,
  List,
  Button,
  Comment,
  Tooltip
} from 'antd'
import { connect } from 'react-redux'
import { transformGrade } from '../../utils'
import { getComment } from '../../redux/goods.redux'
import browserCookie from 'browser-cookies'

import moment from 'moment';

@connect(
  state=>state,
  { getComment }
)
class CommentEle extends React.Component{

  componentDidMount(){
    console.log(this.props.goodsId);

  }

  render(){
    const data = this.props.goods.comments
    console.log(data);
    return (
      <div>
        {(data!==null&&data!==undefined?(<List
          className="comment-list"
          header={`${data.length} 评论`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <Comment
              author={item.user.nikeName}
              avatar={URL+'/avatar/'+item.user.avatar}
              content={item.content}
              datetime={<Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(item.add_time, 'milliseconds').fromNow()}</span>
              </Tooltip>}
            />
          )}
        />):'')}

      </div>
    )
  }
}

export default CommentEle
