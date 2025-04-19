export interface HomeViewProps {
  appName: string;
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
    bgColor: string;
  }[];
} 