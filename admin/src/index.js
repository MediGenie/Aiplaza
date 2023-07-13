import React from 'react';
import { render } from 'react-dom';
// 12/18 폴리필
import 'element-closest-polyfill';
import 'raf/polyfill';

// 04/15 immer
import { enableES5 } from 'immer';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/antd.css';
enableES5();
// 02/04 fetch
// import "whatwg-fetch";

// window.fetch();

import App from '@app/index';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

// https://developer.mozilla.org/ko/docs/Web/API/NodeList/forEach
NodeList.prototype.forEach = function (callback, thisArg) {
  thisArg = thisArg || window;
  for (var i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this);
  }
};
// https://stackoverflow.com/questions/16813469/javascript-method-foreach-not-supported-from-internet-explorer
Array.prototype.forEach = function (fn, scope) {
  for (var i = 0, len = this.length; i < len; ++i) {
    fn.call(scope, this[i], i, this);
  }
};

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,

  document.querySelector('#root')
);
