import { Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrdersQueueService implements OnInit {
  ngOnInit(): void {
    this.subOnMqttMessages();
  }

  private subOnMqttMessages(): void {}
}
