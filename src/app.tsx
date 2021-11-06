import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

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
