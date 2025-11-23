export enum SimulationType {
  MECHANICS = 'Mechanics',
  ELECTRICITY = 'Electricity',
  GEOMETRY = 'Geometry',
  ALGEBRA = 'Algebra',
  UNKNOWN = 'General'
}

export interface SimulationState {
  code: string | null;
  loading: boolean;
  error: string | null;
  type: SimulationType;
  logs: string[];
}

export interface ExampleScenario {
  id: string;
  title: string;
  description: string;
  category: SimulationType;
  icon: string;
}
