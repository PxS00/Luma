import type { A11yPrefs } from '../types/accessibility';

import {
  MdZoomIn, MdZoomOut, MdOutlineContrast, MdOutlineInvertColors,
  MdWbSunny, MdRecordVoiceOver, MdTextFields, MdRestore,
} from 'react-icons/md';
import { BsCircleHalf } from 'react-icons/bs';
import { FaHands } from 'react-icons/fa';

export const DEFAULT_A11Y: A11yPrefs = {
  fontScale: 1,
  grayscale: false,
  contrast: false,
  invert: false,
  light: false,
  readable: false,
};

export const A11Y_MENU_ITEMS = [
  { key: 'incFont',   label: 'Aumentar Texto',        icon: MdZoomIn },
  { key: 'decFont',   label: 'Reduzir Texto',         icon: MdZoomOut },
  { key: 'grayscale', label: 'Modo Escala de Cinza',  icon: BsCircleHalf },
  { key: 'contrast',  label: 'Contraste Alto',        icon: MdOutlineContrast },
  { key: 'invert',    label: 'Contraste Negativo',    icon: MdOutlineInvertColors },
  { key: 'light',     label: 'Fundo Claro',           icon: MdWbSunny },
  { key: 'tts',       label: 'Narração de Texto',     icon: MdRecordVoiceOver },
  { key: 'libras',    label: 'Tradução em Libras',    icon: FaHands },
  { key: 'readable',  label: 'Fonte Mais Legível',    icon: MdTextFields },
  { key: 'reset',     label: 'Restaurar Padrão',      icon: MdRestore },
] as const;

export type A11yActionKey = typeof A11Y_MENU_ITEMS[number]['key'];
