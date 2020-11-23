import NewsApiServices from './services/news-api-services';

const newApi = new NewsApiServices();

const test = async () => {
  const data = await newApi.getNews().then((data) => data.slice(0, 100));
  const news = await newApi.getNewsById(25177045);
  const news1 = await newApi.getNewsById(25177235);
  const news2 = await newApi.getNewsById(25177226);
  const news3 = await newApi.getNewsById(25177223);
  const news4 = await newApi.getNewsById(25177216);
  const news5 = await newApi.getNewsById(25177158);

  console.log(data);
  console.log(news);
  console.log(news1);
  console.log(news2);
  console.log(news3);
  console.log(news4);
  console.log(news5);
};
test();
