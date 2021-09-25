import {InjectionToken } from '@angular/core';


export interface AppConfig {
    apiEndpoint: string;
    localSotrageTokenKey: string;
    itemStateQueryParamKey :string
}




export const localAppConfig= (): AppConfig => ({
    apiEndpoint: 'http://localhost:8000/api/',
    localSotrageTokenKey:'appToken',
    itemStateQueryParamKey:'availability',

});

export const appConfig= (): AppConfig => ({
    ... localAppConfig(),
    apiEndpoint: 'http://ec2-15-236-108-45.eu-west-3.compute.amazonaws.com/api/',
    

});


export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
    providedIn: 'root',
    factory: appConfig
  });

