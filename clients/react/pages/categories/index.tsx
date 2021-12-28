import Head from "next/head";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

import MainLayout from "../../components/layouts/main.layout";
import { ICategory, ICategoryCreate, IUser } from "../../types/interfaces";
import CategoryForm from "../../components/category-form";
import categoryService from '../../services/category.service';

/** Страница списка категорий книг */
const Categories:FC<{categories: ICategory[]}> = ({ categories }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isEdit, setIsEdit] = useState(false);
	const [update, setUpdate] = useState<number | null>(null);
	const [form, setForm] = useState<ICategoryCreate>({title: '', description: '', active: false});
	const [error, setError] = useState('');
	const [categoriesList, setCategoriesList] = useState< ICategory[]>(categories);

	/**
	 * Функция изменяющая значения полей формы
	 * @param key - ключ (name) формы
	 * @param value - значение
	 */
	const setValue = (key: 'title' | 'description' | 'active', value: string | boolean) => {
		setError('');
		setForm((prev: ICategoryCreate) => ({ ...prev, [key]: value }));
	};

	/** Получение свежего списка всех категорий */
	const getCategories = async (): Promise<void> => {
		const result = await categoryService.getList();
		setCategoriesList(result);
	}

	/**
	 * Функция отправки формы на сервер
	 * @param form - данные формы
	 */
	const onSubmit = async (form: ICategoryCreate) => {
		if (!user) {
			setError("Доступ запрещён");
			return;
		}
		const result = update
			? await categoryService.update(user.token, form, update)
			: await categoryService.create(user.token, form);
		if (result.message) {
			console.error(result);
			setError(result.message);
		} else {
			console.log(update ? 'category updated' : 'category created');
			setError('');
			setForm({title: '', description: '', active: false});
			setIsEdit(false);
			await getCategories();
		}
	}

	/**
	 * Функция для отправки измененных данных на сервер
	 * @param cat - данные изменённой категории
	 */
	const changeCat = (cat: ICategory) => {
		const {id, title, description, active} = cat;
		setUpdate(id);
		setForm({ title, description, active });
	}

	/**
	 * Функция для удаления категории
	 * @param id - id категории
	 */
	const deleteCat = async (id: number) => {
		if (!user) {
			setError("Доступ запрещён");
			return;
		}
		const result = await categoryService.delete(user.token, id);
		if (result.message) {
			console.error(result);
			setError(result.message);
		} else {
			console.log('category deleted');
			setError('');
			await getCategories();
		}
	}

	useEffect(() => {
		const userLocal = localStorage.getItem('user');
		if (userLocal) setUser(JSON.parse(userLocal));
		getCategories();
	}, []);

	return (
		<MainLayout>
			<Head>
				<title>Категории книг | Книжная полка</title>
			</Head>
			<div className="row align-items-center">
				<div className="col-sm-8 mt-3 mb-4">
					<h1>Категории книг</h1>
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
			{isEdit ? <div className="row">
				<div className="col-sm-12 mb-4">
					{error && <div className="alert alert-danger" role="alert">{error}</div>}
					<CategoryForm
						onSubmit={onSubmit}
						form={form}
						setFormField={setValue}
						update={update}
					/>
				</div>
			</div> : null}
			<div className="row">
				<div className="col-sm-12">
					{categoriesList.length
						? (
							<div className="list-group">
								{categoriesList.map((cat: ICategory) => (
									<div className="list-group__item mb-1" key={cat.id}>
										<div className="list-group__item-info">
											<Link href={`categories/${cat.alias}`}>
												<a className="list-group__link">{cat.title}</a>
											</Link>
										</div>
										{user && isEdit && <div className="list-group__item-actions">
                        <button
                            onClick={() => changeCat(cat)}
                            className="btn btn-warning btn-sm mr-2"
                        >Изменить</button>
                        <button
                            onClick={() => deleteCat(cat.id)}
                            className="btn btn-danger btn-sm"
                            disabled={!!(cat.books && cat.books.length)}
                        >Удалить</button>
                    </div>}
									</div>
								))}
							</div>
						) : <div>Список категорий пуст</div>
					}
				</div>
			</div>
		</MainLayout>
	);
};

export async function getStaticProps() {
	const categories: ICategory[] = await categoryService.getList();
	return { props: { categories } };
}

export default Categories;