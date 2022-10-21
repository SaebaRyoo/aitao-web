import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { sum } from '@/src/utils/sum'
import Header from './components/header'

const App: React.FC = () => {
  return (
    <>
      <Header title="header" />
      <div>Hello william 1 + 2 = {sum(1, 2)}</div>
    </>
  )
}

export default hot(App)
