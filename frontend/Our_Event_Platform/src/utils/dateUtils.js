
import { format } from 'date-fns/format'

export const formatDate = (date) => {
  return new Date(date).toISOString().split('.')[0] + 'Z' //new Date(date).toISOString().split('.')[0] + 'Z';
  };