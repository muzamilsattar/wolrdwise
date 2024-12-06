import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className='center'>
      <h1>Page not found 😢</h1>
      <br />
      <br />
      <h3>
        <Link to='/'>Go to HomePage</Link>
      </h3>
    </div>
  );
}
