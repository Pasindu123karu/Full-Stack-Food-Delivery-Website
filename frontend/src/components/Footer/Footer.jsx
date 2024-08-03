import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ea, illum minima quia illo dolorum optio nisi nihil reprehenderit incidunt rerum culpa adipisci in iure iusto ipsa quidem beatae dolorem.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+94-71-068-2595</li>
                    <li>contact@luxe.com</li>
                </ul>
        </div>
      </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 © Luxe.com - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer
