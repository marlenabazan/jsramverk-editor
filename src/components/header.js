function Header( {userEmail, setToken}) {

    const handleLogout = () => {
        setToken("");
    }

    return(
        <header className="App-header">
                <h1>
                    Text Editor
                </h1>
                Logged in as {userEmail}
                <button className="Save Logout" onClick={handleLogout}>Logout</button>
            </header>
    )
}

export default Header;