// src/app.tsx
import React from 'react'
import style from './index.scss'
import Test from 'components/Test'

const App:React.FC<any> = () => {
  return (
    <div className={style.app}>
      <Test name='321' age={3}/>
    </div>
  )
}

export default App