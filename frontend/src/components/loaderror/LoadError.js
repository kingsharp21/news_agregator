import './LoadError.css'

function LoadError(params) {
    return (
      <div className="load-error">
        {/* <div className='lo'></div> */}
        <h1>No article available at this moment</h1>

        <span>
          <a href="#">Reload to see new articles</a>
        </span>

        <p>
          You can also try by setting your <span>preference</span>
        </p>
      </div>
    );
}

export default LoadError