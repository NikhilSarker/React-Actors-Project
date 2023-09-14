
import PropTypes from 'prop-types';

const Cart = ({selectedActors, remaining, totalCost}) => {
  // console.log(selectedActors);

 
  return (
    <div>
      <h3 className="text-white text-3xl font-bold">Total Actor: {selectedActors.length}</h3> 
      <h4 className="text-white text-xl font-bold"> Total Cost: ${totalCost}</h4>
      <h4 className="text-white text-xl font-bold">Remaining Cost: ${remaining}</h4>
      {
        selectedActors &&
        selectedActors?.map((selectActor, index)=>(
          <li className='text-white text-lg py-2' key={index}>{selectActor.name}</li>

        ))
      }
      
    </div>
  );
};

Cart.propTypes={
  selectedActors:PropTypes.array.isRequired,
  remaining:PropTypes.number.isRequired,
  totalCost:PropTypes.number.isRequired,

}
export default Cart;