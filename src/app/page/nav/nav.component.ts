import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {Navigation} from "../../interface/navigation";
import {Subscription} from "rxjs";
import {User} from "../../model/user";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  navigation: Navigation[] = this.config.navigation;
  loginStatus: boolean = false;
  userSubscription: Subscription;
  user: User | null = null;

  constructor(
    private config: ConfigService,
    private auth: AuthService,
  ) {
    this.userSubscription = this.auth.currentUserSubject.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.userSubscription = this.auth.currentUserSubject.subscribe(user => this.user = user);
    console.log(this.user);

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.auth.logout();
  }


}
