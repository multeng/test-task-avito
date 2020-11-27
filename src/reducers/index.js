const initialState = {
  newsList: [],
  loading: true,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEWS_REQUESTED':
      return {
        newsList: [],
        loading: true,
        error: null,
      };
    case 'NEWS_LOADED':
      return {
        newsList: action.payload,
        loading: false,
        error: null,
      };
    case 'NEWS_ERROR': {
      return {
        newsList: [],
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
