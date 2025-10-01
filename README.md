# 🏥 LumaHC - Plataforma Digital de Saúde

<div align="center">
  <img src="./src/assets/img/logo/lumahc.svg" alt="LumaHC Logo" width="200" height="200" />
  
  <p><strong>Porque cuidar também é inovar</strong></p>
  
  [![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 📋 Sobre o Projeto

LumaHC é uma plataforma digital inovadora desenvolvida para simplificar o acesso à saúde digital, garantindo rapidez, cuidado e inclusão em cada teleconsulta.
Com um sistema de agendamento intuitivo, autenticação segura e tutoriais interativos, LumaHC é a solução ideal para quem busca praticidade e eficiência no cuidado com a saúde.


### 🎯 Principais Funcionalidades

- **📅 Sistema de Agendamento**: Calendário interativo para gerenciar lembretes médicos
- **👤 Autenticação de Usuários**: Sistema completo de cadastro e login
- **🎓 Tutoriais Interativos**: Guias passo-a-passo para cadastro e teleconsulta
- **📱 Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **♿ Acessibilidade**: Navegação otimizada para todos os usuários
- **💬 Sistema de Contato**: Canais diretos de comunicação com suporte

---

## 🚀 Tecnologias Utilizadas

### Frontend Core
- **React 19.1.1**: Biblioteca principal para criação da interface
- **TypeScript 5.9.2**: Linguagem de programação com tipagem estática
- **Vite 7.1.7**: Build tool e servidor de desenvolvimento
- **React Router DOM 7.8.1**: Gerenciamento de rotas da aplicação

### Estilização
- **TailwindCSS 4.0.0**: Framework CSS utilitário para estilização
- **Design System**: Componentes reutilizáveis e consistentes

### Formulários e Validação
- **React Hook Form 7.62.0**: Gerenciamento eficiente de formulários

### Qualidade de Código
- **ESLint 9.33.0**: Linter para garantir qualidade do código
- **Prettier 3.6.2**: Formatador automático de código
- **TypeScript ESLint 8.39.1**: Integração ESLint com TypeScript
---

## 👥 Integrantes da Equipe

| Nome                           | RM      | GitHub                                        | LinkedIn                                                                |
| ------------------------------ | ------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| Alexander Dennis Isidro Mamani | 565554  | [alex-isidro](https://github.com/alex-isidro) | [LinkedIn](https://www.linkedin.com/in/alexander-dennis-a3b48824b/)     |
| Kelson Zhang                   | 563748  | [KelsonZh0](https://github.com/KelsonZh0)     | [LinkedIn](https://www.linkedin.com/in/kelson-zhang-211456323/)         |
| Lucas Rossoni Dieder           | 563770  | [PxS00](https://github.com/PxS00)             | [LinkedIn](https://www.linkedin.com/in/lucas-rossoni-dieder-32242a353/) |

---

## 🖼️ Galeria de Imagens

### 🎨 Logo e Identidade Visual
<div align="center">
  <img src="./src/assets/img/logo/lumahc.svg" alt="Logo LumaHC" width="150" />
</div>

### 📱 Avatares do Sistema
<div align="center">
  <img src="./src/assets/img/avatares/pessoa.svg" alt="Avatar Pessoa" width="60" />
  <img src="./src/assets/img/avatares/celular.svg" alt="Avatar Celular" width="60" />
  <img src="./src/assets/img/avatares/user.svg" alt="Avatar User" width="60" />
</div>

### 🔧 Ícones da Interface
- **Navegação**: Ícones intuitivos para menu e navegação
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
│   └── favicon.svg                     # Ícone do site
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
│   │   ├── 📁 Button/                 # Componentes de botão
│   │   ├── 📁 Cards/                  # Componentes de cartão
│   │   ├── 📁 Carrossel/              # Carrossel de imagens
│   │   ├── 📁 ContatoComponents/      # Componentes de contato
│   │   ├── 📁 Faq/                    # Componentes de FAQ
│   │   ├── 📁 Footer/                 # Rodapé
│   │   ├── 📁 Form/                   # Formulários
│   │   ├── 📁 Header/                 # Cabeçalho e navegação
│   │   ├── 📁 HomeComponents/         # Componentes da página inicial
│   │   ├── 📁 IntegrantesComponents/  # Componentes da equipe
│   │   ├── 📁 Schedule/               # Sistema de agendamento
│   │   ├── 📁 Toast/                  # Notificações
│   │   ├── 📁 ToggleSection/          # Seções expansíveis
│   │   └── 📁 Tutorial/               # Componentes de tutorial
│   ├── 📁 config/                     # Configurações
│   ├── 📁 constants/                  # Constantes da aplicação
│   ├── 📁 data/                       # Dados estáticos
│   ├── 📁 hooks/                      # Hooks customizados
│   ├── 📁 routes/                     # Páginas da aplicação
│   │   ├── 📁 AuxilioCadastro/        # Tutorial de cadastro
│   │   ├── 📁 AuxilioTeleconsulta/    # Tutorial de teleconsulta
│   │   ├── 📁 Contato/                # Página de contato
│   │   ├── 📁 Error/                  # Página de erro
│   │   ├── 📁 Faq/                    # Página de FAQ
│   │   ├── 📁 Formulario/             # Página de login/cadastro
│   │   ├── 📁 Home/                   # Página inicial
│   │   ├── 📁 Integrantes/            # Página da equipe
│   │   └── 📁 Schedule/               # Página de agendamento
│   ├── 📁 types/                      # Definições de tipos TypeScript
│   ├── 📁 utils/                      # Funções utilitárias
│   ├── App.tsx                        # Componente principal
│   ├── main.tsx                       # Ponto de entrada
│   └── index.css                      # Estilos globais
├── 📄 package.json                    # Dependências e scripts
├── 📄 tsconfig.json                   # Configuração TypeScript
├── 📄 vite.config.ts                  # Configuração Vite
├── 📄 tailwind.config.js              # Configuração TailwindCSS
└── 📄 README.md                       # Documentação do projeto
```

### 🏗️ Arquitetura de Componentes

#### 🧱 Componentes Base
- **Button**: Variações de botões (primário, secundário, ação, navegação)
- **Form**: Campos de entrada, validação e formulários completos
- **Cards**: Elementos de apresentação de conteúdo

#### 🔄 Hooks Customizados
- **useSchedule**: Gerenciamento do sistema de agendamento
- **useCarousel**: Controle de carrosséis de imagem
- **useTabs**: Navegação entre abas

#### 📊 Gerenciamento de Estado
- **localStorage**: Persistência de dados do usuário
- **useState/useEffect**: Estados locais e efeitos
- **useNavigate/useParams**: Navegação e roteamento

---

## 🛠️ Instalação e Configuração

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

### 📅 Sistema de Agendamento
- **Calendário Interativo**: Navegação entre meses
- **Lembretes Personalizados**: Criação, edição e exclusão
- **Validações Inteligentes**: Prevenção de agendamentos no passado
- **Persistência Local**: Dados salvos no localStorage
- **Feedback Visual**: Notificações toast para ações

### 🔐 Autenticação
- **Cadastro de Usuários**: Formulário com validações
- **Login Seguro**: Sistema de autenticação
- **Navegação Protegida**: Redirecionamento automático
- **Estado de Sessão**: Controle de usuário logado

### 📱 Design Responsivo
- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints Adaptativos**: sm, md, lg, xl
- **Touch Friendly**: Elementos otimizados para toque
- **Performance**: Carregamento otimizado

---

## 🔗 Links Importantes

### 📂 Repositório GitHub
**🔗 [LumaHC](https://github.com/Challenge-2025-1-TDSPG/LumaHC)**

> Repositório oficial do projeto contendo todo o código fonte, documentação técnica, histórico de commits e releases.

### 🎥 Vídeo Demonstrativo
**🔗 [VIDEO](https://www.youtube.com/watch?v=QG2uodvpidY)**

> Vídeo completo demonstrando todas as funcionalidades da plataforma, processo de desenvolvimento e apresentação da equipe.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do programa da FIAP. Todos os direitos reservados à equipe de desenvolvimento.

---

<div align="center">
  <p><strong>Desenvolvido com ❤️ pela equipe LumaHC</strong></p>
  <p><em>FIAP - Análise e Desenvolvimento de Sistemas - 2025</em></p>
</div>