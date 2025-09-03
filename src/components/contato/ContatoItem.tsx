import type { Contato } from '@/types/contato';
import BtnExterno from '../Botao/BtnExterno';
import ToggleSection from '../ToggleSection/ToggleSection';

type Props = { item: Contato };

/**
 * Item de contato expansível
 * Exibe informações de contato como telefone, email e endereço
 */
export default function ContatoItem({ item }: Props) {
  return (
    <div className='contato '>
      <ToggleSection title={item.title}>
        <dl className='space-y-2 '>
          {item.presencial && (
            <div className='text-center'>
              <dt className='inline font-semibold'>Presencial:</dt>
              <dd className='inline ml-1'>{item.presencial}</dd>
            </div>
          )}
          {item.email && (
            <div className='text-center border-t border-borderColor pt-2 mt-2'>
              <dt className='inline font-semibold'>E-mail:</dt>
              <dd className='inline ml-1'>
                <BtnExterno href={`mailto:${item.email}`} target='_blank' className='py-1 px-1'>
                  {item.email}
                </BtnExterno>
              </dd>
            </div>
          )}

          {item.tel && (
            <div className='text-center border-t border-borderColor pt-2 mt-2'>
              <dt className='inline font-semibold'>Telefone:</dt>
              <dd className='inline ml-1'>
                <BtnExterno href={`tel:${item.tel}`} target='_blank' className='py-1 px-1'>
                  {item.tel}
                </BtnExterno>
              </dd>
            </div>
          )}

          {item.funcionamento && (
            <div className='text-center border-t border-borderColor pt-2 mt-2'>
              <dt className='inline font-semibold'>Funcionamento:</dt>
              <dd className='inline ml-1'>{item.funcionamento}</dd>
            </div>
          )}

          {item.linkExterno && (
            <div className='text-center border-t border-borderColor pt-2 mt-2'>
              <dt className='sr-only'>Link externo</dt>
              <dd className='inline'>
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
