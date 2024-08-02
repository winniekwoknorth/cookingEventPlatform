
import { format } from 'date-fns/format'

export const formatDate = (date) => {
  return new Date(date).toISOString().split('.')[0] + 'Z' //new Date(date).toISOString().split('.')[0] + 'Z';
  };

  
 export const displayDate = (date) => {
    return format(date, 'dd MMM HH:mm')
  };