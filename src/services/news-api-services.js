import { API_URL } from '../config';
import axios from 'axios';

export default class NewsApiServices {
  getNews = async () => {
    const { data: news, status } = await axios.get(
      `${API_URL}newstories.json`
    );
    return status === 200 && news ? news : [];
  };
  getNewsById = async (id) => {
    const { data: news, status } = await axios.get(
      `${API_URL}item/${id}.json?print=pretty`
    );
    return status === 200 && news ? news : [];
  };
}
