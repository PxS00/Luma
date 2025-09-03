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

/**
 * Componente base de carrossel reutilizável
 * Sistema completo com controles laterais, indicadores e autoplay
 * Suporta navegação manual e automática com loop infinito
 * Usado como base para carrosseis de tutorial e membros
 */
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
    // src/components/Carrossel/CarrosselBase.tsx
    <div className={`relative w-full ${className ?? ''}`}>
      <div className='flex justify-center'>
        {/* ↓ wrapper relativo do card */}
        <div className='relative w-full max-w-[420px] md:max-w-[480px]'>
          {/* slide atual */}
          <div className='transition-opacity duration-500 ease-out'>{renderItem(indice)}</div>

          {/* CONTROLES LATERAIS — AGORA aqui dentro */}
          {showControls && total > 1 && (
            <>
              {/* ESQUERDA = VOLTAR */}
              <BtnAcao
                variant='icon'
                onClick={anterior}
                aria-label='Anterior'
                className='
    absolute -left-14 md:-left-20
    top-1/2 -translate-y-1/2 z-10
    w-10 h-10 md:w-12 md:h-12
    flex items-center justify-center rounded-full
    bg-backBtn text-white
  '
              >
                <span aria-hidden className='text-2xl leading-none'>
                  ‹
                </span>
              </BtnAcao>

              {/* DIREITA = AVANÇAR */}
              <BtnAcao
                variant='icon'
                onClick={proximo}
                aria-label='Próximo'
                className='
    absolute -right-14 md:-right-20
    top-1/2 -translate-y-1/2 z-10
    w-10 h-10 md:w-12 md:h-12
    flex items-center justify-center rounded-full
    bg-backBtn text-white
  '
              >
                <span aria-hidden className='text-2xl leading-none'>
                  ›
                </span>
              </BtnAcao>
            </>
          )}
        </div>
      </div>

      {/* indicadores */}
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
