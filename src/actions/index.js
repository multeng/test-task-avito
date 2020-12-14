const newsListLoaded = (newNews) => {
  return {
    type: 'FETCH_NEWS_LIST_SUCCESS',
    payload: newNews,
  };
};

const newsListRequested = () => {
  return {
    type: 'FETCH_NEWS_LIST_REQUEST',
  };
};

const newsListError = () => {
  return {
    type: 'FETCH_NEWS_LIST_FAILURE',
  };
};

const fetchNewsList = (newsServiсe, dispatch) => async () => {
  try {
    dispatch(newsListRequested());
    const newsNumbers = await newsServiсe.getNews();
    const newsObjects = await Promise.all(
      newsNumbers.map(newsServiсe.getNewsById)
    );
    dispatch(newsListLoaded(newsObjects));
  } catch (error) {
    dispatch(newsListError(error));
  }
};

const newsLoaded = (newNews) => {
  return {
    type: 'FETCH_NEWS_SUCCESS',
    payload: newNews,
  };
};

const newsRequested = () => {
  return {
    type: 'FETCH_NEWS_REQUEST',
  };
};

const newsError = () => {
  return {
    type: 'FETCH_NEWS_FAILURE',
  };
};

const commentsRequested = () => {
  return {
    type: 'FETCH_COMMENTS_REQUEST',
  };
};
const commentsLoaded = (comments) => {
  return {
    type: 'FETCH_COMMENTS_SUCCESS',
    payload: comments,
  };
};
const commentsError = () => {
  return {
    type: 'FETCH_COMMENTS_FAILURE',
  };
};

const fetchComments = async (newsServiсe, id, dispatch) => {
  try {
    dispatch(commentsRequested());
    const news = await newsServiсe.getNewsById(+id);
    console.log(news);
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
    const comments = await getData(news.kids);
    dispatch(commentsLoaded(comments));
  } catch (error) {
    dispatch(commentsError(error));
  }
};

const fetchNews = async (newsServiсe, id, dispatch) => {
  try {
    dispatch(newsRequested());
    const news = await newsServiсe.getNewsById(+id);
    dispatch(newsLoaded(news));
  } catch (error) {
    dispatch(newsError(error));
  }
};

export { fetchNewsList, fetchNews, fetchComments };
