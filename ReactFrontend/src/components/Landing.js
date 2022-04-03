import React from 'react'
import { useHistory } from 'react-router-dom'

const Landing = () => {
    const history = useHistory()

    return(
        <div>
            <header id="header" className="header fixed-top">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

                <a href="index.html" className="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt=""/>
                    <span style={{color:'rgb(246, 193,67)'}}>UP<span style={{color:'rgb(49, 117, 137)'}}>Save</span></span>
                </a>

                <nav id="navbar" className="navbar">
                    <ul>
                    <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                    <li><a className="nav-link scrollto" href="#about">About</a></li>
                    <li><a className="nav-link scrollto" href="#team">Team</a></li>
                    <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
                    <li><a className="getstarted scrollto" href="/register">Get Started</a></li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

                </div>
            </header>



            <section id="hero" className="hero d-flex align-items-center">

                <div className="container">
                <div className="row">
                    <div className="col-lg-6 d-flex flex-column justify-content-center">
                    <h1>We offer smart budgeting for everyone</h1>
                    <h2>Our goal is working on minimizing your efforts and maximising your savings through our platform</h2>
                    <div >
                        <div className="text-center text-lg-start">
                        <a href="#about" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                            <span>Know more</span>
                            <i className="bi bi-arrow-right"></i>
                        </a>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 hero-img" >
                    <img src="assets/img/hero-img.png" className="img-fluid" alt=""/>
                    </div>
                </div>
                </div>

            </section>

            <main id="main">
                <section id="about" className="about">

                <div className="container">
                    <div className="row gx-0">

                    <div className="col-lg-6 d-flex flex-column justify-content-center">
                        <div className="content">
                        <h3>Who We Are</h3>
                        <h2>UPSave is a financial platform which aims to optimize the budget plan and let you have more control over your money.</h2>
                        <p>
                            It will serve as a <b>FRIEND</b> - expert in financing! It will keep track of your daily budget in a categorized
                            way and send reports, financial advises generated from our <b>powerful AI</b>. 
                        </p>
                        <div className="text-center text-lg-start">
                            <a href="#" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                            <span>Join us!</span>
                            <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        </div>
                    </div>

                    <div className="col-lg-6 d-flex align-items-center">
                        <img src="assets/img/about.jpg" className="img-fluid" alt="" />
                    </div>

                    </div>
                </div>

                </section>
            </main>


            <section id="values" className="values">

            <div className="container">

                <header className="section-header">
                <h2>Our Values</h2>
                <p>This is what makes us different</p>
                </header>

                <div className="row">

                <div className="col-lg-4">
                    <div className="box">
                    <img src="assets/img/values-1.png" className="img-fluid" alt=""/>
                    <h3>SECURITY</h3>
                    <p>We make sure all your financial data is processed in the safest way out there! We make use of the FinTech giant <b>PLAID API</b></p>
                    </div>
                </div>

                <div className="col-lg-4 mt-4 mt-lg-0" >
                    <div className="box">
                    <img src="assets/img/values-2.png" className="img-fluid" alt=""/>
                    <h3>ARTIFICIAL INTELLIGENCE</h3>
                    <p>Your transactions will be analyzed by our AI and you will get advises and recommendations </p>
                    </div>
                </div>

                <div className="col-lg-4 mt-4 mt-lg-0" >
                    <div className="box">
                    <img src="assets/img/values-3.png" className="img-fluid" alt="" />
                    <h3>TRANSPARENCY</h3>
                    <p>All your bank accounts in one place - you set your limits and we will help you save as much as possible!</p>
                    </div>
                </div>

                </div>

            </div>

            </section>


            <section id="features" className="features">

        <div className="container">

            <header className="section-header">
            <h2>Features</h2>
            <p>What you will get with UPSave</p>
            </header>

            <div className="row">

            <div className="col-lg-6 text-center">
                <img width={600} src="assets/img/features.png" className="img-fluid" alt="" />
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0 d-flex">
                <div className="row align-self-center gy-4">

                <div className="col-md-6" >
                    <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>Updates of your budget</h3>
                    </div>
                </div>

                <div className="col-md-6" >
                    <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>All-in one bank statements</h3>
                    </div>
                </div>

                <div className="col-md-6" >
                    <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>No need for multiple online banking apps</h3>
                    </div>
                </div>

                <div className="col-md-6" >
                    <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>Focuss on what matters</h3>
                    </div>
                </div>

                <div className="col-md-6" >
                    <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>Finance advices</h3>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="feature-box d-flex align-items-center">
                    <i className="bi bi-check"></i>
                    <h3>A friend to help you save money</h3>
                    </div>
                </div>

                </div>
            </div>

            </div>
            </div>
            </section>


            <section id="team" className="team">

            <div className="container">

            <header className="section-header">
                <h2>Team</h2>
                <p>Our hard working team</p>
            </header>

            <div className="row gy-4">

                <div className="col-lg-3 col-md-6 d-flex align-items-stretch" >
                <div className="member">
                    <div className="member-img">
                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQHWONTMefAclA/profile-displayphoto-shrink_400_400/0/1620310397561?e=1654732800&v=beta&t=4DUCIfUfpaAdWJscTw_7wfSpRaL2qt9FsyC9i0NX8qU" className="img-fluid" alt=""/>
                    <div className="social">
                        <a href=""><i className="bi bi-twitter"></i></a>
                        <a href=""><i className="bi bi-facebook"></i></a>
                        <a href=""><i className="bi bi-instagram"></i></a>
                        <a href=""><i className="bi bi-linkedin"></i></a>
                    </div>
                    </div>
                    <div className="member-info">
                    <h4>Gabriela Georgieva</h4>
                    <span>Software Engineer</span>
                    <p>A lot to say!</p>
                    </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member">
                    <div className="member-img">
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQG4IGDt85-fUw/profile-displayphoto-shrink_400_400/0/1608018185219?e=1654732800&v=beta&t=tOBpD2daBYMBdAeLL2p8oBzrkl_A5Z_ijSyltnrwYJA" className="img-fluid" alt=""/>
                    <div className="social">
                        <a href=""><i className="bi bi-twitter"></i></a>
                        <a href=""><i className="bi bi-facebook"></i></a>
                        <a href=""><i className="bi bi-instagram"></i></a>
                        <a href=""><i className="bi bi-linkedin"></i></a>
                    </div>
                    </div>
                    <div className="member-info">
                    <h4>Milos Vukadinovic</h4>
                    <span>Software Engineer</span>
                    <p>A lot to say!</p>
                    </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-6 d-flex align-items-stretch" >
                <div className="member">
                    <div className="member-img">
                    <img src="https://media-exp1.licdn.com/dms/image/D5603AQED_dh4Tv5XZw/profile-displayphoto-shrink_400_400/0/1642951767068?e=1654732800&v=beta&t=A967Y--GHp02oeepIK2Gp8YF22-w9y8jG13kBgSauak" className="img-fluid" alt=""/>
                    <div className="social">
                        <a href=""><i className="bi bi-twitter"></i></a>
                        <a href=""><i className="bi bi-facebook"></i></a>
                        <a href=""><i className="bi bi-instagram"></i></a>
                        <a href=""><i className="bi bi-linkedin"></i></a>
                    </div>
                    </div>
                    <div className="member-info">
                    <h4>Kristina Myftaraga</h4>
                    <span>Business Development</span>
                    <p>A lot to say!</p>
                    </div>
                </div>
                </div>

                <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member">
                    <div className="member-img">
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQFxiNORuYB3fg/profile-displayphoto-shrink_400_400/0/1643116822050?e=1654732800&v=beta&t=o32iRinWSXlV4D61BpbhcdeHfyQ2otylmTy9zjl6YPQ" className="img-fluid" alt=""/>
                    <div className="social">
                        <a href=""><i className="bi bi-twitter"></i></a>
                        <a href=""><i className="bi bi-facebook"></i></a>
                        <a href=""><i className="bi bi-instagram"></i></a>
                        <a href=""><i className="bi bi-linkedin"></i></a>
                    </div>
                    </div>
                    <div className="member-info">
                    <h4>Lazaron Shyta</h4>
                    <span>Software Engineer</span>
                    <p>A lot to say!</p>
                    </div>
                </div>
                </div>

            </div>

            </div>

            </section>



            <section id="contact" className="contact">

                <div className="container" >

                    <header className="section-header">
                    <h2>Contact</h2>
                    <p>Contact Us</p>
                    </header>

                    <div className="row gy-4">

                    <div className="col-lg-6">

                        <div className="row gy-4">
                        <div className="col-md-6">
                            <div className="info-box">
                            <i className="bi bi-geo-alt"></i>
                            <h3>Address</h3>
                            <p>Skaptopara 4<br/>2700 Blagoevgrad, Bulgaria</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="info-box">
                            <i className="bi bi-telephone"></i>
                            <h3>Call Us</h3>
                            <p>+1234123124</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="info-box">
                            <i className="bi bi-envelope"></i>
                            <h3>Email Us</h3>
                            <p>noinfo@upsave.com</p>
                            </div>
                        </div>
                        </div>

                    </div>

                    <div className="col-lg-6">
                        <form action="forms/contact.php" method="post" className="php-email-form">
                        <div className="row gy-4">

                            <div className="col-md-6">
                            <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                            </div>

                            <div className="col-md-6 ">
                            <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                            </div>

                            <div className="col-md-12">
                            <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                            </div>

                            <div className="col-md-12">
                            <textarea className="form-control" name="message" rows="6" placeholder="Message" required ></textarea>
                            </div>

                            <div className="col-md-12 text-center">
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message">Your message has been sent. Thank you!</div>

                            <button type="submit">Send Message</button>
                            </div>

                        </div>
                        </form>

                    </div>

                    </div>

                </div>

                </section>

        </div>
    )
}

export default Landing;
