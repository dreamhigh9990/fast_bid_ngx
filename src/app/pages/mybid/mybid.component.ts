import { shareReplay, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { BidService, AccountsService, JobsService, AdminUserService, GreetingsService, IntroducesService, ExperiencesService, UrlsService, QuestionsService, QuotationsService, ConclusionsService, TemplatesService } from '../../shared';
@Component({
  selector: 'ngx-mybid',
  templateUrl: './mybid.component.html',
  styleUrls: ['./mybid.component.scss']
})
export class MybidComponent implements OnInit {

  constructor(private route: ActivatedRoute, private bidService: BidService, private clipboard: Clipboard, private accountService: AccountsService, private jobService: JobsService, private adminService: AdminUserService, private greetingService: GreetingsService, private introduceService: IntroducesService, private experienceService: ExperiencesService, private urlService: UrlsService, private questionService: QuestionsService, private quotationService: QuotationsService, private conclusionService: ConclusionsService, private templateService: TemplatesService) {
    this.adminService.getCurrentUser().then(user => {
      this.adminUser = user;
      if (this.adminUser && this.adminUser.role != 'admin') {
        this.accountInfo.value = 'gromovol';
      }
    })
  }

  adminUser;
  taskId: string = "";
  taskUrl: string = "";
  taskInfo: any = {};
  taskSeoInfo: any = {};
  bidsInfo: any = {};
  userFreelancerInfo: any = {};
  userClientInfo: any = {};
  userInfo: any = {};
  bidInput: string;
  myBidTemplate: any = [];
  bidTemplate: any = {};

  ngOnInit(): void {
    this.bidTemplate = {};
    this.greetingService.getGreetings().then(data => {
      this.bidTemplate.greetings = data;
      return this.introduceService.getIntroduces();
    }).then(data => {
      this.bidTemplate.introduces = data;
      return this.experienceService.getExperiences();
    }).then(data => {
      this.bidTemplate.experiences = data;
      return this.urlService.getUrls();
    }).then(data => {
      data.forEach(url => {
        url.template = url.url + ' - ' + url.title + '\r\n' + url.description;
      });
      this.bidTemplate.urls = data;
      return this.questionService.getQuestions();
    }).then(data => {
      this.bidTemplate.questions = data;
      return this.quotationService.getQuotations();
    }).then(data => {
      this.bidTemplate.quotations = data;
      return this.conclusionService.getConclusions();
    }).then(data => {
      this.bidTemplate.conclusions = data;
      this.myBidTemplate = Object.entries(this.bidTemplate);
      this.myBidTemplate = this.myBidTemplate.map(e => {
        e[2] = true;
        if (e[0] == 'quotations') {
          e[2] = false;
        }
        e[3] = e[1][0]['template'];
        return e;
      });
    });

    this.route.paramMap.subscribe(paramMap => {
      this.taskId = paramMap.get('taskid');
      if (this.taskId != null) {
        this.getInfos();
        this.urlInput = 'https://www.freelancer.com/projects/' + this.taskId;
      }
    });
  }

  accountInfo: any = { list: [], value: "" };
  getAccounts() {
    this.accountService.getAccounts().then(data => {
      this.accountInfo['list'] = [...Object.entries(data)];
      this.accountInfo['value'] = this.accountInfo.list[0][1]['user_name'];
      if (this.adminUser && this.adminUser.role != 'admin') {
        this.accountInfo.value = 'gromovol';
      }
    });
  }

  urlInput: string = "";
  budgetInput: string = "";
  periodInput: string = "";
  preTemplates = [];
  selectedPreTemplate = null;

  goodBid() {
    if (window.confirm('Are you sure to bid on ' + this.accountInfo.value + ' account?')) {
      this.jobService.addJob(this.taskSeoInfo.result.projects[0].id, this.taskInfo.result.title,
        this.taskSeoInfo.result.projects[0].description,
        this.userInfo.result.users[this.taskInfo.result.owner_id].location.country.name,
        this.userInfo.result.users[this.taskInfo.result.owner_id].status.payment_verified,
        this.userClientInfo.result.reviews.length,
        this.userInfo.result.users[this.taskInfo.result.owner_id].employer_reputation.earnings_score,
        new Date(this.userInfo.result.users[this.taskInfo.result.owner_id].registration_date * 1000).toJSON().slice(0, 10),
        this.taskInfo.result.budget.minimum,
        this.taskInfo.result.budget.maximum,
        this.taskSeoInfo.result.projects[0].jobs.map(skill => skill.name).join(','),
        this.taskSeoInfo.result.projects[0].seo_url,
        this.taskInfo.result.currency.code,
        this.taskInfo.result.type).then(data => {
          if (data['status'] == 200) {
            this.bidService.addBid(this.taskId, this.adminUser.id, this.accountInfo.value, (<HTMLInputElement>document.getElementById("bid-comment")).value, this.budgetInput, this.periodInput,);
            alert('Applied successfully.')
          }
        })
    }
  }
  getAutoBid() {
    var bidStr: string = "";
    this.myBidTemplate.map(e => {
      if (e[2]) {
        if (e[0] == 'questions') {
          bidStr += '\r\nCan I ask the questions?\r\n';
        }
        if (e[0] == 'quotations' || e[0] == 'conclusions') {
          bidStr += '\r\n';
        }
        bidStr += e[3] + "\r\n";
      }
    });

    if (this.userInfo.result && this.taskInfo.result && this.userInfo.result.users[this.taskInfo.result.owner_id]) {
      bidStr = bidStr.replace("<CLIENT_NAME>", this.capitalizeFirstLetter(this.userInfo.result.users[this.taskInfo.result.owner_id].public_name));
    }
    var skills = "...";
    if (this.taskSeoInfo.result) {
      skills = "";
      this.taskSeoInfo.result.projects[0].jobs.map(e => {
        skills += e.name + ", "
      });
      skills += " etc"
    }
    bidStr = bidStr.replace("<SKILLS>", skills);
    this.accountInfo.list.forEach(list => {
      if (list[1].user_name == this.accountInfo.value) {
        bidStr = bidStr.replace("<FIRST_NAME>", list[1].full_name.split(' ')[0]);
      }
    });

    if (this.userInfo.result && this.taskInfo.result && this.userInfo.result.users[this.taskInfo.result.owner_id]) {
      bidStr = bidStr.replace("<TIMEZONE>", this.capitalizeFirstLetter(this.userInfo.result.users[this.taskInfo.result.owner_id].timezone.timezone));
    }
    return bidStr;
  }

  setUrl() {
    var catched = this.urlInput.match(/projects\/.*\/details|projects\/[0-9]+/g);
    var seoUrl = catched[0].replace("projects/", "").replace("/details", "");
    if (seoUrl.length <= 9) {
      this.taskId = seoUrl
      this.getInfos();
    } else {
      this.bidService.getTaskSeoInfo(seoUrl).then(seoData => {
        this.taskId = seoData.result.projects[0].id;
        this.getInfos();
      });
    }
  }
  replaceUrlLink(str) {
    let match = str.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
    let final = str;
    try {
      match.map(url => {
        final = final.replace(url, "<a href=\"" + url + "\" target=\"_BLANK\">" + url + "</a>")
      })
    } catch (e) {

    }

    return final;
  }
  copyUrl() {
    this.clipboard.copy('https://www.freelancer.com/projects/' + this.taskId);
  }
  copyBid() {
    this.clipboard.copy((<HTMLInputElement>document.getElementById("bid-comment")).value);
  }
  capitalizeFirstLetter(str) {
    str = str.replace(/\d+/g, '');
    str = str.split(" ");
    return str[0].charAt(0).toUpperCase() + str[0].slice(1);
  }
  getInfos() {
    this.getAccounts();
    this.taskInfo = {};
    this.bidService.getTaskInfo(this.taskId).then(data => {
      this.taskInfo = { ...data };
      console.log(this.taskInfo);
      let submitDate = new Date(this.taskInfo.result.submitdate * 1000);
      this.taskInfo.result.submitDate = this.timeSince(submitDate) + ' ago';
      this.budgetInput = this.taskInfo.result.budget.maximum;
      this.periodInput = this.taskInfo.result.bidperiod;
      if (this.taskInfo.result) {
        this.bidService.getTaskSeoInfo(this.taskInfo.result.seo_url).then(seoData => {
          this.taskSeoInfo = { ...seoData };
          console.log(this.taskSeoInfo);
        });

        this.bidService.getBidsInfo(this.taskId).then(bidData => {
          this.bidsInfo = { ...bidData };
        });

        this.bidService.getUserInfo(this.taskInfo.result.owner_id).then(userData => {
          this.userInfo = { ...userData };
          let registeredDate = new Date(this.userInfo.result.users[this.taskInfo.result.owner_id].registration_date * 1000);
          this.userInfo.result.users[this.taskInfo.result.owner_id].since = registeredDate.toISOString().split('T')[0];

          this.templateService.getTemplates().then(templates => {
            this.preTemplates = templates;
          })
        });

        this.bidService.getUserClientInfo(this.taskInfo.result.owner_id).then(userData => {
          this.userClientInfo = { ...userData };

          var reviews = 0;
          var review_cost = 0;
          reviews = this.userClientInfo.result.reviews.length;
          this.userClientInfo.result.reviews.map((re) => {
            review_cost += re.bid_amount * re.currency.exchange_rate;
          });

          this.userClientInfo.reviews = reviews;
          this.userClientInfo.review_cost = review_cost / reviews;
          if (reviews > 0) {
            this.userClientInfo.result.projectss = Object.entries(this.userClientInfo.result.projects);
          }
        });

        this.bidService.getUserFreelancerInfo(this.taskInfo.result.owner_id).then(userData => {
          this.userFreelancerInfo = { ...userData };

          var reviews = 0;
          var review_cost = 0;
          reviews = this.userFreelancerInfo.result.reviews.length;
          this.userFreelancerInfo.result.reviews.map((re) => {
            review_cost += re.bid_amount * re.currency.exchange_rate;
          });

          this.userFreelancerInfo.reviews = reviews;
          this.userFreelancerInfo.review_cost = review_cost / reviews;
        });

      }
    });

  }

  covertFixedVal(fString) {
    return parseFloat(fString).toFixed(1);
  }

  timeSince(date) {
    var today = +new Date();
    var seconds = Math.floor((today - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes " + Math.floor(seconds % 60) + " seconds";
    }
    return Math.floor(seconds) + " seconds";
  }

  changeTemplate(event, template) {
    template[3] = template[1][event]['template'];
  }

  checkTemplate(event, template) {
    if (template[0] == 'urls' || template[0] == 'experiences') {
      this.myBidTemplate.forEach(temp => {
        if ((temp[0] == 'urls' || temp[0] == 'experiences')) {
          temp[2] = event;
        }
      })
    }
  }

  changePreTemplate() {
    if (this.selectedPreTemplate < 0) {
      this.myBidTemplate = this.myBidTemplate.map(e => {
        e[2] = true;
        if (e[0] == 'quotations') {
          e[2] = false;
        }
        e[3] = e[1][0]['template'];
        return e;
      });
      return;
    }

    let template = JSON.parse(this.preTemplates[this.selectedPreTemplate]['template']);
    this.myBidTemplate = this.myBidTemplate.map(e => {
      e[2] = template[e[0]] >= 0; // Checked or not
      if (e[2]) {
        e[3] = e[1][template[e[0]]]['template']; // Selected Text
      }
      return e;
    });
  }
}
