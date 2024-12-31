export interface TaskTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  estimatedDuration: number;
  category: 'development' | 'reporting' | 'planning';
}