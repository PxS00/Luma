import { IoPerson } from 'react-icons/io5';
import type { ReactElement } from 'react';
import { feedbacks } from '@/data/feedbackData';

export default function FeedbackSection(): ReactElement {
  return (
  <section className="mx-auto max-w-6xl w-full px-4 mt-6">
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-fontPrimary">O que pacientes dizem</h2>
        <p className="text-sm text-fontTertiary mt-1">Depoimentos reais de quem já usou o portal e participou da teleconsulta.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {feedbacks.map((f) => (
          <article
            key={f.name}
            className="rounded-lg border border-borderColor bg-backPrimary p-4 shadow-sm"
            aria-label={`Depoimento de ${f.name}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-clikColor text-white flex items-center justify-center shrink-0">
                <IoPerson className="w-5 h-5" aria-hidden />
              </div>

              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-fontPrimary">{f.name}</h3>
                  <span className="text-xs text-fontTertiary">{f.role}</span>
                </div>

                <p className="mt-2 text-sm text-fontTertiary leading-relaxed wrap-break-word whitespace-normal">{f.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
