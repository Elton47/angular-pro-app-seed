import { Component } from "../../../../node_modules/@angular/core";

@Component({
  selector: 'app-footer',
  styleUrls: ['app-footer.component.scss'],
  template: `
    <footer>
      <h5>Copyright © {{ currentYear >= 2018 ? currentYear : 2018 }} - Elton47</h5>
      <h5>Fork this repo on: 
        <a href="https://github.com/Elton47/angular-pro-app-seed" target="_blank">GitHub</a>
      </h5>
    </footer>
  `
})
export class AppFooterComponent {
  currentYear: number = new Date().getFullYear();
}