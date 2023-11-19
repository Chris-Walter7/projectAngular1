import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService implements HttpInterceptor {
  constructor(private userService: UserService) { } // inject class, чтобы получить доступ к токену

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const hasToken = this.userService.getToken(); //  в теле метода проверяем наличие токена
    console.log('hasToken', hasToken)

    if (hasToken) { // если токен есть, то используем метод clone - клонирует параметр и указывает, что мы должны изменить,
      console.log('hasToken', hasToken)

      const cloned = req.clone({ // параметром передаем те данные, которые должны быть дабавлены в клонированный запрос
        headers: req.headers.set("Authorization", // свойство headers, добавили новый заголовок с помощью set; Authoriztion - ключ
          "Bearer " + hasToken) // это значение
      });
      // после того как мы модифицировали наш новый запрос, отправляем с помощью метода handle
      return next.handle(cloned);
    } else { // сли нет токена, отправляем просто текущий запрос
      return next.handle(req);
    }
  }
}
