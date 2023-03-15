
import "./Customise.css";

function Customise({visibility, close}) {

    const updateUserInterest=()=>{

    }
    return (
      <section className={`customise flex ${visibility}`}>
        <div className="customise-wrapper">
          <div className="cutomise-header">
            <h2>Customise your topics</h2>
            <p>
              Choose and manage up to 12 topics for your homepage. They’ll also
              appear under topics that you follow.
            </p>
            <hr />
          </div>
          <div className="options grid">
            {/* <div className="keyword">
              <h2>Sources</h2>
              <div className="tags grid">
                <button>Ghana</button>
                <button>Ghana</button>
                <button>Ghana</button>
              </div>
            </div>
            <div className="keyword">
              <h2>Category</h2>
              <div className="tags grid">
                <button>Ghana</button>
                <button>Ghana</button>
                <button>Ghana</button>
              </div>
            </div>
            <div className="keyword">
              <h2>Authors</h2>
              <div className="tags grid">
                <button>Ghana</button>
                <button>Ghana</button>
                <button>Ghana</button>
              </div>
            </div> */}
          </div>
          <div className="cutom-btn flex">
            <button className="btn cancel" onClick={close}>
              Cancel
            </button>
            <button className="btn save" onClick={updateUserInterest}>
              Save
            </button>
          </div>
        </div>
      </section>
    );
}


export default Customise;