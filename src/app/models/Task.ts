export interface Task {
    id:number,
    name: string,
    description: string,
    complete: boolean
}

export interface TaskCreate {
    name: string,
    description: string
}

export interface TaskEdit {
    name: string,
    description: string,
    complete: boolean
}