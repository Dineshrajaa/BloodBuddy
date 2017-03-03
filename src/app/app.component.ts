import { Component, ViewChild} from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';

import { LandingPage } from '../pages/landing/landing';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Check whether the user has already authourized the app via Facebook
      let env=this;
      NativeStorage.getItem('user')
     .then(function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        console.warn(JSON.stringify(data));
        env.nav.push(HomePage);
        Splashscreen.hide();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        console.warn(JSON.stringify(error));
        env.nav.push(LandingPage);
        Splashscreen.hide();
      });

      StatusBar.styleDefault();
    });
  }
}
