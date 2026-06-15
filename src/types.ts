export type ActiveTab = 'home' | 'about' | 'projects' | 'contact';

export interface Milestone {
  id: string;
  period: string;
  title: string;
  tech: string[];
  description: string;
  iconName: string;
  stage: 'HTML/CSS' | 'JavaScript' | 'APIs' | 'React';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tech: string[];
  learningOutcome: string;
  iconName: string;
}

// Types for Task Management Dashboard with integrated user auth
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  dueDate?: string;
  category: 'work' | 'personal' | 'learning' | 'health';
  createdAt: string;
}

export interface TaskUser {
  username: string;
  displayName: string;
  avatarUrl: string;
  tasks: Task[];
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'thunderstorm';
  humidity: number;
  windSpeed: number;
  description: string;
}
