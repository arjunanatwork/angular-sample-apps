import { Injectable } from '@angular/core';
import { Adapter } from '../core/adapter';

export class User {
  constructor(
    public id: string,
    public created_time: number,
    public created: string,
    public karma: number,
    public avg: string,
    public about: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    const user = new User(
      item.id,
      item.created_time,
      item.created,
      item.karma,
      item.avg,
      item.about
    );
    return user;
  }
}
