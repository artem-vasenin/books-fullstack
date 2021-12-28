import { FC, useEffect, useState } from "react";
import Link from "next/link";

import { AuthorFormFieldsType, IAuthor, IAuthorCreate, IUser } from "../../types/interfaces";
import MainLayout from "../../components/layouts/main.layout";
import AuthorForm from "../../components/author-form";
import authorService from '../../services/author.service';

/** Страница списка авторов книг */
const Authors:FC<{authors: IAuthor[]}> = ({ authors }) => {
	const initialForm = {
		firstName: '',
		middleName: '',
		lastName: '',
		description: '',
		image: '',
	};
	const [user, setUser] = useState<IUser | null>(null);
	const [isEdit, setIsEdit] = useState(false);
	const [update, setUpdate] = useState<number | null>(null);
	const [error, setError] = useState('');
	const [form, setForm] = useState<IAuthorCreate>({...initialForm});
	const [authorsList, setAuthorsList] = useState< IAuthor[]>(authors);

	/**
	 * Функция изменяющая значения полей формы
	 * @param key - ключ (name) формы
	 * @param value - значение
	 */
	const setValue = (key: AuthorFormFieldsType, value: string) => {
		setError('');
		setForm((prev: IAuthorCreate) => ({ ...prev, [key]: value }));
	};

	/** Получение авторов и запись их в стейт */
	const getAuthors = async (): Promise<void> => {
		const result = await authorService.getList()
		setAuthorsList(result);
	}

	/**
	 * Функция отправки формы на сервер
	 * @param form - данные формы
	 */
	const onSubmit = async (form: IAuthorCreate) => {
		if (!user) {
			setError("Доступ запрещён");
			return;
		}
		const result = update
		? await authorService.update(user.token, form, update)
		: await authorService.create(user.token, form);
		if (result.message) {
			console.error(result);
			setError(result.message);
		} else {
			console.log(update ? 'author updated' : 'author created');
			setError('');
			setForm({...initialForm});
			setIsEdit(false);
			await getAuthors();
		}
	}

	/**
	 * Функция для отправки измененных данных на сервер
	 * @param author - данные изменённого автора
	 */
	const changeAuthor = (author: IAuthor) => {
		const {id, firstName, middleName, lastName, description, image} = author;
		setUpdate(id);
		setForm({ firstName, middleName, lastName, description, image });
	}

	/**
	 * Функция для удаления автора
	 * @param id - id автора
	 */
	const deleteAuthor = async (id: number) => {
		if (!user) {
			setError("Доступ запрещён");
			return;
		}
		const result = await authorService.delete(user.token, id);
		if (result.message) {
			console.error(result);
			setError(result.message);
		} else {
			console.log('author deleted');
			setError('');
			await getAuthors();
		}
	}

	useEffect(() => {
		const userLocal = localStorage.getItem('user');
		if (userLocal) setUser(JSON.parse(userLocal));
		getAuthors();
	}, []);

	return (
		<MainLayout>
			<div className="row">
				<div className="col-sm-8 mt-3 mb-4">
					<h1>Авторы</h1>
				</div>
				{user && (
					<div className="col-sm-4 mt-3 mb-4 d-flex align-self-end justify-content-end">
						<button
							className="btn btn-primary"
							onClick={() => setIsEdit(!isEdit)}
						>{!isEdit ? 'Администрировать' : 'Закрыть'}</button>
					</div>
				)}
			</div>
			{isEdit && <div className="row">
				<div className="col-sm-12 mb-4">
					{error && <div className="alert alert-danger" role="alert">{error}</div>}
					<AuthorForm onSubmit={onSubmit} form={form} setFormField={setValue} update={update} />
				</div>
			</div>}
			<div className="row">
				<div className="col-sm-12 mb-4">
					{authorsList.length ? (
						<div className="list-group">
							{authorsList.map((auth: IAuthor) => (
								<div className="list-group__item mb-1" key={auth.id}>
									<div className="list-group__item-info">
										<Link href={`authors/${auth.id}`}>
											<a className="list-group__link">{auth.lastName} {auth.firstName} {auth.middleName}</a>
										</Link>
									</div>
									{user && isEdit && <div className="list-group__item-actions">
                    <button
                      onClick={() => changeAuthor(auth)}
                      className="btn btn-warning btn-sm mr-2"
                    >Изменить</button>
                    <button
                      onClick={() => deleteAuthor(auth.id)}
                      className="btn btn-danger btn-sm"
                      disabled={!!(auth.books && auth.books.length)}
                    >Удалить</button>
									</div>}
								</div>
							))}
						</div>
					) : <div>Список авторов пуст</div>
					}
				</div>
			</div>
		</MainLayout>
	);
};

export async function getStaticProps() {
	const authors: IAuthor[] = await authorService.getList();
	return {
		props: { authors },
		revalidate: 1,
	};
}

export default Authors;