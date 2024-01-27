export default function CustomAlert({
  message,
  type,

} : CustomAlertProps) {
  return(
    <div className={`alert ${type === "error" ? 'alert__error' : 'alert__success' }`}>{message}</div>
  )
}