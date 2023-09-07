import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';

import { LayoutService } from '../../../@core/utils';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { AdminUserService, JobsService, MessagesService } from '../../../shared';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  badgeStatus = "";
  badgeText = 0;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    private tokenService: NbTokenService,
    private adminUserService: AdminUserService,
    private jobService: JobsService,
    private messageService: MessagesService,
    private router: Router) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.adminUserService.getCurrentUser().then(user => {
      this.user = { name: user.email, picture: '' };
    });
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title == "Log out") {
        this.authService.logout("email");
        this.tokenService.clear();
        this.router.navigate(['/auth/login']);
      }
    })

    this.getUnreadMessagesCount();
    interval(10000).subscribe(_ => {
      this.getUnreadMessagesCount();
    });

    // this.updateJobList();
  }

  getUnreadMessagesCount() {
    this.messageService.getUnreadMessagesCount().then(result => {
      if (result['count'] > 0) {
        this.badgeStatus = 'danger';
        this.badgeText = result['count'];
        this.showNotification("Please check message!");
      } else {
        this.badgeStatus = '';
        this.badgeText = 0;
      }
    });
  }

  showNotification(message) {
    Notification.requestPermission().then(function (result) {
      if (window.Notification && Notification.permission === "granted") {
        let notification = new Notification("New Message", { body: message });
        let self = this; 
        notification.onclick = () => {
          window.open('/pages/messages', 'blank');
        };
      }
    });
  }

  seeMessagePage() {
    this.router.navigate(['/pages/messages']);
  }

  updateJobList() {
    this.jobService.updateJobList().then(result => {
      setTimeout(() => {
        this.updateJobList();
      }, 10000);
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
