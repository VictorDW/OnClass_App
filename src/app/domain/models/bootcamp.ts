import { CapacityBasic, CapacityBasicWithTechnologies } from "./capacity";

export interface Bootcamp {
  id?: number;
  name: string;
  description: string;
  capacities: CapacityBasic[];
}

export interface BootcampResponse {
  id: number;
  name: string;
  description: string;
  capacities: CapacityBasicWithTechnologies[];
}
