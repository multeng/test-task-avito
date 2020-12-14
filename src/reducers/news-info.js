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
  commentsLoading: true,
  comments: [],
  commentsError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_REQUEST':
      return {
        ...state,
        news: defaultNews,
        loading: true,
        error: false,
      };
    case 'FETCH_NEWS_SUCCESS':
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_NEWS_FAILURE':
      return {
        ...state,
        news: defaultNews,
        loading: false,
        error: true,
      };
    case 'FETCH_COMMENTS_REQUEST':
      return {
        ...state,
        comments: [],
        commentsLoading: true,
        commentsError: false,
      };
    case 'FETCH_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.payload,
        commentsLoading: false,
        commentsError: false,
      };
    case 'FETCH_COMMENTS_FAILURE':
      return {
        ...state,
        comments: [],
        commentsLoading: false,
        commentsError: true,
      };
    default:
      return state;
  }
};

export default reducer;
