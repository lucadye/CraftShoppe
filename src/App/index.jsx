import {
  useLocation,
  Outlet,
} from 'react-router-dom';
import { formatPath, extractQueryParams } from '../helpers'

import Header from '../Header';
import Footer from '../Footer';

import {GoogleAuthCallback} from '../Router/GoogleAuth';

function App() {
  if (extractQueryParams(window.location.href)) {
    return <GoogleAuthCallback/>;
  }
  const path = formatPath(useLocation().pathname);
  return (<>
    <Header currentPage={path} />
    <div className="false-header" />
    <main><Outlet/></main>
    <Footer />
  </>);
}

export default App;
