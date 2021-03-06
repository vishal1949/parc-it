import React from 'react'
import {Link} from 'react-router-dom'
import SearchContainer from './search_container'

class Navbar extends React.Component{
    constructor(props){
        super(props)

        this.handleEvent = this.handleEvent.bind(this);
        this.logout = this.logout.bind(this);
        this.loggedInCheck = this.loggedInCheck.bind(this)
    }

    handleEvent(e) {
        e.preventDefault();
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    loggedInCheck(){
        // if(this.props.id !== null){
        if(this.props.loggedIn === false){
            return (
                <div className='login-signup'>
                    <Link to='/listings' className='signin-stuff'>
                        <p className='parking-only'>Parkings
                            <p className='hide-parking'>
                                Here you can see all the listings around the SF mission district. We hope to deliver a wider
                                range of parkings as we grow!
                            </p> 
                        </p>
                    </Link> 
                    <Link to='/listings/new' className='signin-stuff'>
                        <p className='host-parking'>Host Parking
                            <p className='hide-host'>
                                If you have a private parking spot and would like to earn some money, then click this button.
                            </p>
                        </p>
                    </Link> 
                    <a className='signin-stuff' href=''
                        onClick={e => {
                            this.handleEvent(e);
                            this.props.openModal("signup")
                        }}><p>Sign up</p>
                    </a>
                    <a className='signin-stuff' href=''
                        onClick={e => {
                            this.handleEvent(e);
                            this.props.openModal("login")
                        }}><p>Log in</p>
                    </a>
                </div>
            )
        } else  {
            return(
                <div className='login-signup'>
                    <Link to='/listings' className='signin-stuff'>
                        <p className='parking-only'>Parkings
                            <p className='hide-parking'>
                                Here you can see all the listings around the SF mission district. We hope to deliver a wider
                                range of parkings as we grow!
                            </p> 
                        </p>
                    </Link>
                   
                    <Link to='/listings/new' className='signin-stuff'>
                        <p className='host-parking'>Host Parking
                            <p className='hide-host-logout'>
                                If you have a private parking spot and would like to earn some money, then click this button.
                            </p>
                        </p>
                    </Link> 
                    <a className='signin-stuff' href=''
                        onClick={this.logout}><p>Log Out</p>
                    </a>
                </div>
            )
        }
    }

    render(){
        return (
            <>
                <header className='main-navbar'>
                    <div>
                        {/* just having it so if someone clicks logo it redirects */}
                        <div className='search-bar'>
                            <img src="" alt=""/>
                            <Link to='/'><h1 id='main-logo' className='main-logo'></h1></Link>
                            <SearchContainer />
                        </div>
                    </div>
                    <div >
                        <header>
                            {this.loggedInCheck()}
                        </header>
                    </div >
                </header >
                <div className='gray-bar'></div>
                {/* the above gray bar is just a divider */}
            </>
        )
    }
}

export default Navbar;