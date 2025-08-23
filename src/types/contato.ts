export type Contato = {
  titulo: string;
  presencial?: string;
  email?: string;
  tel?: string;
  funcionamento?: string;
  linkExterno?: { href: string; rotulo: string };
};