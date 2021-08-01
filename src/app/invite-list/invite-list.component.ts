import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InviteService, User } from '../service/invite.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {
  users$: Observable<User[]>;
  private invitedUsers : User[];
  successfullyInvitedUsers : number;
  showErrorOnExistingUsers: boolean;
  existingUsers: User[];



  constructor(private inviteService: InviteService) {
    this.users$ = this.inviteService.get();
  }

  ngOnInit(): void {
    // check if users were invited
    this.invitedUsers = this.inviteService.getInvitedUsers();

    if (this.invitedUsers && this.invitedUsers.length > 0) {
      // after getting the registered users, check them with the invited ones
      this.users$.toPromise().then(existingUsers => {
        this.checkInvitedUsers(existingUsers);
      });
    }
  }

  /**
   * Checks the number of successfull invitations and fills the array of the existing users
   * to whom an Email was sent 
   * @param existingUsers[] Array of the registered users
   */
  checkInvitedUsers(existingUsers: User[]) {
    this.successfullyInvitedUsers = 0;
    this.existingUsers = new Array<User>();

    for(let indexInvitedUser in this.invitedUsers) {
      let invitedUser = this.invitedUsers[indexInvitedUser];
      
      if (existingUsers.map(e => e.email).indexOf(invitedUser.email) !== -1) {
        this.showErrorOnExistingUsers = true;
        this.existingUsers.push(invitedUser);
      } else {
        this.successfullyInvitedUsers += 1;
      }
    }
  }
}
