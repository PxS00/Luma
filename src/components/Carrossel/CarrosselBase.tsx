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
      {/* centraliza tudo */}
      <div className='flex justify-center'>
        {/* wrapper com a largura do card */}
        <div className='relative max-w-[700px] w-full'>
          {/* item atual */}
          <div className='transition-opacity duration-500 ease-out'>{renderItem(indice)}</div>
        </div>

        {/* CONTROLES LATERAIS */}
        {showControls && total > 1 && (
          <>
            <BtnAcao
              variant='icon'
              onClick={anterior}
              aria-label='Anterior'
              className='absolute left-60 top-1/2 -translate-y-1/2 z-10 
             w-15 h-15 flex items-center justify-center text-6xl rounded-full bg-backBtn text-white'
            >
              <span className='inline-block w-6 h-17 text-center'>‹</span>
            </BtnAcao>

            <BtnAcao
              variant='icon'
              onClick={proximo}
              aria-label='Próximo'
              className='absolute right-60 top-1/2 -translate-y-1/2 z-10 
             w-15 h-15 flex items-center justify-center text-6xl rounded-full bg-backBtn text-white'
            >
              <span className='inline-block w-5 h-17 text-center'>›</span>
            </BtnAcao>
          </>
        )}
      </div>

      {/* indicadores (bolinhas) embaixo */}
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
