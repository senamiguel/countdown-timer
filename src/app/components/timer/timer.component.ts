import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: false,

  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  nomeEvento: string = "New Year";
  month: string = '0';
  day: string = '0';
  hour: string = '0'.padStart(2, '0');
  minute: string = '0'.padStart(2, '0');
  second: string = '0'.padStart(2, '0');
  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateTime(): void {
    const now = new Date();
    const event = new Date('2025-01-01T00:00:00');
    var diff = Math.abs(event.getTime() - now.getTime());
    this.month = this.padWithZero(Math.floor(Number(diff) / (360000000 * 30)));
    diff -= Number(this.month) * 360000000 * 30;
    this.day = this.padWithZero(Math.floor(Number(diff) / (3600000 * 24)));
    diff -= Number(this.day) * 3600000 * 24;
    this.hour = this.padWithZero(Math.floor(Number(diff) / 3600000));
    diff -= Number(this.hour) * 3600000;
    this.minute = this.padWithZero(Math.floor(Number(diff) / 60000));
    diff -= Number(this.minute) * 60000;
    this.second = this.padWithZero(Math.floor(Number(diff) / 1000));
    diff -= Number(this.second) * 1000;
  }

  private padWithZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
