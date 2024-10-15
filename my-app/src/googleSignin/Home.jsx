import React from 'react'

function Home({children , style}) {

	const Logout = () => {
		localStorage.clear()
		window.location.reload();
	}
	return (
		<div >
			<div className="logout" >
			<button 
			className="logoutBtn" 
			onClick={Logout} 
			style={style}
			>
			{children}
			Logout
			</button>
			</div>
		</div>
	)
}
export default Home;