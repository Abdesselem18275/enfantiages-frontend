import { InjectionToken } from "@angular/core";

const APP_API_URL = () => 'http://ec2-15-188-104-88.eu-west-3.compute.amazonaws.com/enfantiages/api/';

const APP_TOKEN_KEY = () => 'appToken';
const APP_PROFILE_ID = () => 'profileId';


export const API_URL = new InjectionToken<string>('ApiUrl', {
  providedIn: 'root',
  factory: APP_API_URL
});
export const TOKEN_KEY = new InjectionToken<string>('TokenKey', {
  providedIn: 'root',
  factory: APP_TOKEN_KEY
});
export const PROFILE_ID = new InjectionToken<string>('ProfileId', {
  providedIn: 'root',
  factory: APP_PROFILE_ID
});

// export function loadInitData(configService: ConfigService) {
//   return ():Promise<any> => configService.loadInitials();
// }
