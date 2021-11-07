import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

// TODO: 将package.json整理  分出devdependencies
const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router />
      </React.Suspense>
    </BrowserRouter>
  );
};
export default App;
