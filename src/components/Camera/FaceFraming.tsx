import { Camera } from '@mediapipe/camera_utils';
import FaceDetection from '@mediapipe/face_detection';
import { useEffect, useMemo, useRef, useState } from 'react';
import { type CameraOptions, useFaceDetection } from 'react-use-face-detection/build';
import Webcam from 'react-webcam';

/**
 * Componente de teste de enquadramento para teleconsulta
 * Utiliza react-use-face-detection (MediaPipe) para detectar rostos via webcam
 * e fornece feedback visual e textual ao usuário para se posicionar corretamente.
 *
 * Observações técnicas:
 * - Libs: react-use-face-detection (hook), react-webcam, @mediapipe/face_detection e @mediapipe/camera_utils.
 * - Binários MediaPipe servidos localmente via pasta `public/mediapipe/face_detection`.
 */
export default function FaceFramingTest() {
  // Dimensões base do preview (podem ser ajustadas por responsividade via Tailwind)
  const width = 640;
  const height = 480;

  /**
   * Configuração do hook de detecção facial
   * - model: 'short' → mais rápido e adequado para webcam em tempo real
   * - mirrored: false → retorna coordenadas brutas do MediaPipe, sem inversão
   *   O espelhamento visual é feito apenas no <Webcam mirrored /> para UX
   * - locateFile: carrega assets do MediaPipe localmente (sem CDN)
   * - camera util: controla o onFrame com largura/altura desejadas
   */
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
    // Detecção SEM espelhamento (coordenadas brutas do MediaPipe)
    mirrored: false,
    faceDetectionOptions: { model: 'short' },
    faceDetection: new FaceDetection.FaceDetection({
      // Carrega os binários do MediaPipe localmente, respeitando BASE_URL do Vite
      locateFile: (file: string) => `${import.meta.env.BASE_URL}mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }: CameraOptions) =>
      new Camera(mediaSrc, { onFrame, width, height }),
  });

  // Cálculo de feedback com base no primeiro rosto detectado (se houver)
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
    // Proporções do rosto na tela (0..1)
    const sizeOk = box.width >= 0.25 && box.width <= 0.6 && box.height >= 0.25 && box.height <= 0.6;
    // xCenter/yCenter do hook são o canto superior esquerdo normalizado.
    // Para centralização, usamos o centro geométrico do retângulo.
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

  // Debounce para estabilizar UI e evitar flicker/"quebrar" o layout
  const [uiGuidance, setUiGuidance] = useState(guidance);
  const lastUpdateRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const now = performance.now();
    const interval = 300; // ms
    const remaining = interval - (now - lastUpdateRef.current);

    const apply = () => {
      setUiGuidance(guidance);
      lastUpdateRef.current = performance.now();
    };

    if (remaining <= 0) {
      apply();
    } else {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(apply, remaining);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [guidance]);

  return (
    <section
      aria-label='Teste de enquadramento facial para teleconsulta'
      className='w-full flex flex-col items-center gap-4'
    >
      <header className='text-center'>
        <h1 className='text-2xl font-semibold text-foreground'>Teste de Enquadramento</h1>
        <p className='text-sm text-foreground/70'>
          Autorize o uso da câmera para iniciarmos o teste.
        </p>
      </header>

      {/* Container do vídeo com overlay */}
      <div
        className='relative rounded-lg overflow-hidden bg-black'
        style={{ width, height }}
        aria-live='polite'
      >
        {/* Moldura guia (região alvo para o rosto) */}
        <div
          aria-hidden
          className='absolute z-10 border-2 border-green-400/70 rounded-lg pointer-events-none'
          style={{
            // Moldura central ocupando ~70% do quadro
            left: `${((1 - 0.7) / 2) * 100}%`,
            top: `${((1 - 0.7) / 2) * 100}%`,
            width: `${0.7 * 100}%`,
            height: `${0.7 * 100}%`,
          }}
        />

        {/* Desenho da(s) bounding box(es) detectada(s) */}
        {boundingBox.map((box, idx) => {
          // xCenter/yCenter do hook indicam o canto superior esquerdo (normalizado)
          // Aumentamos um pouco o tamanho para melhor visualização
          const paddingX = 0.1; // 10% de padding horizontal
          const paddingY = 0.05; // 5% de padding vertical (menor altura)
          const w = (box.width + paddingX) * 100;
          const h = (box.height + paddingY) * 100;
          const top = (box.yCenter - paddingY / 2) * 100;
          const left = (box.xCenter - paddingX / 2) * 100;
          return (
            <div
              key={`bb-${idx}`}
              className='absolute z-20 border-2 border-red-500 rounded'
              style={{ top: `${top}%`, left: `${left}%`, width: `${w}%`, height: `${h}%` }}
              role='img'
              aria-label='Área do rosto detectado'
            />
          );
        })}

        {/* Vídeo da webcam */}
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
      <div className='w-full max-w-screen-md p-4 rounded-lg bg-surface shadow border border-border min-h-24'>
        <p
          className={`text-base font-medium ${uiGuidance.ok ? 'text-green-600' : 'text-yellow-700'}`}
        >
          {isLoading ? 'Carregando modelo de detecção…' : uiGuidance.status}
        </p>
        <ul className='mt-2 list-disc pl-5 text-sm text-foreground/80'>
          {uiGuidance.tips.map((t, i) => (
            <li key={`tip-${i}`}>{t}</li>
          ))}
          <li>{`Rostos detectados: ${facesDetected}`}</li>
        </ul>
      </div>
    </section>
  );
}
