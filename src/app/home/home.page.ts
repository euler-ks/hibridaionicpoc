import { Component } from '@angular/core';
import { AppLauncher } from '@ionic-native/app-launcher/ngx';
import { WebIntent } from '@ionic-native/web-intent/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataRecovered: any;

  constructor(private appLauncher: AppLauncher, private webIntent: WebIntent) {
  }

  openAppLauncher() {
    window['plugins']['launcher'].launch({
      packageName: 'com.katasoftware.apphibridpoc1',
      extras: [
        { "name": "video_list.name", "value": ["Awesome Video", "Sweet Title"], "dataType": "StringArray" },
        { "name": "position", "value": 3000, "dataType": "int" }
      ]
    }, (json) => { console.log('POC 1 returns', json) }, (error: any) => console.error('Error - ', error));
  }

  openIntent() {

    this.webIntent.startActivityForResult({
      component: {
        class: 'com.katasoftware.apphibridpoc2.MainActivity',
        package: 'com.katasoftware.apphibridpoc2'
      },
      extras: {
        'random.number.from.poc': Math.floor((Math.random() * 1000) + 1) 
      },
      package: "com.katasoftware.apphibridpoc2",
    })
    .then((result) => { console.log('Response from activity - ', result); this.dataRecovered = result; })
    .catch((error) => { console.log('Failed to open via Android Intent - ', error) })

  }

  sendResult() {

    this.webIntent.sendResult({
      extras: {
        'random.number.from.poc': Math.floor((Math.random() * 1000) + 1) 
      }
    })
    .then((result) => { console.log('Result activity success from POC - ', result); })
    .catch((error) => { console.log('Failed result from POC - ', error) });

  }
}
