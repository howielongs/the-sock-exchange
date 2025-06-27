import promo_data from '../assets/promo.json';
import Promo from './Promo';

const Featured = () => {
    return (
        <div className="container my-4">
            <h5 className="mb-3">Featured</h5>
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