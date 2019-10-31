import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth = false;
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  appareils: any[];
  secondes: number;
  counterSubscrition: Subscription;

  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit() {
    // this.appareils = this.appareilService.appareils;
    const counter = Observable.interval(1000);
    this.counterSubscrition = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occured! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
  }

  ngOnDestroy() {
    this.counterSubscrition.unsubscribe();
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
}
