// src/components/Carrossel/CarrosselBase.tsx
import type { ReactNode } from 'react';
import BtnAcao from '@components/Botao/BtnAcao';
import { useCarrossel } from '@/hooks/useCarrosel';

type Props = {
  total: number;
  renderItem: (i: number) => ReactNode;
  autoMs?: number;
  loop?: boolean;
  showIndicators?: boolean;
  showControls?: boolean;
  className?: string;
};

export default function CarrosselBase({
  total,
  renderItem,
  autoMs = 0,
  loop = true,
  showIndicators = true,
  showControls = true,
  className,
}: Props) {
  const { indice, proximo, anterior, irPara } = useCarrossel(total, { autoMs, loop });
  if (!total) return null;

  return (
    <div className={`relative w-full ${className ?? ''}`}>
      <div className='overflow-hidden'>
        <div className='transition-opacity duration-500 ease-out'>{renderItem(indice)}</div>
      </div>

      {showControls && total > 1 && (
        <div className='mt-4 flex gap-3 justify-center'>
          <BtnAcao variant='icon' onClick={anterior} aria-label='Anterior'>
            ‹
          </BtnAcao>
          <BtnAcao variant='icon' onClick={proximo} aria-label='Próximo'>
            ›
          </BtnAcao>
        </div>
      )}

      {showIndicators && total > 1 && (
        <div className='mt-3 flex justify-center gap-2'>
          {Array.from({ length: total }).map((_, i) => (
            <BtnAcao
              key={i}
              variant='dot'
              onClick={() => irPara(i)}
              aria-label={`Ir para item ${i + 1}`}
              aria-pressed={i === indice}
              className={i === indice ? 'bg-fontPrimary' : 'bg-black/30'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
