/**
 * Propriedades do componente SearchBox
 * Define os parâmetros aceitos para o campo de busca
 */
export type SearchBoxProps = {
  /** Estado de abertura/fechamento do campo de busca */
  open: boolean;
  /** Valor atual do campo de busca */
  value: string;
  /** Função chamada quando o valor muda */
  onChange: (v: string) => void;
  /** Função chamada ao submeter a busca */
  onSubmit: () => void;
  /** Função chamada para fechar o campo de busca */
  onClose: () => void;
  /** Classes CSS adicionais (opcional) */
  className?: string;
};
