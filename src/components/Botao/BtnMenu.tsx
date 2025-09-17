import HamburgerIcon from "../Header/HanburgerIcon";

type BtnMenu= {
  open: boolean;
  onClick: () => void;
};

export default function BtnMenu({ open, onClick }: BtnMenu) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded hover:bg-gray-700"
      aria-label={open ? "Fechar menu" : "Abrir menu"}
    >
      <HamburgerIcon open={open} className="w-6 h-6 text-white" />
    </button>
  );
}
