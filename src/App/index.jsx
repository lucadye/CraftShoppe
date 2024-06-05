import { useState } from 'react';
import {
  useLocation,
  Outlet,
} from 'react-router-dom';
import { formatPath } from '../helpers'

import Header from '../Header';
import Footer from '../Footer';

function App() {
  const path = formatPath(useLocation().pathname);
  return (<>
    <Header currentPage={path} />
    <div className="false-header" />
    <main><Outlet/></main>
    <Footer />
  </>);
}

export default App;
