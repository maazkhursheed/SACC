export interface FailureRequestParam {
  action: any;
  response: any;
}

export enum RequestedTime {
  ANYTIME = "ANYTIME",
  AM = "AM",
  PM = "PM",
  SPECIFIC_TIME = "Specific Time",
}

export enum Token {
  AccessTokenKey = "ACCESS_TOKEN_KEY",
  RefreshTokenKey = "REFRESH_TOKEN_KEY",
  PasswordTokenKey = "PASSWORD_TOKEN_KEY",
}
