# 🏥 Luma - Plataforma Digital de Saúde

<div align="center">
  <img src="./src/assets/img/logo/lumahc.svg" alt="LumaHC Logo" width="200" height="200" />
  
  <p><strong>Porque cuidar também é inovar</strong></p>
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![React Icons](https://img.shields.io/badge/React_Icons-5.4.0-E91E63?style=for-the-badge&logo=react&logoColor=white)](https://react-icons.github.io/react-icons/)
  [![Quarkus](https://img.shields.io/badge/Quarkus-Java-4695EB?style=for-the-badge&logo=quarkus&logoColor=white)](https://quarkus.io/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
  [![Render](https://img.shields.io/badge/Render-API-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
</div>

---

## 📋 Sobre o Projeto

LumaHC é uma plataforma digital inovadora desenvolvida para simplificar o acesso à saúde digital, garantindo rapidez, cuidado e inclusão em cada teleconsulta.
Com um sistema de agendamento intuitivo, autenticação segura e tutoriais interativos, LumaHC é a solução ideal para quem busca praticidade e eficiência no cuidado com a saúde.


### 🎯 Principais Funcionalidades

- **📅 Sistema de Agendamento**: Calendário interativo para gerenciar lembretes médicos
- **👤 Autenticação de Usuários**: Sistema completo de cadastro e login com API Java
- **📧 Notificações por Email**: Lembretes enviados automaticamente por email (requer Quarkus local)
- **🎓 Tutoriais Interativos**: Guias passo-a-passo para cadastro e teleconsulta
- **📱 Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **♿ Acessibilidade**: Menu de acessibilidade, integração VLibras e navegação otimizada
- **🎥 Verificações de Sistema**: Testes de câmera, microfone e conexão de rede
- **💬 Sistema de Contato**: Canais diretos de comunicação com suporte
- **👨‍⚕️ Perfil de Usuário**: Gerenciamento de dados pessoais

---

## 🚀 Tecnologias Utilizadas

### Frontend Core
- **React 18.2.0**: Biblioteca principal para criação da interface
- **TypeScript 5.9.2**: Linguagem de programação com tipagem estática
- **Vite 7.1.7**: Build tool e servidor de desenvolvimento
- **React Router DOM 7.8.1**: Gerenciamento de rotas da aplicação

### Backend API
- **Quarkus (Java)**: Framework backend para APIs RESTful
- **⚠️ Funcionalidade completa**: A integração de lembretes com envio de email funciona apenas via localhost do Quarkus
- **Endpoints disponíveis**:
  - `/user` - Gerenciamento de usuários
  - `/login` - Autenticação
  - `/EmailReminder` - Sistema de lembretes por email

### Deploy e Hospedagem
- **Vercel**: Plataforma de deploy do frontend (https://luma-teal.vercel.app)
- **Render**: Plataforma de deploy do backend API (https://luma-wu46.onrender.com)

### Estilização
- **TailwindCSS 4.0.0**: Framework CSS utilitário para estilização
- **React Icons 5.5.0**: Biblioteca de ícones vetoriais para interface
- **Design System**: Componentes reutilizáveis e consistentes

### Formulários e Validação
- **React Hook Form 7.62.0**: Gerenciamento eficiente de formulários

### Recursos Multimídia e Acessibilidade
- **MediaPipe Face Detection 0.4.1646425229**: Detecção facial para verificação
- **React Webcam 7.2.0**: Captura de vídeo e imagem
- **React Voice Visualizer 2.0.8**: Visualização de áudio para testes de microfone
- **React Use Face Detection 1.0.2**: Hook para detecção facial
- **VLibras**: Integração para tradução em LIBRAS

### Qualidade de Código
- **ESLint 9.33.0**: Linter para garantir qualidade do código
- **Prettier 3.6.2**: Formatador automático de código
- **TypeScript ESLint 8.39.1**: Integração ESLint com TypeScript
---

## 👥 Integrantes da Equipe

| Nome                           | RM      | Turma   | GitHub                                        | LinkedIn                                                                |
| ------------------------------ | ------- | ------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| Alexander Dennis Isidro Mamani | 565554  | 1TDSPG  | [alex-isidro](https://github.com/alex-isidro) | [LinkedIn](https://www.linkedin.com/in/alexander-dennis-a3b48824b/)     |
| Kelson Zhang                   | 563748  | 1TDSPG  | [KelsonZh0](https://github.com/KelsonZh0)     | [LinkedIn](https://www.linkedin.com/in/kelson-zhang-211456323/)         |
| Lucas Rossoni Dieder           | 563770  | 1TDSPG  | [PxS00](https://github.com/PxS00)             | [LinkedIn](https://www.linkedin.com/in/lucas-rossoni-dieder-32242a353/) |

---

## 🖼️ Galeria de Imagens

### 🎨 Logo e Identidade Visual
<div align="center">
  <img src="./src/assets/img/logo/lumahc.svg" alt="Logo LumaHC" width="150" />
</div>

### 🔧 Ícones da Interface
- **React Icons**: Ícones vetoriais SVG para ações e navegação
- **Navegação Temporal**: FaArrowLeft/Right para calendário
- **Navegação de Carrosséis**: IoIosArrowBack/Forward para tutoriais e integrantes
- **Ações**: Botões de ação claramente identificáveis
- **Status**: Indicadores visuais de estado do sistema

### 📚 Tutoriais Ilustrados
O projeto inclui uma biblioteca completa de imagens tutoriais para:
- **Processo de Cadastro**: Guias visuais passo-a-passo
- **Teleconsulta**: Instruções detalhadas para videochamadas
- **Navegação**: Orientações de uso da plataforma

---

## 📁 Estrutura do Projeto

```
LumaHC/
├── 📁 public/                          # Arquivos públicos estáticos
│   ├── favicon.svg                     # Ícone do site
│   ├── 404.html                        # Página de erro 404
│   ├── 500.html                        # Página de erro 500
│   └── 📁 mediapipe/                   # Arquivos do MediaPipe
│       └── 📁 face_detection/          # Modelos de detecção facial
├── 📁 src/                            # Código fonte principal
│   ├── 📁 assets/                     # Recursos estáticos
│   │   ├── images.ts                  # Exportações de imagens
│   │   └── 📁 img/                    # Imagens organizadas por categoria
│   │       ├── 📁 avatares/           # Avatares do sistema
│   │       ├── 📁 icones/             # Ícones da interface
│   │       ├── 📁 integrantes/        # Fotos da equipe
│   │       ├── 📁 logo/               # Logotipos
│   │       └── 📁 passo-a-passo/      # Imagens dos tutoriais
│   ├── 📁 components/                 # Componentes reutilizáveis
│   │   ├── 📁 AccessibilityMenu/      # Menu de acessibilidade
│   │   ├── 📁 Button/                 # Componentes de botão
│   │   ├── 📁 Cards/                  # Componentes de cartão
│   │   ├── 📁 Carrossel/              # Carrossel de imagens
│   │   ├── 📁 Check/                  # Verificações de sistema
│   │   │   ├── FaceCheck.tsx          # Verificação facial
│   │   │   ├── MicrophoneCheck.tsx    # Verificação de microfone
│   │   │   └── NetworkCheck.tsx       # Verificação de rede
│   │   ├── 📁 ChooseModeTabs/         # Tabs para seleção de modo
│   │   ├── 📁 ContatoComponents/      # Componentes de contato
│   │   ├── 📁 Faq/                    # Componentes de FAQ
│   │   ├── 📁 Footer/                 # Rodapé
│   │   ├── 📁 Form/                   # Formulários
│   │   ├── 📁 Header/                 # Cabeçalho e navegação
│   │   ├── 📁 HomeComponents/         # Componentes da página inicial
│   │   ├── 📁 IntegrantesComponents/  # Componentes da equipe
│   │   ├── 📁 Schedule/               # Sistema de agendamento
│   │   ├── 📁 Spinner/                # Componente de loading
│   │   ├── 📁 Toast/                  # Notificações
│   │   ├── 📁 ToggleSection/          # Seções expansíveis
│   │   ├── 📁 Tutorial/               # Componentes de tutorial
│   │   └── 📁 VLibrasInit/            # Inicialização do VLibras
│   ├── 📁 config/                     # Configurações
│   │   ├── homeCards.ts               # Configuração de cards da home
│   │   └── navigation.ts              # Configuração de navegação
│   ├── 📁 constants/                  # Constantes da aplicação
│   │   ├── a11y.ts                    # Constantes de acessibilidade
│   │   └── tutorialSteps.ts           # Passos dos tutoriais
│   ├── 📁 data/                       # Dados estáticos
│   │   ├── contactsData.ts            # Dados de contato
│   │   ├── faqData.ts                 # Perguntas frequentes
│   │   ├── feedbackData.ts            # Dados de feedback
│   │   └── membersData.ts             # Dados dos integrantes
│   ├── 📁 hooks/                      # Hooks customizados
│   │   ├── useAccessibility.ts        # Hook de acessibilidade
│   │   ├── useAuth.ts                 # Hook de autenticação
│   │   ├── useCarousel.ts             # Hook de carrossel
│   │   ├── useCarouselNavigation.ts   # Hook de navegação do carrossel
│   │   ├── useNetworkStatus.ts        # Hook de status de rede
│   │   ├── useSchedule.ts             # Hook de agendamento
│   │   └── useTabs.ts                 # Hook de tabs
│   ├── 📁 routes/                     # Páginas da aplicação
│   │   ├── 📁 AuxilioCadastro/        # Tutorial de cadastro
│   │   ├── 📁 AuxilioTeleconsulta/    # Tutorial de teleconsulta
│   │   ├── 📁 Checks/                 # Página de verificações
│   │   ├── 📁 Contato/                # Página de contato
│   │   ├── 📁 Error/                  # Página de erro
│   │   ├── 📁 Faq/                    # Página de FAQ
│   │   ├── 📁 Formulario/             # Página de login/cadastro
│   │   ├── 📁 Home/                   # Página inicial
│   │   ├── 📁 Integrantes/            # Página da equipe
│   │   ├── 📁 Perfil/                 # Página de perfil do usuário
│   │   └── 📁 Schedule/               # Página de agendamento
│   ├── 📁 types/                      # Definições de tipos TypeScript
│   │   ├── accessibility.ts           # Tipos de acessibilidade
│   │   ├── button.ts                  # Tipos de botões
│   │   ├── card.ts                    # Tipos de cards
│   │   ├── carousel.ts                # Tipos de carrossel
│   │   ├── contact.ts                 # Tipos de contato
│   │   ├── faq.ts                     # Tipos de FAQ
│   │   ├── form.ts                    # Tipos de formulários
│   │   ├── member.ts                  # Tipos de membros
│   │   ├── navigation.ts              # Tipos de navegação
│   │   ├── network.ts                 # Tipos de rede
│   │   ├── reminder.ts                # Tipos de lembretes
│   │   ├── schedule.ts                # Tipos de agendamento
│   │   ├── searchBox.ts               # Tipos de busca
│   │   ├── socialNetwork.ts           # Tipos de redes sociais
│   │   ├── spinner.ts                 # Tipos de spinner
│   │   ├── tabs.ts                    # Tipos de tabs
│   │   ├── toast.ts                   # Tipos de toast
│   │   ├── tutorialStep.ts            # Tipos de passos do tutorial
│   │   └── ui.ts                      # Tipos de UI
│   ├── 📁 utils/                      # Funções utilitárias
│   │   ├── calendarUtils.ts           # Utilitários de calendário
│   │   ├── reminderStorage.ts         # Armazenamento de lembretes
│   │   ├── socialNetworks.ts          # Utilitários de redes sociais
│   │   ├── userStorage.ts             # Armazenamento de usuário
│   │   └── validators.ts              # Validadores
│   ├── App.tsx                        # Componente principal
│   ├── main.tsx                       # Ponto de entrada
│   └── index.css                      # Estilos globais
├── 📄 .prettierrc                     # Configuração Prettier
├── 📄 .prettierignore                 # Arquivos ignorados pelo Prettier
├── 📄 eslint.config.js                # Configuração ESLint
├── 📄 package.json                    # Dependências e scripts
├── 📄 tsconfig.json                   # Configuração TypeScript
├── 📄 tsconfig.app.json               # Configuração TypeScript (app)
├── 📄 tsconfig.node.json              # Configuração TypeScript (node)
├── 📄 vite.config.ts                  # Configuração Vite
├── 📄 vercel.json                     # Configuração Vercel
└── 📄 README.md                       # Documentação do projeto
```

### 🏗️ Arquitetura de Componentes

#### 🧱 Componentes Base
- **Button**: Variações de botões (primário, secundário, ação, navegação, menu, logout)
- **Form**: Campos de entrada, validação e formulários completos (Login e Cadastro)
- **Cards**: Elementos de apresentação de conteúdo
- **Check**: Componentes de verificação (Face, Microfone, Rede)
- **AccessibilityMenu**: Menu de opções de acessibilidade
- **VLibrasInit**: Inicializador do plugin VLibras

#### 🔄 Hooks Customizados
- **useSchedule**: Gerenciamento do sistema de agendamento com integração API
- **useCarousel**: Controle de carrosséis de imagem
- **useCarouselNavigation**: Navegação específica para carrosséis
- **useTabs**: Navegação entre abas
- **useAuth**: Gerenciamento de autenticação de usuários
- **useAccessibility**: Controle de recursos de acessibilidade
- **useNetworkStatus**: Monitoramento de status de conexão

#### 📊 Gerenciamento de Estado
- **localStorage**: Persistência de dados do usuário e lembretes
- **useState/useEffect**: Estados locais e efeitos
- **useNavigate/useParams**: Navegação e roteamento
- **API Integration**: Comunicação com backend Java/Quarkus

---

## 🔧 Configuração da API Backend

### 🌐 API em Produção (Render)
A aplicação está configurada para usar a API hospedada no Render:
- **URL Base**: `https://luma-wu46.onrender.com`
- **Status**: ✅ Funcionando para autenticação e gerenciamento de usuários
- **Limitação**: ⚠️ Envio de emails de lembrete não funciona no ambiente do Render

### 💻 API Local (Desenvolvimento Completo)
Para funcionalidade completa, incluindo envio automático de emails:

1. **Clone o repositório da API Java/Quarkus** (separado) - na mesma organização do GitHub
2. **Configure as variáveis de ambiente** para servidor SMTP
3. **Execute o Quarkus localmente**:
   ```bash
   ./mvnw quarkus:dev
   ```
4. **A API estará disponível em**: `http://localhost:8080`
5. **Altere a URL base** nos arquivos de integração para usar localhost

**Arquivos que fazem chamadas à API**:
- `src/components/Form/FormCadastro.tsx`
- `src/components/Form/FormLogin.tsx`
- `src/hooks/useSchedule.ts`

---

## ️ Instalação e Configuração

### 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **pnpm** (recomendado)

### 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Challenge-2025-1-TDSPG/LumaHC.git
   cd LumaHC
   ```

2. **Instale as dependências**
   ```bash
   # Usando npm
   npm install
   
   # Usando pnpm (recomendado)
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   # Usando npm
   npm run dev
   
   # Usando pnpm
   pnpm dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

### 🏗️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento
pnpm build            # Gera build de produção
pnpm preview          # Visualiza build de produção

# Qualidade de Código
pnpm lint             # Executa linting
pnpm lint:fix         # Corrige problemas automaticamente
pnpm format           # Formata código com Prettier
pnpm check            # Verifica lint + formato
pnpm fix              # Corrige lint + formato
```

---

## 🌟 Funcionalidades Detalhadas

### 🔌 Integração com API Backend
- **Deploy no Render**: https://luma-wu46.onrender.com
- **Endpoints REST**: 
  - `POST /user` - Cadastro de usuários
  - `PUT /user/{id}` - Atualização de usuários
  - `GET /user` - Listagem de usuários
  - `POST /login` - Autenticação
  - `POST /EmailReminder` - Criação de lembretes com email
  - `GET /EmailReminder/{userId}` - Busca de lembretes por usuário
  - `DELETE /EmailReminder/{id}` - Exclusão de lembretes
- **⚠️ Limitação**: O envio automático de emails de lembrete funciona completamente apenas quando o Quarkus está rodando localmente
- **Tecnologia**: Java com Quarkus Framework

### � Sistema de Agendamento
- **Calendário Interativo**: Navegação entre meses
- **Lembretes Personalizados**: Criação, edição e exclusão
- **Integração com API**: Sincronização de lembretes com backend
- **Notificações por Email**: Envio automático de emails de lembrete (localhost)
- **Validações Inteligentes**: Prevenção de agendamentos no passado
- **Persistência Local**: Dados salvos no localStorage
- **Feedback Visual**: Notificações toast para ações

### 🔐 Autenticação
- **Cadastro de Usuários**: Formulário com validações e integração API
- **Login Seguro**: Sistema de autenticação com backend
- **Atualização de Dados**: Edição de informações do usuário
- **Navegação Protegida**: Redirecionamento automático
- **Estado de Sessão**: Controle de usuário logado via localStorage
- **Perfil de Usuário**: Página dedicada para gerenciamento de dados
- **⚠️ Nota de Segurança**: Por se tratar de um projeto acadêmico/MVP, os dados do usuário (incluindo CPF, data de nascimento, nome, email e telefone) são armazenados no localStorage do navegador. Em um ambiente de produção real, isso deveria ser substituído por cookies httpOnly, tokens JWT seguros e armazenamento server-side para dados sensíveis.

### 🎥 Verificações de Sistema
- **Verificação Facial**: Detecção de rosto usando MediaPipe
- **Teste de Microfone**: Visualização de áudio em tempo real
- **Teste de Rede**: Verificação de conectividade
- **Feedback Visual**: Indicadores claros de status para cada verificação

### ♿ Recursos de Acessibilidade
- **Menu de Acessibilidade**: Painel com opções de personalização
- **VLibras**: Tradução automática para LIBRAS
- **Navegação por Teclado**: Suporte completo
- **Contraste e Tamanho de Fonte**: Ajustes personalizáveis
- **Leitores de Tela**: Compatibilidade com tecnologias assistivas

### 📱 Design Responsivo
- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints Adaptativos**: sm, md, lg, xl
- **Touch Friendly**: Elementos otimizados para toque
- **Performance**: Carregamento otimizado

---

## 🔒 Segurança e Considerações

### ⚠️ Armazenamento de Dados (Projeto Acadêmico)
Este é um **MVP desenvolvido para fins educacionais**. As seguintes práticas foram utilizadas para simplificar o desenvolvimento:

**Dados armazenados no localStorage:**
- ✅ Token de autenticação
- ✅ CPF do usuário
- ✅ Data de nascimento (usada como senha)
- ✅ Nome, email e telefone
- ✅ ID do usuário

**⚠️ Limitações de Segurança:**
- O localStorage é acessível via JavaScript, tornando-o vulnerável a ataques XSS
- Dados sensíveis não são criptografados no cliente
- Tokens não expiram automaticamente no cliente

**✅ Recomendações para Produção:**
- Usar **httpOnly cookies** para tokens de autenticação
- Implementar **refresh tokens** com rotação automática
- Armazenar apenas dados não-sensíveis no localStorage (preferências de UI, tema, etc.)
- Implementar **hash bcrypt** para senhas reais (não usar data de nascimento)
- Adicionar **HTTPS obrigatório** em produção
- Implementar **rate limiting** nas APIs
- Usar **Content Security Policy (CSP)** headers

### 🔐 Autenticação Atual
O sistema atual usa **CPF + Data de Nascimento** como credenciais. Esta é uma abordagem simplificada para o MVP acadêmico e não deve ser replicada em ambientes de produção.

---

## 🔗 Links Importantes

### 🌐 Deploy da Aplicação
**🔗 [LumaHC - Vercel](https://luma-teal.vercel.app)**

> Aplicação em produção hospedada no Vercel. Acesse para testar todas as funcionalidades da plataforma.

### 📂 Repositório GitHub
**🔗 [LumaHC](https://github.com/Challenge-2025-1-TDSPG/LumaHC)**

> Repositório oficial do projeto contendo todo o código fonte, documentação técnica, histórico de commits e releases.

### 🎥 Vídeo Demonstrativo
**🔗 [VIDEO](https://youtu.be/YbVsfcAf3M8)**

> Vídeo completo demonstrando todas as funcionalidades da plataforma, processo de desenvolvimento e apresentação da equipe.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do programa da FIAP. Todos os direitos reservados à equipe de desenvolvimento.

---

<div align="center">
  <p><strong>Desenvolvido com ❤️ pela equipe UsGuriDev</strong></p>
  <p><em>FIAP - Análise e Desenvolvimento de Sistemas - 2025</em></p>
</div>