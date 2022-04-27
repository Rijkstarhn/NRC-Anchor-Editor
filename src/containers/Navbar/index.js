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
                    <img src="/images/NRC_logo.png" alt="" width="50" height="30" className="d-inline-block align-text-top"/>
                        Anchor Editor
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
