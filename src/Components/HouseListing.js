import React, {useContext} from 'react';

import { FaToilet } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { HouseContext } from '../context/HouseContext';


const HouseListing = ({ x, elem }) => {
    const {houses,dispatch} = useContext(HouseContext)
    let house = houses.Homes[elem];
    console.log(house.images[0])
    const MoreInfo = () => {
        dispatch({type:'HOUSE_INFO', DashBoard: false, Item: elem})
    }
    let random = Math.floor(Math.random() * Math.floor(house.images.length));
    elem == 0 ? random = 0 : random = random;
    return ( 
        <div onClick = {() => MoreInfo()} className = "DashBoardItems">
                <div className = "DashBoardImg">
                    <img src = {house.images[random]} name={elem}/>
                </div>
                <div className = "DashBoardMainData">
                    <li> {house.street}</li>
                    <li>{house.city}, {house.state}</li>
                    <li>${house.rent}</li>
                </div>
            <div style = {underline}/>
            <div className = "DashBoardIcons">
                <li style={{paddingLeft: 0}}><FaBed style = {Icons}/> {house.bedrooms}</li>
                <li><FaToilet style = {Icons}/> {house.bathrooms}</li>
                <li><FaExternalLinkSquareAlt style = {Icons}/>{house.finishedSqFt} ft<sup>2</sup></li>
            </div>
        </div>
     );
}
const Icons = {
    style: { verticalAlign: 'middle' },
    padding: '0 0.2em 0 0.2em',
}
const underline = {
    borderBottom: '2px solid rgb(205, 206, 206)',
    width: '87%',
    marginLeft: '4%',
}
export default HouseListing;