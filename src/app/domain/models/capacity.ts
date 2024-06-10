import { TechnologyBasic } from "./technology";

export interface Capacity {
    id?: number;
    name: string;
    description: string;
    technologies: TechnologyBasic[];
}

export interface CapacityBasic {
  id?: number;
  name: string;
}

export interface CapacityBasicWithTechnologies {
  id?: number;
  name: string;
  technologies: TechnologyBasic[];
}
