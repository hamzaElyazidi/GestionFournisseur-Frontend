// src/app/websocket.service.ts
 import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
// import {Stomp} from "@stomp/stompjs";



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient ; // Initialize with '!' to tell TypeScript it will be initialized later
  private projectEventSubject: Subject<ProjectEvent> = new Subject<ProjectEvent>();
  constructor() {
    // Initialize the stompClient property in the constructor
    this.stompClient = Stomp.over(new SockJS('http://localhost:8009/ws'));
  }

    connect(userId: number): Observable<ProjectEvent> {
      const socket = new SockJS('http://localhost:8009/ws');
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, frame => {
        this.stompClient?.subscribe('/topic/projectEvent', message => {
          const event: ProjectEvent = JSON.parse(message.body);
          if (event.projectManagerId === userId) {
            this.projectEventSubject.next(event);
          }
        });
      });

      return this.projectEventSubject.asObservable();
    }
  }
//}
export interface ProjectEvent {
  id:number
  n_contract: string;
  projectId: number;
  buyerName: string;
  projectManagerId: number;
}
