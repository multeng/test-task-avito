const newsLoaded = (newNews) => {
  return {
    type: 'NEWS_LOADED',
    payload: newNews,
  };
};

const newsRequested = () => {
  return {
    type: 'NEWS_REQUESTED',
  };
};

const newsError = (error) => {
  return {
    type: 'NEWS_ERROR',
    payload: error,
  };
};

export { newsLoaded, newsRequested, newsError };
