interface CustomAlertProps {
  title?: string
  message: string
  type: string
  open: boolean
}

interface CustomAlertComponentProps extends CustomAlertProps {
  setAlertComponent: React.Dispatch<React.SetStateAction<CustomAlertProps>>;
}