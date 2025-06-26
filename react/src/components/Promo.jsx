import '../styles/Promo.css';

const Promo = (props) => {
    return (
        <div className = "card" style = {{
            flex: '1',
            minWidth: '300px',
            maxWidth: '45%'
        }}>
            <div className="card bg-light" style = {{
                 color: "black"

            }}>
                <div className="card-text"><strong>{props.data.feature}</strong></div>
                <div className="card-text"><strong>{props.data.benefit}</strong></div>
                <div className="card-text"><em>{props.data.target_audience}</em></div>
                <div className="card-text">
                    <a href="#">Click to buy!</a>
                </div>
            </div>
        </div>
    );
} 

export default Promo;