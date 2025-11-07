import { Camera } from '@mediapipe/camera_utils';
import FaceDetection from '@mediapipe/face_detection';
import { useEffect, useMemo, useRef, useState } from 'react';
import { type CameraOptions, useFaceDetection } from 'react-use-face-detection/build';
import Webcam from 'react-webcam';

type FaceCheckProps = {
  /** Chamado uma única vez quando o enquadramento está OK (estável por ~600ms). */
  onPass?: () => void;
  /** Emite o status atual para uso em “Resumo”: { ok, facesDetected } */
  onResult?: (r: { ok: boolean; facesDetected: number }) => void;
};

/**
 * Componente de teste de enquadramento para teleconsulta
 * Usa MediaPipe via react-use-face-detection. Mantida sua lógica original.
 */
export default function FaceCheck({ onPass, onResult }: FaceCheckProps) {
  // Dimensões base do preview (usadas pela câmera). Visualmente o preview
  // será responsivo via CSS (max-width + aspect-ratio) para evitar overflow
  // em telas pequenas.
  const width = 640;
  const height = 480;

  const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
    mirrored: false,
    faceDetectionOptions: { model: 'short' },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file: string) => `${import.meta.env.BASE_URL}mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }: CameraOptions) =>
      new Camera(mediaSrc, { onFrame, width, height }),
  });

  // Avaliação do enquadramento (inalterada)
  const guidance = useMemo(() => {
    if (!detected || !boundingBox.length) {
      return {
        status: 'Ajuste seu enquadramento',
        tips: [
          'Centralize seu rosto na área indicada.',
          'Mantenha os olhos visíveis e olhe para a câmera.',
          'Prefira um local bem iluminado (luz de frente).',
        ],
        ok: false,
      } as const;
    }

    const box = boundingBox[0];
    const sizeOk = box.width >= 0.25 && box.width <= 0.6 && box.height >= 0.25 && box.height <= 0.6;
    const centerX = box.xCenter + box.width / 2;
    const centerY = box.yCenter + box.height / 2;
    const centeredOk = Math.abs(centerX - 0.5) <= 0.12 && Math.abs(centerY - 0.5) <= 0.12;

    if (sizeOk && centeredOk) {
      return {
        status: 'Perfeito! Você está pronto para a teleconsulta.',
        tips: ['Mantenha-se nessa posição e com boa iluminação.'],
        ok: true,
      } as const;
    }

    const tips: string[] = [];
    if (!sizeOk) tips.push('Ajuste a distância: afaste-se ou aproxime-se um pouco.');
    if (!centeredOk) tips.push('Centralize melhor o rosto dentro da moldura.');

    return {
      status: 'Quase lá! Faça pequenos ajustes.',
      tips: tips.length ? tips : ['Centralize e ajuste a distância até a moldura.'],
      ok: false,
    } as const;
  }, [detected, boundingBox]);

  // Debounce visual
  const [uiGuidance, setUiGuidance] = useState(guidance);
  const lastUpdateRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  // NOVO: disparo estável de onPass + emissão de onResult
  const passedRef = useRef(false);
  const okTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const now = performance.now();
    const interval = 300; // ms
    const remaining = interval - (now - lastUpdateRef.current);

    const apply = () => {
      setUiGuidance(guidance);
      lastUpdateRef.current = performance.now();

      // emite resultado contínuo (para “Resumo”)
      onResult?.({ ok: guidance.ok, facesDetected });

      // dispara onPass uma única vez se ficar OK por ~600ms
      if (guidance.ok && !passedRef.current) {
        if (okTimerRef.current) window.clearTimeout(okTimerRef.current);
        okTimerRef.current = window.setTimeout(() => {
          if (!passedRef.current && guidance.ok) {
            passedRef.current = true;
            onPass?.();
          }
        }, 600);
      } else if (!guidance.ok && okTimerRef.current) {
        // se sair de OK, cancela agendamento
        window.clearTimeout(okTimerRef.current);
        okTimerRef.current = null;
      }
    };

    if (remaining <= 0) {
      apply();
    } else {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(apply, remaining);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (okTimerRef.current) window.clearTimeout(okTimerRef.current);
    };
  }, [guidance, facesDetected, onPass, onResult]);

  return (
    <section
      aria-label='Teste de enquadramento facial para teleconsulta'
      className='w-full flex flex-col items-center gap-4'
    >
      <header className='text-center'>
        <h1 className='text-lg sm:text-2xl font-semibold text-foreground'>
          Teste de Enquadramento
        </h1>
        <p className='text-sm text-foreground/70'>
          Autorize o uso da câmera para iniciarmos o teste.
        </p>
      </header>

      {/* Vídeo + overlays - responsivo: usa aspect-ratio para escalar em mobile */}
      <div
        className='relative rounded-lg overflow-hidden bg-black w-full max-w-[360px] sm:max-w-[640px] aspect-4/3'
        aria-live='polite'
      >
        {/* Moldura guia */}
        <div
          aria-hidden
          className='absolute z-10 border-2 border-green-400/70 rounded-lg pointer-events-none'
          style={{
            left: `${((1 - 0.7) / 2) * 100}%`,
            top: `${((1 - 0.7) / 2) * 100}%`,
            width: `${0.7 * 100}%`,
            height: `${0.7 * 100}%`,
          }}
        />

        {/* Bounding boxes */}
        {boundingBox.map((box, idx) => {
          // Reduzir padding em mobile para evitar quadrado muito grande
          const paddingX = window.innerWidth < 640 ? 0.02 : 0.1;
          const paddingY = window.innerWidth < 640 ? 0.01 : 0.05;
          const w = (box.width + paddingX) * 100;
          const h = (box.height + paddingY) * 100;
          const top = (box.yCenter - paddingY / 2) * 100;
          const left = (box.xCenter - paddingX / 2) * 100;
          return (
            <div
              key={`bb-${idx}`}
              className='absolute z-20 border-[1.5px] sm:border-2 border-red-500 rounded'
              style={{ top: `${top}%`, left: `${left}%`, width: `${w}%`, height: `${h}%` }}
              role='img'
              aria-label='Área do rosto detectado'
            />
          );
        })}

        {/* Webcam*/}
        <Webcam
          ref={webcamRef}
          audio={false}
          width={width}
          height={height}
          screenshotFormat='image/jpeg'
          mirrored
          videoConstraints={{ width, height, facingMode: 'user' }}
          className='absolute inset-0 h-full w-full'
        />
      </div>

      {/* Status e dicas */}
      {/* Se não usa tokens, troque:
          bg-surface -> bg-white
          border-border -> border-slate-200
          text-foreground -> text-slate-800
      */}
      <div className='w-full max-w-3xl p-3 sm:p-6 rounded-lg bg-surface shadow border border-border min-h-20'>
        <p
          className={`text-base sm:text-lg font-medium ${uiGuidance.ok ? 'text-green-600' : 'text-yellow-700'}`}
        >
          {isLoading ? 'Carregando modelo de detecção…' : uiGuidance.status}
        </p>
        <ul className='mt-2 list-disc pl-5 text-sm sm:text-base text-foreground/80'>
          {uiGuidance.tips.map((t, i) => (
            <li key={`tip-${i}`}>{t}</li>
          ))}
          <li>{`Rostos detectados: ${facesDetected}`}</li>
        </ul>
      </div>
    </section>
  );
}
