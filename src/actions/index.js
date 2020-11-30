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

const fetchNews = (newsServise, dispacth) => async () => {
  try {
    dispacth(newsRequested());
    const newsNumbers = await newsServise.getNews();
    const newsObjects = await Promise.all(
      newsNumbers.map(newsServise.getNewsById)
    );
    dispacth(newsLoaded(newsObjects));
  } catch (error) {
    dispacth(newsError(error));
  }
};

export { fetchNews };
