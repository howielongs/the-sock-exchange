import promo_data from '../assets/promo.json';
import Promo from './Promo';

const Featured = () => {
    return (
        <div className="container my-5">
            <h4 className="mt-5 mb-4"
            style = {{
                gap: "2rem",
            }}>Featured Items</h4>
              <div
                className="d-flex flex-wrap justify-content-start align-items-stretch"
                style={{ gap: "20px" }}
              >
                {promo_data.map((promo) => (
                    <Promo key={promo.id} data={promo} />
                ))}
              </div>
        </div>
    );
};

export default Featured;