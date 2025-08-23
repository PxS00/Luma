import DeskCadastro from '@/components/cadastro/DeskCadastro';
import MobileCadastro from '@/components/cadastro/MobileCadastro';
import Intro from '@/components/teleconsulta/Intro';

export default function AuxilioCadastro() {
  return (
    <main>
      <Intro />
      <MobileCadastro />
      <DeskCadastro />
    </main>
  );
}
