import { Task } from "./task.class";

export class Routine {
    name: string;
    tasks: Task[];
    constructor(name: string, tasks: Task[]) {
        this.name = name;
        this.tasks = tasks;
    }
}