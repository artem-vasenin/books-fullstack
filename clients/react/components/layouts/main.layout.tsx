import Link from 'next/link'
import React, {FC, MouseEventHandler, useEffect, useState} from "react";
import {useRouter} from "next/router";

const MainLayout:FC<{children: any}> = ({ children }) => {
	const router = useRouter();
	const [hide, setHide] = useState(true);
	const [user, setUser] = useState(null);

	const logout = (e: any) => {
		e.preventDefault();
		localStorage.removeItem('user');
		setUser(null);
		router.push('/');
	}

	useEffect(() => {
		const userItem = localStorage.getItem('user');
		if (userItem) {
			setUser(JSON.parse(userItem));
		}
	}, [])

	return (
		<>
			<nav className="navbar navbar-expand-sm navbar-light bg-light">
				<Link href="/"><a className="navbar-brand">Библиотека</a></Link>

				<button className="navbar-toggler" type="button" onClick={() => setHide(!hide)}>
					<span className="navbar-toggler-icon"/>
				</button>
				<div className={`collapse navbar-collapse show ${hide && 'hideMenu'}`} id="navbarNav">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link href="/categories"><a className="nav-link">Категории</a></Link>
						</li>
						<li className="nav-item">
							<Link href="/authors"><a className="nav-link">Авторы</a></Link>
						</li>
						<li className="nav-item">
							<Link href="/books"><a className="nav-link">Книги</a></Link>
						</li>
					</ul>
					<ul className="navbar-nav">
						<li className="nav-item">
							{user ? (
								<a href="#" className="nav-link" onClick={logout}>Выход</a>
							) : (
								<Link href="/auth/login"><a className="nav-link">Вход</a></Link>
							)}
						</li>
					</ul>
				</div>
			</nav>
			<main className="main container">
				{children}
			</main>
			<footer className="footer">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							&copy;Rusich super company 2021
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default MainLayout;