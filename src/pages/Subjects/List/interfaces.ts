export interface SubjectsProps {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  created_at: string;
  formattedDate: string;
}
