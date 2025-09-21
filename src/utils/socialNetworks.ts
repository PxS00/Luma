import { GitHub, LinkedIn } from '@/assets/images';
import type { Member } from '@/types/member';
import type { SocialNetwork } from '@/types/socialNetwork';

/**
 * Mapeia dados de um membro para objetos de redes sociais.
 * Converte URLs opcionais em objetos padronizados com ícones e texto alternativo.
 * Atualmente suporta LinkedIn e GitHub, mas pode ser expandido para outras redes.
 * @param m - Dados do membro
 * @returns Array de objetos SocialNetwork prontos para renderização
 */
export function mapMemberSocialNetworks(m: Member): SocialNetwork[] {
  const socials: SocialNetwork[] = [];
  // Adiciona LinkedIn e GitHub se existirem nos dados do membro
  if (m.linkedin) socials.push({ href: m.linkedin, icon: LinkedIn, alt: 'LinkedIn' });
  if (m.github) socials.push({ href: m.github, icon: GitHub, alt: 'GitHub' });
  return socials;
}
