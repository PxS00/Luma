export type FaqType = {
  pergunta: string;
  resposta: string;
  link?: string;
};

export const faqDados: FaqType[] = [
  {
    pergunta: 'Como funciona a teleconsulta?',
    resposta:
      'Você será atendido por um especialista por vídeo, usando seu celular ou computador, no horário agendado.',
  },
  {
    pergunta: 'Preciso instalar algum aplicativo?',
    resposta:
      'O uso do aplicativo Portal do Paciente HC não é obrigatório em todos os casos, mas é altamente recomendado. Com ele, você pode acessar facilmente os agendamentos, links para a teleconsulta e receber notificações importantes.',
  },
  {
    pergunta: 'E se eu não souber usar o celular?',
    resposta:
      'Você pode receber ajuda de um familiar. Também oferecemos vídeos e suporte técnico para facilitar seu acesso.',
    link: 'https://www.youtube.com/watch?v=rT9U8HlXaRw',
  },
  {
    pergunta: 'Minhas informações estão seguras?',
    resposta:
      'Sim, seguimos protocolos rigorosos de segurança e privacidade, conforme as diretrizes do Ministério da Saúde.',
  },
  {
    pergunta: 'Quem posso procurar em caso de dúvidas?',
    resposta:
      'Você pode entrar em contato com a equipe de apoio da unidade do IMREA que acompanha seu tratamento.',
  },
];
