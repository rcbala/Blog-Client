import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
      <div >
            <div className="Footer" >
                <div className="Footer">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1" >
                            <h3><span>RC</span>TECH</h3>
                            <p>Technical writing is performed by a technical writer and is the process of writing and sharing technical information in a professional setting</p>
                            <div className="footer-icons">
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item " >
                                    <a className="nav-item footer-link-hover"><i class="fa-brands fa-servicestack"></i>Services</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="footer-link-hover" ><i class="fa-solid fa-arrow-up-right-from-square"></i>Portfolio</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="footer-link-hover" ><i class="fa-solid fa-mobile"></i>Contact Us</a>
                                </li>
                               
                               
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Quick Links</h5>
                            <p><i class="fa-solid fa-phone-volume"></i> +91 97898485889</p>
                            <p><i class="fa-solid fa-envelope"></i> rctech@gmail.com</p>
                            <p><i class="fa-solid fa-paper-plane"></i> TamilNadu,INDIA.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Last-footer'>
                <h2 className='rights'>@ ALL RIGHTS RESERVED BY RCTECH</h2>
        </div>
        </div>
        
    )
}

export default Footer