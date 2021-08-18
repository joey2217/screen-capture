import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/home'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/share" component={lazy(() => import('./pages/share'))} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
