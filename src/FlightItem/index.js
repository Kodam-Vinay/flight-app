import { BsArrowRight } from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import './index.css'

const FlightItem = props => {
    const {flightsList} = props
    const {airline, arrivalCity, departureCity, arrivalDate, arrivalTime, price} = flightsList
    return(
        <li className='each-flight-list-item'>
            <div className='flight-logo-airline-container'>
                <img src="https://res.cloudinary.com/dwgpba5n2/image/upload/v1690105842/airplane-logo.jpg" alt="flight-logo"/>
                <p>{airline}</p>
            </div>
            <div className='from-place-to-place-container'>
                <p>{arrivalCity}</p>
                <BsArrowRight size={'30px'} className='to-logo'/>
                <p>{departureCity}</p>
            </div>
            <div className='arrival-date-container'>
                <div>
                    <p>{arrivalDate}</p>
                    <p className='arrival-time'>{arrivalTime}</p>
                </div>
                <p className='price'>{price}<FaRupeeSign size={'15px'}/></p>
            </div>
            <button className='book-ticket'>Book</button>
        </li>
    )
}
export default FlightItem