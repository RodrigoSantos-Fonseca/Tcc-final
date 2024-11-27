import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search, home, add, person} from 'ionicons/icons';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {

  constructor() {

    addIcons({ library, playCircle, radio, search, home, add, person });

   }

  ngOnInit() {}

}
