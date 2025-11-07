export type FeedbackItem = {
  name: string;
  role: string;
  text: string;
};

export const feedbacks: FeedbackItem[] = [
  {
    name: 'Maria A.',
    role: 'Paciente',
    text: 'Consegui fazer minha teleconsulta sem dificuldades. O suporte guiou tudo passo a passo.',
  },
  {
    name: 'João P.',
    role: 'Paciente',
    text: 'A ferramenta de diagnóstico foi muito útil. Minha câmera e áudio funcionaram perfeitamente.',
  },
  {
    name: 'Sônia R.',
    role: 'Paciente',
    text: 'A experiência foi simples e rápida. Recomendaria para quem tem dificuldades com tecnologia.',
  },
];
