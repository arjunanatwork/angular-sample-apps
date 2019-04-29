import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { TokenService } from "../services/token.service";
import { Observable } from "rxjs";
import "rxjs/add/operator/do";

const InterceptorSkipHeader = "X-Skip-Interceptor";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });

    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("Success reponse");
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("Token may be Expired. Calling Token Service");
            this.tokenService.obtainAccessToken().subscribe((data: any) => {
              this.tokenService.deleteToken();
              this.tokenService.saveToken(data.access_token);
              return next.handle(req);
            });
          }
        }
      }
    );
  }
}
