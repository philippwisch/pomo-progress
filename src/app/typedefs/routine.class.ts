import { Task } from "./task.class";

export class Routine {
    name: string;
    steps: Task[];
    constructor(name: string, steps: Task[]) {
        this.name = name;
        this.steps = steps;
    }
}