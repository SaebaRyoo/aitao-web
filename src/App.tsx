import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { sum } from '@/src/utils/sum';
import Header from './components/header';
import img1 from '@/public/imgs/ryo.jpeg';
import img2 from '@/public/imgs/乱菊.jpeg';
import img3 from '@/public/imgs/weather.jpeg';

const App: React.FC = () => {
  return (
    <>
      <Header title="header" />
      <div>Hello william 1 + 2 = {sum(1, 2)}</div>
      <img src={img1} />
      <img src={img2} />
      <img src={img3} />
      <br />
      <i className="iconfont icon-goods" style={{ color: '#ff0000' }}></i>
      {/* <span className="iconfont icon-goods"></span> */}
    </>
  );
};

export default hot(App);
