/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'http://13.237.204.29/fast_bid_backend/api/',
  rx_chart_base_url: 'http://13.237.204.29/upload/chart/',
  medscom_url: 'https://ewebstercare.net/',
  leecare_url: 'https://au3002.leecare.com.au/grandcedar/',
  // socket_url: 'http://localhost:3000/',
  socket_url: 'http://app.cburst.com.au:3000/',
  mqtt: {
    url: 'mqtt://dreamsedge.cburst.com.au:1883/',
    server: 'dreamsedge.cburst.com.au',
    protocol: "mqtt",
    port: 1883
  }
};
