export interface Task {
  id: string;
  title: string;
  description: string;
  status: taskStatus;
}
export enum taskStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}
