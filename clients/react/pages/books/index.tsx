import Link from 'next/link';
import Head from "next/head";
import { FC, useEffect, useState } from "react";

import { BookFormFieldType, IAuthor, IBook, IBookCreate, ICategory, IUser } from "../../types/interfaces";
import MainLayout from "../../components/layouts/main.layout";
import BookForm from "../../components/book-form";
import bookService from "../../services/book.service";
import authorService from '../../services/author.service';
import categoryService from '../../services/category.service';

/** Страница списочной формы с книгами */
const BookList:FC<{books: IBook[], authors: IAuthor[], categories: ICategory[]}> = ({ books, authors, categories }): JSX.Element => {
	const initialForm: IBookCreate = {
		title: '',
		year: '',
		description: '',
		image: '',
		authorId: authors.length ? authors[0].id : 0,
		categoryId: categories.length ? categories[0].id : 0,
	};
	const [user, setUser] = useState<IUser | null>(null);
	const [isEdit, setIsEdit] = useState(false);
	const [error, setError] = useState('');
	const [form, setForm] = useState<IBookCreate>({...initialForm});
	const [booksList, setBooksList] = useState<IBook[]>(books);
	const [authorsList, setAuthorsList] = useState<IAuthor[]>(authors);
	const [categoriesList, setCategoriesList] = useState<ICategory[]>(categories);

	/**
	 * Функция изменяющая значения полей формы
	 * @param key
	 * @param value
	 */
	const setValue = (key: BookFormFieldType, value: string) => {
		setError('');
		setForm((prev: IBookCreate) => ({ ...prev, [key]: value }));
	};

	/** Получение свежих данных о книгах */
	const getBooks = async (): Promise<void> => {
		const result = await bookService.getList();
		setBooksList(result);
	}

	/** Получение свежих данных об авторах */
	const getAuthors = async (): Promise<void> => {
		const result = await authorService.getList();
		setAuthorsList(result);
	}

	/** Получение свежих анных о категориях */
	const getCategories = async (): Promise<void> => {
		const result = await categoryService.getList();
		setCategoriesList(result);
	}

	/**
	 * Функция отправки формы на сервер
	 * @param form - данные формы
	 */
	const onSubmit = async (form: IBookCreate) => {
		if (!user) {
			setError("Доступ запрещён");
			return;
		}
		const result = await bookService.create(user.token, form);
		if (result.message) {
			console.error(result);
			setError(result.message);
		} else {
			console.log('book created');
			setError('');
			setForm({...initialForm});
			setIsEdit(false);
			getBooks();
			getAuthors();
			getCategories();
		}
	};

	/**
	 * Функция для удаления книги из базы
	 * @param id - идентефикатор книги
	 */
	const deleteBook = async (id: number) => {
		if (!user) {
			setError("Доступ запрещён");
			return;
		}
		const result = await bookService.delete(user.token, id);
		if (result.message) {
			console.error(result);
			setError(result.message);
		} else {
			console.log('book deleted');
			setError('');
			getBooks();
			getAuthors();
			getCategories();
		}
	}

	useEffect(() => {
		const userLocal = localStorage.getItem('user');
		if (userLocal) setUser(JSON.parse(userLocal));
		getBooks();
		getAuthors();
		getCategories();
	}, []);

	return (
		<MainLayout>
			<Head>
				<title>Книги | Demo books app</title>
			</Head>
			<div className="row">
				<div className="col-sm-8 mt-3 mb-4">
					<h1>Книги</h1>
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
	          <BookForm
              onSubmit={onSubmit}
              form={form}
              setFormField={setValue}
              authors={authorsList.map((a: IAuthor) => ({
	              firstName: a.firstName,
	              lastName: a.lastName,
	              middleName: a.middleName,
	              id: a.id,
              }))}
              categories={categoriesList.map((c: ICategory) => ({
	              title: c.title,
	              id: c.id,
              }))}
            />
        </div>
      </div>}
			<div className="row">
				<div className="col-sm-12 mb-4">
					<div className="list-group">
						{booksList.length ? booksList.map((book: IBook) => (
							<div className="list-group__item mb-1" key={book.id}>
								<div className="list-group__item-info">
									<Link href={`/books/${book.alias}`} key={book.id}>
										<a className="list-group__link">{book.title}</a>
									</Link>
								</div>
								{user && isEdit && <div className="list-group__item-actions">
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="btn btn-danger btn-sm"
                  >Удалить</button>
                </div>}
							</div>
						)) : (<p>Список книг пуст...</p>)}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export async function getStaticProps() {
	const books: IBook[] = await bookService.getList();
	const authors: IAuthor[] = await authorService.getList();
	const categories: ICategory[] = await categoryService.getList();
	return { props: { books, authors, categories } };
}

export default BookList;