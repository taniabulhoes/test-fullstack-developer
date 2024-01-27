interface HeaderProps {
  userId: number | undefined
  newTaskModalOpen: boolean;
  setNewTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  token: string | undefined
}