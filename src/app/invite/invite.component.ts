import {Component, OnInit} from '@angular/core';
import {User} from '../service/invite.service';
import { InviteService } from '../service/invite.service';
import { Router } from '@angular/router';

const users: User[] = [
  { email: 'user0@comtravo.com' },
  { email: 'user1@comtravo.com' },
  { email: 'user2@comtravo.com' },
  { email: 'user3@comtravo.com' },
  { email: 'user4@comtravo.com' },
  { email: 'user5@comtravo.com' },
  { email: 'user6@comtravo.com' },
  { email: 'user7@comtravo.com' },
  { email: 'user8@comtravo.com' },
  { email: 'user9@comtravo.com' },
  { email: 'user10@comtravo.com' }
];

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  constructor(private inviteService: InviteService, private router: Router) {

  }

  ngOnInit(): void {
    console.log(users);
  }

  /**
   * Send the Emails and redirect to the list component
   */
  onSubmit(): void {
    this.inviteService.sendEmail(users);

    this.router.navigate(['list'], {});
  }
}
