import { Task } from "../interfaces/taskIntefaces";

interface GetAllTaskResponse {
  totalPage: number;
  page: number;
  count: number;
  data: Task[];
}

interface CreateTaskResponse {
  message: string;
  data: {
    created_at: string;
    updated_at: string;
    id: string;
    deleted_at: string | null;
    title: string;
    description: string;
    completed: boolean;
  };
}

export { GetAllTaskResponse, CreateTaskResponse };
