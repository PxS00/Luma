import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';

/**
 * Componente de verificação de microfone para teleconsulta
 * Utiliza react-voice-visualizer para capturar e visualizar o áudio do microfone
 * em tempo real, fornecendo feedback visual ao usuário.
 *
 * Observações técnicas:
 * - Biblioteca: react-voice-visualizer (MIT License)
 * - Visualização em tempo real com Web Audio API
 * - Interface limpa, responsiva
 * - Zero configuração manual de áudio necessária
 */
export default function MicrophoneCheck() {
  // Hook do visualizador de voz com controles integrados
  const recorderControls = useVoiceVisualizer();

  const { isRecordingInProgress } = recorderControls;

  return (
    <section
      aria-label='Teste de microfone para teleconsulta'
      className='w-full flex flex-col items-center gap-6'
    >
      {/* Cabeçalho */}
      <header className='text-center'>
        <h2 className='text-2xl font-semibold text-fontTertiary flex items-center justify-center gap-2'>
          Teste de Microfone
          {isRecordingInProgress && (
            <span className='relative flex h-3 w-3'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
            </span>
          )}
        </h2>
        <p className='text-sm text-fontSecondary mt-1'>
          {isRecordingInProgress
            ? 'Fale normalmente para testar o volume do seu microfone'
            : 'Clique em "Iniciar" para começar o teste de microfone'}
        </p>
      </header>

      {/* Visualizador de áudio */}
      <div className='w-full max-w-2xl'>
        <VoiceVisualizer
          controls={recorderControls}
          height={200}
          width='100%'
          backgroundColor='#FAFAFA'
          mainBarColor='#B91C1C'
          secondaryBarColor='#DC2626'
          barWidth={3}
          gap={2}
          rounded={8}
          speed={2}
          isControlPanelShown={true}
          isDownloadAudioButtonShown={false}
          animateCurrentPick={true}
        />
      </div>

      {/* Instruções */}
      <div className='w-full max-w-2xl p-6 rounded-lg bg-backSecondary shadow border border-borderColor'>
        <h3 className='text-lg font-semibold text-fontTertiary mb-3'>Instruções para o teste</h3>
        <ul className='space-y-2 text-sm text-fontSecondary'>
          <li className='flex items-start gap-2'>
            <span className='text-fontPrimary font-bold'>1.</span>
            <span>
              Clique no botão <strong>"Iniciar"</strong> (ícone de microfone) para começar o teste.
            </span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-fontPrimary font-bold'>2.</span>
            <span>Fale em voz normal e observe as barras de áudio se movendo.</span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-fontPrimary font-bold'>3.</span>
            <span>
              Se as barras não se moverem, verifique as permissões do microfone no navegador.
            </span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-fontPrimary font-bold'>4.</span>
            <span>
              Quando terminar, clique em <strong>"Parar"</strong> para encerrar o teste.
            </span>
          </li>
        </ul>

        {/* Dicas adicionais */}
        <div className='mt-4 p-4 bg-backPrimary border border-borderColor rounded-lg'>
          <p className='text-sm text-fontPrimary font-medium mb-2'>💡 Dicas importantes:</p>
          <ul className='text-sm text-fontSecondary space-y-1'>
            <li>• Fale a uma distância de 20-30 cm do microfone</li>
            <li>• Evite locais com muito ruído de fundo</li>
            <li>• Se necessário, ajuste o volume do microfone nas configurações do sistema</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
