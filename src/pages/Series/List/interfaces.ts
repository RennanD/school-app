export interface SeriesProps {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  formatedDate: string;
  created_at: string;
}
