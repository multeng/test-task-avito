import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Comment } from 'antd';
import WithNewsService from '../hoc';

const CommentItem = ({ by, text, time, kids = [] }) => {
  return kids.length > 0 ? (
    <Comment
      author={by}
      content={text}
      actions={[<span key='comment-nested-reply-to'>Load more</span>]}
      datetime={new Date(time * 1000).toString().slice(0, 24)}
    >
      {kids.map((el) => (
        <CommentItem {...el} />
      ))}
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
    return data;
  };

  useAsync(async () => {
    const fetchedComments = await getData(commentsId);
    setComments(fetchedComments);
    console.log(fetchedComments);
  }, [commentsId]);
  return (
    <>
      {comments.map((el) => (
        <CommentItem key={el.id} {...el} />
      ))}
    </>
  );
};

export default WithNewsService()(CommentsList);
