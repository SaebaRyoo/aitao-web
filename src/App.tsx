import * as React from 'react';
import { sum } from '@/src/utils/sum';
import Header from './components/header';
import img1 from '@/public/imgs/ryo.jpeg';
import img2 from '@/public/imgs/乱菊.jpeg';
import img3 from '@/public/imgs/weather.jpeg';
import Root from './pages/root';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Root />
      {/* <Header title="header" />
      <div>Hello william 1 + 2 = {sum(1, 2)}</div>
      <img src={img1} />
      <img src={img2} />
      <img src={img3} />
      <br />
      <i className="iconfont icon-goods" style={{ color: '#ff0000' }}></i> */}
    </React.StrictMode>
  );
};

export default App;
