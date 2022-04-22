import react from 'react';

function Navbar() {
    return (
        // <nav className="navbar navbar-light bg-light">
        //     <div className="container-fluid">
        //         <span className="navbar-brand mb-0 h1 navbar-title">Anchor Editor</span>
        //     </div>
        // </nav>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
                        Anchor Editor
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
