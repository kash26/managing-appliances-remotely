import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {

    appareilSubject = new Subject<any[]>();

    private appareils = [
        {
          id: 1,
          name: 'Machine à laver',
          status: 'eteint'
        },
        {
          id: 2,
          name: 'Frigo',
          status: 'allumé'
        },
        {
          id: 3,
          name: 'Ordinateur',
          status: 'eteint'
        }
      ];

      constructor(private httpClient: HttpClient) { }

      addAppareil(name: string, status: string) {
        const appareilObject = {
          id: 0,
          name: '',
          status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppreilSubject();
      }

      getAppareilById(id: number) {
        const appareil = this.appareils.find(
          (s) => {
            return s.id === id;
          }
        );
        return appareil;
      }

      emitAppreilSubject() {
        this.appareilSubject.next(this.appareils.slice());
      }

      switchOnAll() {
        for (const appareil of this.appareils) {
          appareil.status = 'allumé';
        }
        this.emitAppreilSubject();
      }
      switchOffAll() {
        for (const appareil of this.appareils) {
          appareil.status = 'eteint';
          this.emitAppreilSubject();
        }
      }

      switchOnOne(i: number) {
        this.appareils[i].status = 'allumé';
        this.emitAppreilSubject();
      }

      switchOffOne(i: number) {
        this.appareils[i].status = 'eteint';
        this.emitAppreilSubject();
      }

      saveAppareilsToServer() {
        this.httpClient
          .put('https://projet-angular-openclass.firebaseio.com/appareil.json', this.appareils)
          .subscribe(
            () => {
              console.log('Enregistrement terminé');
            },
            (error) => {
              console.log('Erreur : ' + error);
            }
          );
      }

      getAppareilsFromServer() {
        this.httpClient
          .get<any[]>('https://projet-angular-openclass.firebaseio.com/appareil.json')
          .subscribe(
            (response) => {
              this.appareils = response;
              this.emitAppreilSubject();
            },
            (error) => {
              console.log('Erreur : ' + error);
            }
          );
      }

}
