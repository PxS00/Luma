export type Contato = {
  titulo: string;
  presencial?: string;
  email?: string;
  tel?: string;
  funcionamento?: string;
  linkExterno?: { href: string; rotulo: string }; // opcional p/ "FALE CONOSCO"
};

export const contatos: Contato[] = [
  {
    titulo: 'IMREA VILA MARIANA',
    presencial: 'Sala da Ouvidoria/Térreo.',
    email: 'ouvidoria.vlmariana.imrea@hc.fm.usp.br',
    tel: '(11) 5180-7800',
    funcionamento: 'De segunda à sexta-feira das 7h30 às 15h30.',
  },
  {
    titulo: 'IMREA UMARIZAL',
    presencial: 'Sala da Ouvidoria/Térreo',
    email: 'ouvidoria.umarizal.imrea@hc.fm.usp.br',
    tel: '(11) 2392-2600',
    funcionamento: 'De segunda à sexta-feira das 9h às 11h e das 14h às 16h.',
  },
  {
    titulo: 'IMREA LAPA',
    presencial: 'Procure informações na recepção central da unidade.',
    email: 'ouvidoria.lapa.imrea@hc.fm.usp.br',
    tel: '(11) 3803-4600',
    funcionamento: 'De segunda à sexta-feira das 8h às 11h30 e das 14h30 às 16h30.',
  },
  {
    titulo: 'IMREA CLÍNICAS',
    email: 'ouvidoria.clinicas.imrea@hc.fm.usp.br',
  },
  {
    titulo: 'IRLM MORUMBI',
    presencial: 'Sala da Ouvidoria/1º Andar.',
    email: 'ouvidoria.morumbi.imrea@hc.fm.usp.br',
    tel: '(11) 3905-8500 ou 3905-8700',
    funcionamento: 'De segunda à quinta-feira das 8h30 às 17h, e sexta-feira das 8h30 às 18h.',
  },
  {
    titulo: 'FALE CONOSCO',
    linkExterno: {
      href: 'https://redelucymontoro.org.br/site/fale-conosco/',
      rotulo: 'Acessar página',
    },
  },
];
