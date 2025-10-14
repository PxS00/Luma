import { useState } from 'react';
import { BsCircleHalf } from 'react-icons/bs';
import { FaHands } from 'react-icons/fa';
import { IoAccessibilitySharp } from 'react-icons/io5';
import {
  MdOutlineContrast,
  MdOutlineInvertColors,
  MdRecordVoiceOver,
  MdRestore,
  MdTextFields,
  MdWbSunny,
  MdZoomIn,
  MdZoomOut,
} from 'react-icons/md';
// import './AccessibilityMenu.css';
const menuItems = [
  {
    label: 'Aumentar Texto',
    icon: MdZoomIn,
  },
  {
    label: 'Reduzir Texto',
    icon: MdZoomOut,
  },
  {
    label: 'Modo Escala de Cinza',
    icon: BsCircleHalf,
  },
  {
    label: 'Contraste Alto',
    icon: MdOutlineContrast,
  },
  {
    label: 'Contraste Negativo',
    icon: MdOutlineInvertColors,
  },
  {
    label: 'Fundo Claro',
    icon: MdWbSunny,
  },
  {
    label: 'Narração de Texto',
    icon: MdRecordVoiceOver,
  },
  {
    label: 'Tradução em Libras',
    icon: FaHands,
  },
  {
    label: 'Fonte Mais Legível',
    icon: MdTextFields,
  },
  {
    label: 'Restaurar Padrão',
    icon: MdRestore,
  },
];

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className='fixed bottom-8 right-8 z-[1000] flex flex-col items-end'>
      {/* Botão flutuante para abrir/fechar o menu */}
      <button
        className='bg-orange-500 text-white rounded-full w-14 h-14 text-2xl shadow-lg flex items-center justify-center transition-colors hover:bg-orange-600'
        aria-label='Abrir menu de acessibilidade'
        onClick={() => setOpen((v) => !v)}
        type='button'
      >
        <IoAccessibilitySharp size={28} />
      </button>
      {/* Menu expansível */}
      <div
        className={`${
          open
            ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
            : 'opacity-0 pointer-events-none translate-y-5 scale-95'
        } bg-white rounded-xl shadow-2xl mb-2 p-6 min-w-[260px] flex flex-col gap-2 transition-all duration-300 ease-[cubic-bezier(0.4,2,0.6,1)]`}
      >
        {/* Cabeçalho do menu */}
        <div className='flex items-center gap-3 mb-3'>
          <IoAccessibilitySharp size={28} className='text-orange-500' />
          <span className='font-bold text-lg text-gray-900'>Luma Acessível</span>
        </div>
        <ul className='list-none m-0 p-0'>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className={`flex items-center gap-3 py-2 border-b border-gray-100 text-base text-gray-900 cursor-pointer transition-colors hover:bg-gray-100 ${
                  idx === menuItems.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <Icon size={22} className='text-orange-500' />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
