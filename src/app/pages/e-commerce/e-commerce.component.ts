import { Component } from '@angular/core';
import { AccountsService, BidService } from '../../shared/';
import { Router } from "@angular/router"

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  value: number;
  status: number;
}

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})

export class ECommerceComponent {
  accountsCard: CardSettings = {
    title: 'Accounts',
    value: 0,
    iconClass: 'nb-person',
    type: 'primary',
    status: 0,
  };
  totalBidsCard: CardSettings = {
    title: 'Total Bids',
    value: 0,
    iconClass: 'nb-compose',
    type: 'success',
    status: 0,
  };
  todayBidsCard: CardSettings = {
    title: 'Today Bids',
    value: 0,
    iconClass: 'nb-compose',
    type: 'info',
    status: 0,
  };
  

  statusCards: CardSettings[] = [
    this.accountsCard,
    this.totalBidsCard,
    this.todayBidsCard,
  ];

  constructor(private accountService: AccountsService, private bidService: BidService, private router: Router) {
    accountService.getAccountsCount().then((data) => {
      this.statusCards[0].value = data['count'];
    });
    bidService.getBidsCount().then((data) => {
      this.statusCards[1].value = data['count'];
    });
    bidService.getTodayBidsCount().then((data) => {
      this.statusCards[2].value = data['count'];
    });
  }

  clickStat(statusCard: CardSettings) {
    if (statusCard.title == 'Accounts') {
      this.router.navigate(['/pages/accounts']);
    } else {
      this.router.navigate(['/pages/bids']);
    }
  }
}
