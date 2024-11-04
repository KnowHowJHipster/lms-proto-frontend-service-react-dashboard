import dayjs from 'dayjs';

import { APP_LOCAL_DATETIME_FORMAT } from '../../config/constants';

export const convertDateTimeFromServer = (
  date: string | number | dayjs.Dayjs | Date | null | undefined
) => (date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = (date?: string): dayjs.Dayjs | null =>
  date ? dayjs(date) : null;

export const displayDefaultDateTime = () =>
  dayjs().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);
