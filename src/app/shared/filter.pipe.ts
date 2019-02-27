import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filters'
})

export class FilterPipe implements PipeTransform {
  transform(value?: any) {
    return value.filter(option => option.stargazers_count > 0);
  }
}
