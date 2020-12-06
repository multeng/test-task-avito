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

const newsListError = (error) => {
  return {
    type: 'FETCH_NEWS_LIST_FAILURE',
    payload: error,
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

const newsError = (error) => {
  return {
    type: 'FETCH_NEWS_FAILURE',
    payload: error,
  };
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

export { fetchNewsList, fetchNews };
