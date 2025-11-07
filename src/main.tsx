import App from '@/App';
import AuxilioCadastro from '@routes/AuxilioCadastro';
import AuxilioTeleconsulta from '@routes/AuxilioTeleconsulta';
import Contato from '@routes/Contato';
import Error from '@routes/Error';
import Faq from '@routes/Faq';
import Home from '@routes/Home';
import Integrantes from '@routes/Integrantes';
import Perfil from '@routes/Perfil';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Formulario from './routes/Formulario';
import Schedule from './routes/Schedule';

/**
 * Configuração das rotas da aplicação
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/faq', element: <Faq /> },
      { path: '/integrantes', element: <Integrantes /> },
      { path: '/contato', element: <Contato /> },
      { path: '/auxilio/cadastro', element: <AuxilioCadastro /> },
      { path: '/auxilio/teleconsulta', element: <AuxilioTeleconsulta /> },
      { path: '/formulario', element: <Formulario /> },
      { path: '/formulario/:tab', element: <Formulario /> },
      { path: '/lembrete', element: <Schedule /> },
      { path: '/perfil', element: <Perfil /> },
    ],
  },
]);

/**
 * Ponto de entrada da aplicação React
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
