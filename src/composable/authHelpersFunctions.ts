import { EAuthErrorsMessage } from '@/enums';

const formatErrorCode = (module: string, errorCode: string): string =>
  errorCode.replace(`${module}/`, '').replaceAll('-', '').toUpperCase();

export function getAuthErrorMessage(errorCode: string): string {
  switch (formatErrorCode('auth', errorCode)) {
    case 'EMAILALREADYINUSE':
      return EAuthErrorsMessage.EMAILALREADYINUSE;
    case 'INVALIDEMAIL':
      return EAuthErrorsMessage.INVALIDEMAIL;
    case 'USERDISABLED':
      return EAuthErrorsMessage.USERDISABLED;
    case 'USERNOTFOUND':
      return EAuthErrorsMessage.USERNOTFOUND;
    case 'WRONGPASSWORD':
      return EAuthErrorsMessage.WRONGPASSWORD;
    case 'WEAKPASSWORD':
      return EAuthErrorsMessage.WEAKPASSWORD;
    default:
      return 'Tente novamente';
  }
}
