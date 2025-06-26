import '../styles/Promo.css';

const Promo = (props) => {
    return (
        <div className="promo">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.data.feature}</h5>
            <p className="card-text">{props.data.benefit}</p>
            <p className="card-text"><em>{props.data.target_audience}</em></p>
            <a href="#" className="btn btn-sm btn-primary">Click to buy!</a>
          </div>
        </div>
      </div>
      
    );
} 

export default Promo;