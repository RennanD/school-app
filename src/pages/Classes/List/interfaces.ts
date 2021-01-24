import { SeriesProps } from '../../Series/List/interfaces';

export interface ClassProps {
  id: number;
  name: string;
  shift: string;
  code: string;
  status: 'active' | 'inactive';
  created_at: string;
  formatedDate: string;
  series: SeriesProps;
}
