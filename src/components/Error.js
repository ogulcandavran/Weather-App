import React from "react";

function Error() {
  return (
    <div className="error">
      <div className="big-text">
        <p>Oops! Nothing to see Here.</p>
      </div>

      <p className="small-text">Please refresh the page.</p>
      <button id="" onClick={() => window.location.reload()}>
        Refresh
      </button>
    </div>
  );
}

export default Error;