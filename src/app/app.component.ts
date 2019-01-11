import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private codePush: CodePush
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkCodePush();
    });
  }

  checkCodePush() {
    this.codePush.sync({
     updateDialog: true,
     installMode: InstallMode.IMMEDIATE
    }).subscribe(
      (data) => {
      console.log('[CodePush] SUCCESSFUL: ' + data);
      },
      (err) => {
      console.log('[CodePush] ERROR: ' + err);
      }
    );
  }
}
