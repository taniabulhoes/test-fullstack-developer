export const defaultAlert = {
  title: '',
  message: '',
  type: '',
  open: false
}

export default function CustomAlert({
  message,
  type,
  open,
  title,
  setAlertComponent

} : CustomAlertComponentProps) {
  if (!open) return

  setTimeout(() => {
    setAlertComponent(defaultAlert)
  }, 1500)


  return(
    <div className={`alert ${type === "error" ? 'alert__error' : 'alert__success' }`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}

