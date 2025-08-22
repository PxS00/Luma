import MemberCard from './components/MemberCard.tsx';
import { members } from './data/members.ts';

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
