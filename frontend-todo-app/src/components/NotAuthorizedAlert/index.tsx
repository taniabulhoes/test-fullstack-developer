import '../../styles/styles.scss';

export default function NotAuthorizedAlert() {
  return (
    <div className="notAuthorized__container">
      <h1>You are not logged in or your permission has expired</h1>
      <h1>You will be redirect, please login again</h1>
    </div>
  )
}