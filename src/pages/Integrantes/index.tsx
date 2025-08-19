import MemberCard from './MemberCard.tsx';
import { members } from './members.ts';

export default function Integrantes() {
  return (
    <main>
      <ul>
        {members.map((m) => (
          <MemberCard key={m.rm} m={m} />
        ))}
      </ul>
    </main>
  );
}
