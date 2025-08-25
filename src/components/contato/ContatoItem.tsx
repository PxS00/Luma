import type { Contato } from '@/types/contato';
import BtnExterno from '../Botao/BtnExterno';
import ToggleSection from '../ToggleSection/ToggleSection';

type Props = { item: Contato };

export default function ContatoItem({ item }: Props) {
  return (
    <div className='contato'>
      <ToggleSection title={item.titulo}>
        <dl className='space-y-2'>
          {item.presencial && (
            <div>
              <dt className='font-semibold'>Presencial:</dt>
              <dd>{item.presencial}</dd>
            </div>
          )}
          {item.email && (
            <div>
              <dt className='font-semibold'>E-mail:</dt>
              <dd>
                <BtnExterno href={`mailto:${item.email}`} target='_blank'>
                  {item.email}
                </BtnExterno>
              </dd>
            </div>
          )}
          {item.tel && (
            <div>
              <dt className='font-semibold'>E-mail:</dt>
              <dd>
                <BtnExterno href={`mailto:${item.tel}`} target='_blank'>
                  {item.tel}
                </BtnExterno>
              </dd>
            </div>
          )}
          {item.funcionamento && (
            <div>
              <dt className='font-semibold'>Funcionamento:</dt>
              <dd>{item.funcionamento}</dd>
            </div>
          )}
          {item.linkExterno && (
            <div>
              <dt className='sr-only'>Link externo</dt>
              <dd>
                <BtnExterno href={item.linkExterno.href} target='_blank'>
                  {item.linkExterno.rotulo}
                </BtnExterno>
              </dd>
            </div>
          )}
        </dl>
      </ToggleSection>
    </div>
  );
}
