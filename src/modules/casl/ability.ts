import { defineAbility, AnyMongoAbility } from '@casl/ability';
import { EScopes } from './types';

export default defineAbility(() => null);

export const setupAbilities = (scopes: EScopes[], ability: AnyMongoAbility) => {
  if (scopes.includes(EScopes.user)) {
    ability.update([
      { action: "read", subject: "home" },
    ]);
  }
  if (scopes.includes(EScopes.moderator)) {
    ability.update([
      { action: "read", subject: "home" },
    ]);
  }
  if (scopes.includes(EScopes.admin)) {
    console.log(1)
    ability.update([
      { action: "read", subject: "quiz" },
      { action: "read", subject: "articles" },
      { action: "read", subject: "home" },
    ]);
  }
};