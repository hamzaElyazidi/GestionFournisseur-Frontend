// import { Injectable, OnDestroy } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { HttpClient } from '@angular/common/http';
// import { Observable, Subscription, interval } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService implements OnDestroy {
//   private baseUrl = "http://localhost:8009"; // Adjust to your backend URL
//   private subscription: Subscription | null = null;
//   private projectManagerId = '1'; // Replace with the actual project manager ID
//
//   constructor(private toastr: ToastrService, private http: HttpClient) {
//     this.startListening(this.projectManagerId).subscribe(() => {
//       this.subscription = interval(5) // Poll every 5 seconds
//         .pipe(
//           switchMap(() => this.getNotifications(this.projectManagerId))
//         )
//         .subscribe(notifications => {
//           notifications.forEach(notification => {
//             this.showNotification(notification);
//           });
//         });
//     });
//   }
//
//   getNotifications(projectManagerId: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/notifications/${projectManagerId}`);
//   }
//
//   startListening(projectManagerId: string): Observable<void> {
//     console.log("Im Listening in the front")
//     return this.http.post<void>(`${this.baseUrl}/startListening/${projectManagerId}`, {});
//   }
//
//   showNotification(notification: any): void {
//     console.log(notification.name, 'New Project Event')
//     this.toastr.success(notification.name, 'New Project Event');
//   }
//
//   ngOnDestroy(): void {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }
// }
