import type { Contact } from '@/types/contact';
import BtnExterno from '../Button/BtnExterno';
import ToggleSection from '../ToggleSection/ToggleSection';

type ContatoItemProps = { item: Contact };

/**
 * Item de contato expansível
 * Responsivo: empilhado no mobile, duas colunas a partir de sm (≥600px)
 */
export default function ContatoItem({ item }: ContatoItemProps) {
  return (
    <div className="contato">
      <div className="mx-auto w-full max-w-screen-xl px-6 sm:px-8 lg:px-10 xl:px-12">
        <ToggleSection title={item.title}>
          <dl
            className="
    divide-y divide-borderColor
    rounded-md        
    bg-white/40      
    shadow-sm        
    p-3 sm:p-4 md:p-5
  "
          >

            {/* Presencial */}
            {item.inPerson && (
                 <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4 items-center">
                <dt className="font-semibold text-sm sm:text-base text-fontPrimary">
                  Presencial:
                </dt>
<dd className="text-sm sm:text-base text-fontSecondary break-words whitespace-normal">
  {item.inPerson}
</dd>

              </div>
            )}

            {/* E-mail */}
            {item.email && (
              <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4 items-center">
                <dt className="font-semibold text-sm sm:text-base text-fontPrimary">
                  E-mail:
                </dt>
                <dd className="text-sm sm:text-base">
<BtnExterno
  href={`mailto:${item.email}`}
  target="_blank"
  className="
    flex items-center justify-center
    w-full max-w-full              /* ocupa a coluna mas não passa do container */
    px-3 py-1.5 sm:px-4 sm:py-2
    text-sm sm:text-base
    bg-backBtn hover:bg-hoverBtn rounded-md font-bold
    whitespace-normal break-all    /* força quebrar mesmo sem hífen */
    text-center
  "
>
  {item.email}
</BtnExterno>


                </dd>
              </div>
            )}

            {/* Telefone */}
            {item.tel && (
              <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4 items-center">
                <dt className="font-semibold text-sm sm:text-base text-fontPrimary">
                  Telefone:
                </dt>
                <dd className="text-sm sm:text-base">
                  <BtnExterno
                    href={`tel:${item.tel}`}
                    target="_blank"
                    className="
        inline-flex w-full sm:w-auto items-center justify-center
        px-3 py-1.5 sm:px-4 sm:py-2
        text-sm sm:text-base
        bg-backBtn hover:bg-hoverBtn rounded-md font-bold
      "
                  >
                    {item.tel}
                  </BtnExterno>
                </dd>
              </div>
            )}

            {/* Funcionamento */}
            {item.schedule && (
               <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4 items-center">
                <dt className="font-semibold text-sm sm:text-base text-fontPrimary">
                  Funcionamento:
                </dt>
                <dd className="text-sm sm:text-base text-fontSecondary">
                  {item.schedule}
                </dd>
              </div>
            )}

            {/* Link externo */}
            {item.externalLink && (
                 <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4 items-center">
                <dt className="font-semibold text-sm sm:text-base text-fontPrimary">
                  Link:
                </dt>
                <dd className="text-sm sm:text-base">
                  <BtnExterno
                    href={item.externalLink.href}
                    target="_blank"
                    className="
        inline-flex w-full sm:w-auto items-center justify-center
        px-3 py-1.5 sm:px-4 sm:py-2
        text-sm sm:text-base
        bg-backBtn hover:bg-hoverBtn rounded-md font-bold
      "
                    aria-label={item.externalLink.label}
                  >
                    {item.externalLink.label}
                  </BtnExterno>
                </dd>
              </div>
            )}
          </dl>
        </ToggleSection>
      </div>
    </div>
  );
}

