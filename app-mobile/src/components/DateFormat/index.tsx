import React from 'react';
import { format } from 'date-fns';
import { DateText } from '@components/DateFormat/styles';
import useLocale from '@hooks/use-locale';

interface DateFormatProps {
  date: string;
}

const DateFormat = ({ date }: DateFormatProps) => {
  const { t } = useLocale();
  const formattedDate = format(new Date(date), t('DATE.FORMAT'));

  return <DateText>{formattedDate}</DateText>;
};

export default DateFormat;
