export const appRoles = [
  {
    role: 'author',
    possession: 'own',
  },
  {
    role: 'admin',
    extend: 'author',
    possession: 'any',
  },
];

export enum appResources {
  CATEGORIES = 'CATEGORIES',
  ADMINS = 'ADMINS',
}

export enum appRolesEnum {
  author = 'author',
  root = 'admin',
}
