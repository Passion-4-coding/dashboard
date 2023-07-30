import { defineAbility, AnyMongoAbility } from '@casl/ability';
import { EScopes } from './types';

export default defineAbility(() => null);

export const setupAbilities = (scopes: EScopes[], ability: AnyMongoAbility) => {
  if (scopes.includes(EScopes.user)) {
    ability.update([
      { action: "read", subject: "home" },
      { action: "read", subject: "karma" },
      { action: "read", subject: "karma-entries" },
      { action: "read", subject: "members-total-karma" },
    ]);
  }
  if (scopes.includes(EScopes.moderator)) {
    ability.update([
      { action: "read", subject: "home" },
      { action: "read", subject: "karma" },
      { action: "read", subject: "karma-entries" },
      { action: "read", subject: "members-total-karma" },
    ]);
  }
  if (scopes.includes(EScopes.admin)) {
    ability.update([
      { action: "read", subject: "quiz" },
      { action: "read", subject: "articles" },
      { action: "read", subject: "home" },
      { action: "read", subject: "karma" },
      { action: "read", subject: "karma-telegram" },
      { action: "read", subject: "karma-entries" },
      { action: "read", subject: "members-total-karma" },
      { action: "write", subject: "articles" },
      { action: "publish", subject: "articles" },
    ]);
  }
};