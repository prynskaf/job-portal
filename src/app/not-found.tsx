import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Oops! Page Not Found</h2>
      <p className="error-description">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <button className="back-home-btn">Go Back Home</button>
      </Link>
    </div>
  );
}
