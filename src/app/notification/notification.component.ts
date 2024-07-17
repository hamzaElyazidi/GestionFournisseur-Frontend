// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { NotificationService } from '../services/notification.service'
// import { interval, Subscription } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
//
// @Component({
//   selector: 'app-notification',
//   templateUrl: './notification.component.html',
//   styleUrls: ['./notification.component.css']
// })
// export class NotificationComponent implements OnInit, OnDestroy {
//   private subscription: Subscription;
//   private projectManagerId = 'exampleManagerId'; // Replace with the actual project manager ID
//
//   constructor(private toastr: ToastrService, private notificationService: NotificationService) {}
//
//   ngOnInit(): void {
//     this.notificationService.startListening(this.projectManagerId).subscribe(() => {
//       this.subscription = interval(5000) // Poll every 5 seconds
//         .pipe(
//           switchMap(() => this.notificationService.getNotifications(this.projectManagerId))
//         )
//         .subscribe(notifications => {
//           notifications.forEach(notification => {
//             this.showNotification(notification);
//           });
//         });
//     });
//   }
//
//   ngOnDestroy(): void {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }
//
//   showNotification(notification: any): void {
//     this.toastr.success(notification.name, 'New Project Event');
//   }
// }
//
