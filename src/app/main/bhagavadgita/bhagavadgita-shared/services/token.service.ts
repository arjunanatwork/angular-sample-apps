import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

import { environment } from "src/environments/environment";

const token_details = {
  client_id: "QQSA40ovw5lMRBkZFfmx4fQuVj2SPOVN8pd4DKkd",
  client_secret: "YdqiWxUWHoRH7Nn8QVIoeK1AqCFdItzhqpIVC8rIEYmWTIGjWs",
  grant_type: "client_credentials",
  scope: "verse chapter"
};

const tokenEndpoint = environment.bhagavadGitaEndpoints.token;

@Injectable()
export class TokenService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  obtainAccessToken() {
    let params = new URLSearchParams();
    params.append("client_id", token_details.client_id);
    params.append("client_secret", token_details.client_secret);
    params.append("grant_type", token_details.grant_type);
    params.append("scope", token_details.scope);
    let headers = new HttpHeaders({
      "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
      "X-Skip-Interceptor": "true"
    });

    //Make the POST Call
    return this.http.post(tokenEndpoint, params.toString(), {
      headers: headers
    });
  }

  saveToken(access_token) {
    this.cookieService.set(
      "access_token",
      access_token,
      new Date(Date.now() + 5 * 60 * 1000)
    );
  }

  getToken(): string {
    return this.cookieService.get("access_token");
  }

  checkToken() {
    const cookieExists: boolean = this.cookieService.check("access_token");
    return cookieExists;
  }
}
