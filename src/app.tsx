import * as React from 'react';
import { SpinLoading } from 'antd-mobile';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { store } from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback={<SpinLoading color="primary" />}>
          <Router />
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
