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
      <ToggleSection title={item.title}>
        <dl
          className="
            divide-y divide-borderColor
            rounded-lg 
          "
        >
          {/* Presencial */}
          {item.inPerson && (
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4">
              <dt className="font-semibold text-sm sm:text-base text-fontPrimary">
                Presencial:
              </dt>
              <dd className="text-sm sm:text-base text-fontSecondary">
                {item.inPerson}
              </dd>
            </div>
          )}

          {/* E-mail */}
          {item.email && (
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4">
              <dt className="font-semibold text-sm sm:text-base text-fontPrimary">
                E-mail:
              </dt>
              <dd className="text-sm sm:text-base">
                <BtnExterno
                  href={`mailto:${item.email}`}
                  target="_blank"
                  className="
                    inline-flex w-full sm:w-auto items-center justify-center
                    px-3 py-1.5 sm:px-4 sm:py-2
                    text-sm sm:text-base
                    bg-backBtn hover:bg-hoverBtn rounded-md font-bold
                    break-words whitespace-normal
                  "
                >
                  {item.email}
                </BtnExterno>
              </dd>
            </div>
          )}

          {/* Telefone */}
          {item.tel && (
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4">
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
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4">
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
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-2 sm:gap-4">
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
                    break-words whitespace-normal
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
  );
}

