import React, { useState, useEffect } from 'react';
import './Header.css';
import { Avatar, Vector, Gear, Bell, Message } from "../images/index";
import { Link } from "react-router-dom";

const Header = ({ token }) => {
    const [user, setUser] = useState(null); // State to store user data
    const [isAvatarPopUp, setIsAvatarPopUp] = useState(false);
    const [isBellPopUp, setIsBellPopUp] = useState(false);

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:4443/galaxy-express/User/secure-data', {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (response.ok) {
                    const userData = await response.json();
                    console.log('Fetched user data:', userData); // Log user data to console
                    setUser(userData);
                } else {
                    console.error('Error fetching user data:', response.statusText);
                    const errorData = await response.json();
                    console.error('Error details:', errorData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUser(); // Call the fetchUser function
    }, [token]); // Fetch user data when token prop changes
    

    return (
        <div className='header'>
            <div className="header__left">
                {/* Display user's first name, last name, and father's name if user data is available */}
                {user && (
                    <p className='header__left__nickname'>
                        {user.FirstName} {user.LastName} {user.FatherName}
                    </p>
                )}
                <div className="avatar"
                    onMouseEnter={() => setIsAvatarPopUp(true)}
                    onMouseLeave={() => setIsAvatarPopUp(false)}>
                    <img src={Avatar} alt="" className='avatar__image' />
                    <div className="avatar__popup">
                        <img className='avatar__popup__picture' src={Vector} alt="" />
                    </div>
                    {isAvatarPopUp && (
                        <div className="profile">
                            <p className='profile__text'>Керувати профілем</p>
                            <hr className='profile__hr'/>

                            <p className='profile__text'>Мoї адреси</p>
                            <p className='profile__text'>Платіжні картки</p>
                            <hr className='profile__hr'/>

                            <p className='profile__text'>Вийти</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="header__right">
                <p className='header__right__balance'>560$</p>
                <div className="bell__popup"
                    onMouseEnter={() => setIsBellPopUp(true)}
                    onMouseLeave={() => setIsBellPopUp(false)}>
                    <img className="bell__popup__picture" src={Bell} alt="" />

                    {isBellPopUp && (
                        <div className='notification'>
                            <div className='notification__header'>
                                <p>Ваші сповіщення</p>
                                <img src={Message} alt="" />
                            </div>
                            <NotificationMessage text="Вашу посилку створено, перевірте, будь ласка, статистику!" time="17:58"/>
                            <p className='notification__date'>14.10</p>
                            <NotificationMessage text="Посилку було отримано, дякуємо за довіру!" time="12:04"/>
                        </div>
                    )}
                </div>
                <img className='header__right__gear' src={Gear} alt="" />
            </div>
        </div>
    )
}

export const NotificationMessage = ({text, time}) =>{
    return(
        <div className="notification__message">
            <p className="notification__message__text">{text}</p> 
            <p className="notification__message__time">{time}</p>
        </div>
    )
}

export default Header;
