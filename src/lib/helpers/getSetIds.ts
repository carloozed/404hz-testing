// types
import { SetAssociations } from '@/types/track';

export function getSetIds(setAssociations: SetAssociations[]): number[] {
  return setAssociations.map((asso) => asso.set.id);
}
