const initialState = {
  newsList: [],
  loading: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_LIST_REQUEST':
      return {
        newsList: [],
        loading: true,
        error: false,
      };
    case 'FETCH_NEWS_LIST_SUCCESS':
      return {
        newsList: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_NEWS_LIST_FAILURE': {
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
