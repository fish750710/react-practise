import { Routes, Route, Link, RouteObject, routerConifg, useRoutes } from 'react-router-dom';
import routerConfig from 'routes';

function App() {
  const elements = useRoutes(routerConfig);
  return (
    <div className="App">
      {elements}
      {/* <Routes>
        <Route path="/" element={<Home />} >
          <Route path="main" element={<Main />} />
          <Route path="about" element={<About />} /> 
          <Route path="invoices" element={<Invoices />}>
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route path="*" element={<Login />}></Route>  
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
