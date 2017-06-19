import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Pipe({name: 'formatCell'})
export class FormatCellPipe implements PipeTransform {

  constructor( private currencyPipe: CurrencyPipe) {}

  transform(value: any, format: string) {
    if (value === undefined) {
      return 'not available';
    }

    if (format === 'default') {
      if (Array.isArray(value)) {
        if (typeof value[0] !== 'object' ) {
          return value.join(', ');
        } else {
          return value.map(obj => {
            return obj.name;
          }).join(', ');
        }
      }
    }

    if (typeof value === 'object') {
      return value.name;
    }

    if (format === 'currency') {
      return this.currencyPipe.transform(value, 'USD', true);
    }

    if (format === 'day') {
      switch (value) {
        case 'Monday': {
          return 'Mon';
        }
        case 'Tuesday': {
          return 'Tue';
        }
        case 'Wednesday': {
          return 'Wed';
        }
        case 'Thursday': {
          return 'Thurs';
        }
        case 'Friday': {
          return 'Fri';
        }
        case 'Saturday': {
          return 'Sat';
        }
        case 'Sunday': {
          return 'Sun';
        }
      }
    }

    if (format === 'name') {
      const commonName = value.slice(3, -6); // This returns the Common Name. Ex: Chad Moyer
      const matches = commonName.match(/\b(\w)/g); // ['C', 'M']
      const acronym = matches.join(''); // CM
      return acronym;
    }

    if (format === 'commonName') {
      return value.slice(3, -6);
    }

    if (format === 'taskDate') {
      const theDate = new Date(value);
      const intDay = theDate.getDay();
      const intDate = theDate.getDate();
      let strDay: string;
      switch (intDay) {
        case 0: {
          strDay = 'Sun';
          break;
        }
        case 1: {
          strDay = 'Mon';
          break;
        }
        case 2: {
          strDay = 'Tue';
          break;
        }
        case 3: {
          strDay = 'Wed';
          break;
        }
        case 4: {
          strDay = 'Thurs';
          break;
        }
        case 5: {
          strDay = 'Fri';
          break;
        }
        case 6: {
          strDay = 'Sat';
          break;
        }
      }
      return strDay + ' ' + intDate.toString();
    }

    if (format === 'approvalTaskDate') {
      const theDate = new Date(value);
      const intMonth = theDate.getMonth() + 1;
      const intDate = theDate.getDate();
      return intMonth + '/' + intDate;
    }

    if (format === 'date') {
      const date = value.substr(0, 10);
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      return month + '/' + day + '/' + year;
    }
    return value;
  }
}
