export const validationMessages = {
  TITLE_NOT_EMPTY: 'El campo titulo no puede ser vacio',
  NAME_NOT_EMPTY: 'El nombre es requerido.',
  NAME_IS_STRING: 'El nombre debe contener solo letras.',
  NAME_LENGTH_255: 'El nombre no tener mas de 255 caracteres',
  LAST_NAME_NOT_EMPTY: 'El campo apellido es requerido',
  EMAIL_IS_EMAIL:
    'el campor email debe tener un formato válido ej. pedro@gmail.com',
  PASSWORD_NOT_EMPTY: 'El campo de contraseña es requerido',
  ADMIN_EXIST_WITH_EMAIL: 'Ya existe un admin con el mismo email',
  SLUG_NOT_EMPTY: 'El campo slug no puede ser vacio',
};

export const requestMessages = {
  DOES_NOT_EXISTS: 'El registro solicitado no existe',
  DOES_NOT_AUTHENTICATED: 'No estás autenticado.',
  LOGIN_DOES_NOT_MATCH: 'El usuario o la contraseña no coinciden.',
  ERROR_DATA_INIT: 'Error during Data Source initialization',
  SERVER_RUNNIG: 'Server is running in',
  ACCESS_DENIED: 'Access Denied',
  ALL_ACCESS_BLOCKED: 'Todos los accesos están bloqueados',
};
