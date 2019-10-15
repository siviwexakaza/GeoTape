import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  openGithub(){
    window.open('https://github.com/siviwexakaza');
  }

  openLinkedin(){
    window.open('https://za.linkedin.com/in/siviwe-xakaza-38972a88');
  }

}
