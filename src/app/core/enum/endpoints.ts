import { environment } from "../../../environments/environments";

export class EndPoint {
  static SIGNIN = `${environment.baseApiUrl}api/v1/auth/signin`;
  static SIGNUP = `${environment.baseApiUrl}api/v1/auth/signup`;

}
