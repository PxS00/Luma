import type { TeleconsultaStep } from '../data/axTele';

type Props = { step: TeleconsultaStep };

export default function AxTeleCard({ step }: Props) {
  return (
    <li>
      <div>
        <h3>{step.title}</h3>
        <img
          src={step.img}
          alt={step.alt}
          width={360}
          height={640}
          loading='lazy'
          decoding='async'
          className='w-full max-w-sm aspect-[9/16] object-cover rounded-lg'
        />
      </div>
    </li>
  );
}
