import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {useRouter} from 'next/router';

import MainLayout from '../../components/layouts/main.layout';
import {IRegForm} from '../../types/interfaces';
import AuthService from '../../services/auth.service';

const Registration = () => {
	const router = useRouter();
	const [form, setForm] = useState<IRegForm>({email: '', password: '', nickname: ''});
	const [error, setError] = useState('');

	/**
	 * Функция изменяющая значения полей формы
	 * @param key - ключ (name) формы
	 * @param value - значение
	 */
	const setValue = (key: 'email' | 'password' | 'nickname', value: string) => {
		setError('');
		setForm((prev: IRegForm) => ({ ...prev, [key]: value }));
	};

	/**
	 * Функция отправки формы на сервер
	 * @param e - данные формы
	 */
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = await AuthService.register(form);
		if (result.message) {
			console.error(result);
			setError(result.message);
		} else {
			localStorage.setItem('user', JSON.stringify(result));
			setForm({email: '', password: '', nickname: ''});
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
					<h1 className="mb-5">Зарегистрироваться</h1>

					{error && <div className="alert alert-danger" role="alert">{error}</div>}

					<form onSubmit={onSubmit}>
						<div className="form-group pb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Никнейм"
								required
								value={form.nickname}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('nickname', e.target.value)}
							/>
						</div>
						<div className="form-group pb-3">
							<input
								type="email"
								className="form-control"
								placeholder="Email"
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
								required
								value={form.password}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('password', e.target.value)}
							/>
						</div>
						<div className="row">
							<div className="col-sm-6 register-link">
								<Link href="/auth/login"><a>Войти</a></Link>
							</div>
							<div className="col-sm-6 d-flex justify-content-md-end">
								<button
									type="submit"
									className="btn btn-primary"
									disabled={!form.nickname || !form.email || !form.password}
								>Зарегистрироваться</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</MainLayout>
	);
};

export default Registration;