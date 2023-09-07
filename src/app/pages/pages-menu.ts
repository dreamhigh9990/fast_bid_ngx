import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Projects',
    icon: 'list-outline',
    link: '/pages/jobs',
    home: true,
  },
  {
    title: 'Bid',
    icon: 'edit-2-outline',
    link: '/pages/mybid',
    home: true,
  },
  {
    title: 'History',
    icon: 'clock-outline',
    link: '/pages/history',
  },
  {
    title: 'Resources',
    icon: 'clipboard-outline',
    children: [
      {
        title: 'Templates',
        icon: 'file-text-outline',
        link: '/pages/resources/templates',
      },
      {
        title: 'Greetings',
        icon: 'radio-button-on-outline',
        link: '/pages/resources/greetings',
      },
      {
        title: 'Introduces',
        icon: 'archive-outline',
        link: '/pages/resources/introduces',
      },
      {
        title: 'Experiences',
        icon: 'activity-outline',
        link: '/pages/resources/experiences',
      },
      {
        title: 'URLs',
        icon: 'link-2-outline',
        link: '/pages/resources/urls',
      },
      {
        title: 'Questions',
        icon: 'question-mark-outline',
        link: '/pages/resources/questions',
      },
      {
        title: 'Quotations',
        icon: 'calendar-outline',
        link: '/pages/resources/quotations',
      },
      {
        title: 'Conclusions',
        icon: 'radio-button-off-outline',
        link: '/pages/resources/conclusions',
      }
    ]
  },
  {
    title: 'Accounts',
    icon: 'people-outline',
    children: [
      {
        title: 'Management',
        icon: 'people-outline',
        link: '/pages/accounts',
      },
      {
        title: 'Messages',
        icon: 'message-circle-outline',
        link: '/pages/messages',
      },
    ],
  },
];
