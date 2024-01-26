import '../../styles/styles.scss';

export default function NotAuthorizedAlert() {
  return (
    <div className="notAuthorized__container">
      <h1>You are not logged in or your permission has expired</h1>
      <h2>Please login again</h2>
    </div>
  )
}