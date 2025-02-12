import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNew',
  standalone: true
})
export class IsNewPipe implements PipeTransform {
  transform(createdAt: Date): boolean {
    const now = new Date();
    const productDate = new Date(createdAt);
    const differenceInDays = Math.floor((now.getTime() - productDate.getTime()) / (1000 * 3600 * 24));
    return differenceInDays <= 30; // Consider products newer than 30 days as "new"
  }
}
