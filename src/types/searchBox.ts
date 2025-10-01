export type SearchBox = {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  className?: string;
};
