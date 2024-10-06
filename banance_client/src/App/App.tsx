import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { store } from '../store/index'
import { Provider } from 'react-redux'
import { AppRouter } from '../components/AppRouter/AppRouter';
import { Loading } from '../components/Loading/Loading';
import { Footer } from '../components/Footer/Footer';

function App() {

  // window.document.addEventListener<any>('offline', () => {
  //   alert('dsf')
  // })


  return (
    <Suspense fallback={<Loading/>}>  
      <BrowserRouter>
          <Provider store={store}>
            <AppRouter />
            <Footer></Footer>
          </Provider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
