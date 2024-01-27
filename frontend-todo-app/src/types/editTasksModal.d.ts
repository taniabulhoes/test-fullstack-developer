interface EditTaskModalProps {
  editTaskModalOpen: number;
  setEditTaskModalOpen: React.Dispatch<React.SetStateAction<number>>;
  taskId: number
  userId: number
  token: string
}