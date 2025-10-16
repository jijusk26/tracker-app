import React from 'react';
import { Provider } from 'react-redux';
import Main from './main';
import { store } from './src/helpers/store/store';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
export default App;
