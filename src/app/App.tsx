import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../routes/Home';
import Layout from './layout/Layout';
import Integrantes from '../routes/Integrantes';
import Faq from '../routes/Faq';
import Contato from '../routes/Contato';
import AuxilioTeleconsulta from '../routes/AuxilioTeleconsulta';
import AuxilioCadastro from '../routes/AuxilioCadastro';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/integrantes' element={<Integrantes />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/teleconsulta' element={<AuxilioTeleconsulta />} />
          <Route path='/cadastro' element={<AuxilioCadastro/>} />
          <Route path='*' element={<div>Página não encontrada</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
