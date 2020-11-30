const initialState = {
  newsList: [],
  loading: true,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_REQUEST':
      return {
        newsList: [],
        loading: true,
        error: null,
      };
    case 'FETCH_NEWS_SUCCESS':
      return {
        newsList: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_NEWS_FAILURE': {
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
