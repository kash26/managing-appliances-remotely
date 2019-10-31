import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  isAuth = false;

  appareils: any[];
  appareilSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppreilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }
  onEteindre() {
    if (confirm('Etes-vous sur de vouloir tout eteidre ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }

}
