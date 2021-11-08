import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { store } from './store';
import { Provider } from 'react-redux';

// TODO: 将package.json整理  分出devdependencies
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Router />
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
