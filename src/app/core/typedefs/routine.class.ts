import { Task } from "./task.class";

export class Routine {
  constructor(public name: string, public tasks: Task[]) {}
}