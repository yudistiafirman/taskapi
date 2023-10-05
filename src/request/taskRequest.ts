interface GetAllTaskRequestParams {
  page?: number;
  pageSize?: number;
  sortBy?: "title" | "created_at";
  sortOrder?: "ASC" | "DESC";
  completed?: "true" | "false";
}

interface TaskRequestBody {
  title: string;
  description: string;
  completed: boolean;
}

export { GetAllTaskRequestParams, TaskRequestBody };
