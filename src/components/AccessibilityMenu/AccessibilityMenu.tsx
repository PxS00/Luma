import { useState } from 'react';
import { IoAccessibilitySharp } from 'react-icons/io5';
import { A11Y_MENU_ITEMS, type A11yActionKey } from '../../constants/a11y';
import { useAccessibility } from '../../hooks/useAccessibiliuty';

export default function AccessibilityMenu() {
  const { incFont, decFont, toggle, reset, tts, libras } = useAccessibility();
  const [open, setOpen] = useState(false);

  const actions: Record<A11yActionKey, () => void> = {
    incFont,
    decFont,
    grayscale: () => toggle('grayscale'),
    contrast:  () => toggle('contrast'),
    invert:    () => toggle('invert'),
    light:     () => toggle('light'),
    readable:  () => toggle('readable'),
    tts,
    libras,
    reset,
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000] flex flex-col items-end">
      <button
        className="bg-orange-500 text-white rounded-full w-14 h-14 text-2xl shadow-lg flex items-center justify-center transition-colors hover:bg-orange-600"
        aria-label="Abrir menu de acessibilidade"
        onClick={() => setOpen(v => !v)}
        type="button"
      >
        <IoAccessibilitySharp size={28} />
      </button>

      <div
        className={`${open
            ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
            : 'opacity-0 pointer-events-none translate-y-5 scale-95'
          } bg-white rounded-xl shadow-2xl mb-2 p-6 min-w-[260px] flex flex-col gap-2 transition-all duration-300 ease-[cubic-bezier(0.4,2,0.6,1)]`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="flex items-center gap-3 mb-3">
          <IoAccessibilitySharp size={28} className="text-orange-500" />
          <span className="font-bold text-lg text-gray-900">Luma Acessível</span>
        </div>

        <ul className="list-none m-0 p-0">
          {A11Y_MENU_ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <li key={it.key}>
                <button
                  type="button"
                  onClick={actions[it.key]}
                  className={`w-full flex items-center gap-3 py-2 border-b border-gray-100 text-base text-gray-900 transition-colors hover:bg-gray-100 text-left ${
                    i === A11Y_MENU_ITEMS.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <Icon size={22} className="text-orange-500" />
                  <span>{it.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
