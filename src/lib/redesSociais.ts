import type { Membro } from '@/types/membro';
import type { RedeSocial } from '@/types/redeSocial';
import { GitHub, LinkedIn } from '../data/imagens';

/**
 * Mapeia dados de um membro para objetos de redes sociais
 * Converte URLs opcionais em objetos padronizados com ícones
 * @param m - Dados do membro
 * @returns Array de objetos RedeSocial prontos para renderização
 */
export function mapearRedesDoMembro(m: Membro): RedeSocial[] {
  const socials: RedeSocial[] = [];
  if (m.linkedin) socials.push({ href: m.linkedin, icon: LinkedIn, alt: 'LinkedIn' });
  if (m.github) socials.push({ href: m.github, icon: GitHub, alt: 'GitHub' });
  return socials;
}
