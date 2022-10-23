import * as React from 'react';

type HeaderProp = {
  title: string;
};

const Header: React.FC<HeaderProp> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default Header;
