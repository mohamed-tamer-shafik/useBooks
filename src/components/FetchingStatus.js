export default function FetchingStatus({ status }) {
  return (
    <div className="main__fetching-status primary-color fw-600" role="status">
      {status}
    </div>
  );
}
