import defaultImg from './img/produce-market.png';

const Item = ({ itemData }) => {
    const img = itemData?.imageURL === undefined || itemData?.imageURL === '' 
        ? defaultImg : itemData?.imageURL; 
    return (
        <div className="item-wrapper">
            <img src={img} alt={itemData?.name} />
            <div className="details">
                <h3 className="item-name">{itemData?.name}</h3>            
                <span>${itemData?.price}</span>            
            </div>
        </div>
    )
}

export default Item;