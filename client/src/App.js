import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { routes } from './routes';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          {routes.map(({ path, page: Page, isShowHeader }) => {
            const Layout = isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route key={path} path={path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
