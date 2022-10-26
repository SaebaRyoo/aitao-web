import Header from '@/src/components/header';
import { sum } from '@/src/utils/sum';
import React from 'react';
import img1 from '@/public/imgs/ryo.jpeg';
import img2 from '@/public/imgs/乱菊.jpeg';
import img3 from '@/public/imgs/weather.jpeg';

const Home: React.FC = () => {
  return (
    <div>
      Home
      <Header title="header" />
      <div>Hello william 1 + 2 = {sum(1, 2)}</div>
      <img src={img1} />
      <img src={img2} />
      <img src={img3} />
      <br />
      <i className="iconfont icon-goods" style={{ color: '#ff0000' }}></i>
    </div>
  );
};

export default Home;
