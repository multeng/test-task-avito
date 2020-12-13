import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Comment, Spin } from 'antd';
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

const CommentsList = ({ commentsId, newsServiсe }) => {
  const [loadingComments, setLoadingComments] = useState(true);
  const [comments, setComments] = useState([]);
  const getData = async (kids) => {
    const data = await Promise.all(
      kids.map(async (el) => {
        const commentObject = await newsServiсe.getNewsById(el);
        if (commentObject.kids) {
          commentObject.kids = await getData(commentObject.kids);
        }
        return commentObject;
      })
    );
    setLoadingComments(false);
    return data;
  };

  useAsync(async () => {
    const fetchedComments = await getData(commentsId);
    setComments(fetchedComments);
  }, [commentsId]);
  return loadingComments ? (
    <div style={{ width: 100, height: 100 }}>
      <Spin tip='Loading...' size='large' />
    </div>
  ) : (
    <>
      {comments.map((el) => (
        <CommentItem key={el.id} {...el} />
      ))}
    </>
  );
};

export default WithNewsService()(CommentsList);
