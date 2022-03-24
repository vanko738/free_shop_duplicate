
import React, { Component } from 'react'

import './Footer.css'
export default class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <p className='footer-title'>Created by Ivan Valkov for SoftUni &copy;</p>
                <nav>
                    <ul className='footer-nav-items'>
                        <li>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" >
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" >
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" >
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" >
                                <i className="fab fa-github-square"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
