import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from './layout/Layout';
import Integrantes from '../pages/Integrantes';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/integrantes" element={<Integrantes />} />
          {/* <Route path="/contato" element={<Contato />} />
          <Route path="/faq" element={<Faq />} /> */}
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
