import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: false,

  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  nomeEvento: string = 'New Year';
  month: string = '0';
  day: string = '0';
  hour: string = '0'.padStart(2, '0');
  minute: string = '0'.padStart(2, '0');
  second: string = '0'.padStart(2, '0');
  private intervalId!: ReturnType<typeof setInterval>;
  event: Date = new Date('2025-01-01T00:00:00');
  now: Date = new Date();
  nextDay: Date = new Date();

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  addOneDay(): Date {
    this.nextDay.setDate(this.nextDay.getDate() + 1);
    return this.nextDay;
  }

  private updateTime(): void {
    this.now = new Date();
    const diff = Math.abs(this.event.getTime() - this.now.getTime());
    const totalDays = Math.floor(diff / (3600000 * 24));
    this.month = this.padWithZero(Math.floor(totalDays / 30));
    const remainingDays = totalDays % 30;
    this.day = this.padWithZero(remainingDays);
    this.hour = this.padWithZero(Math.floor((diff % (3600000 * 24)) / 3600000));
    this.minute = this.padWithZero(Math.floor((diff % 3600000) / 60000));
    this.second = this.padWithZero(Math.floor((diff % 60000) / 1000));
  }

  private padWithZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  onClick(data: string): void {
    this.nomeEvento = data;
    if (this.nomeEvento == 'New Year') {
      this.event = new Date('2025-01-01T00:00:00');
    } else if (this.nomeEvento == 'Xmas') {
      this.event = new Date('2024-12-25T00:00:00');
    } else {
      this.event = new Date(data + 'T00:00:00');
      this.nomeEvento = 'Custom ✏️';
    }
    this.updateTime();
  }
}
