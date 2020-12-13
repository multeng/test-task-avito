const defaultNews = {
  by: null,
  title: null,
  time: null,
  url: null,
  kids: [],
  score: null,
};

const initialState = {
  news: defaultNews,
  loading: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_REQUEST':
      return {
        news: defaultNews,
        loading: true,
        error: false,
      };
    case 'FETCH_NEWS_SUCCESS':
      return {
        news: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_NEWS_FAILURE':
      return {
        news: defaultNews,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
