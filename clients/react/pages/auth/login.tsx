import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import {useRouter} from "next/router";

import MainLayout from '../../components/layouts/main.layout';
import AuthService from '../../services/auth.service';
import { ILoginForm } from '../../types/interfaces';

const Login = () => {
	const router = useRouter();
	const [form, setForm] = useState<ILoginForm>({email: '', password: ''});
	const [error, setError] = useState('');

	/**
	 * Функция изменяющая значения полей формы
	 * @param key - ключ (name) формы
	 * @param value - значение
	 */
	const setValue = (key: 'email' | 'password', value: string) => {
		setError('');
		setForm((prev: ILoginForm) => ({ ...prev, [key]: value }));
	}

	/**
	 * Функция отправки формы на сервер
	 * @param e - данные формы
	 */
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = await AuthService.login(form);
		if (result.message) {
			console.error(result);
			setError(result.message);
		} else {
			localStorage.setItem('user', JSON.stringify(result));
			setForm({email: '', password: ''});
			await router.push('/');
		}
	}

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user) router.push('/');
	}, [router]);

	return (
		<MainLayout>
			<div className="row align-items-center h-100">
				<div className="col-sm-12">
					<h1 className="mb-5">Войти</h1>

					{error && <div className="alert alert-danger" role="alert">{error}</div>}

					<form onSubmit={onSubmit}>
						<div className="form-group pb-3">
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								name="email"
								required
								value={form.email}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('email', e.target.value)}
							/>
						</div>
						<div className="form-group pb-3">
							<input
								type="password"
								className="form-control"
								placeholder="Пароль"
								name="password"
								required
								value={form.password}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('password', e.target.value)}
							/>
						</div>
						<div className="row">
							<div className="col-sm-6 register-link">
								<Link href="/auth/registration"><a>Зарегистрироваться</a></Link>
							</div>
							<div className="col-sm-6 d-flex justify-content-md-end">
								<button
									type="submit"
									className="btn btn-primary"
									disabled={!form.email || !form.password}
								>Войти</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</MainLayout>
	);
};

export default Login;