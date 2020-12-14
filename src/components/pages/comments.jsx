import React, { useState } from 'react';
import { Comment } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import WithNewsService from '../hoc';

const CommentItem = ({ by, text, time, kids = [] }) => {
  const [open, setOpen] = useState(false);
  const [kidsComments, setKidsComments] = useState([]);

  const openComment = (data) => {
    setKidsComments(data);
    setOpen(true);
  };

  const closeComment = () => {
    setKidsComments([]);
    setOpen(false);
  };

  const makeMoreComment = (kids) => {
    const data = kids.map((el) => <CommentItem {...el} />);
    kidsComments.length === 0 ? openComment(data) : closeComment();
  };

  return kids.length > 0 ? (
    <Comment
      author={by}
      content={text}
      actions={[
        <span
          onClick={() => makeMoreComment(kids)}
          key='comment-nested-reply-to'
        >
          {open ? (
            <>
              Load less <CaretDownOutlined />
            </>
          ) : (
            <>
              Load more <CaretUpOutlined />
            </>
          )}
        </span>,
      ]}
      datetime={new Date(time * 1000).toString().slice(0, 24)}
    >
      {kidsComments}
    </Comment>
  ) : (
    <Comment
      author={by}
      content={text}
      datetime={new Date(time * 1000).toString().slice(0, 24)}
    />
  );
};

const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.map((el) => (
        <CommentItem key={el.id} {...el} />
      ))}
    </>
  );
};

export default WithNewsService()(CommentsList);
