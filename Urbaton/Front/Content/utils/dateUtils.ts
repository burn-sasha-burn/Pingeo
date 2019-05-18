import * as moment from 'moment';
import {Moment} from 'moment';

const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';

export function toDateTimeStr(date: string | Date | number | Moment): string {
    const dateTime = moment(date);
    return dateTime.isValid() ? dateTime.format(DATE_TIME_FORMAT) : '';
}
