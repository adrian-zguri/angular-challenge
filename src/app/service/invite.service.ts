import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  private readonly url = 'http://localhost:3000/users';
  private invitedUsers: User[];

  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  invite(user: User) {
    this.http.post<User>(this.url, user);
  }

  /**
   * Send Email to the given users and save the users internally
   * @param users[] array of Users
   */
  sendEmail(users: User[]) {
    for (let user of users) {
      this.invite(user);
    }

    this.invitedUsers = users;
  }

  /**
   * Gives the invited users back
   * @returns array of Users
   */
  getInvitedUsers() : User[] {
    let invUsers = this.invitedUsers;

    // clear the data so it is not used again
    this.invitedUsers = new Array<User>();
    return invUsers;
  }
}
