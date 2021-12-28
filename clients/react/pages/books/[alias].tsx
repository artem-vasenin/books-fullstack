import {FC, useEffect, useState} from "react";
import Head from "next/head";
import Link from "next/link";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";

import {BookFormFieldType, IAuthor, IBook, IBookCreate, ICategory, IUser} from "../../types/interfaces";
import MainLayout from "../../components/layouts/main.layout";
import BookForm from "../../components/book-form";
import bookService from '../../services/book.service';
import authorService from '../../services/author.service';
import categoryService from '../../services/category.service';

/** Страница детальной информации книги полученной по ее алиасу */
const Book: FC<{book: IBook, authors: IAuthor[], categories: ICategory[]}> = ({ book , authors, categories}): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const initialForm: IBookCreate = {
    title: '',
    year: '',
    description: '',
    image: '',
    authorId: 0,
    categoryId: 0,
  };
  const [error, setError] = useState('');
  const [form, setForm] = useState<IBookCreate>({...initialForm});
  const [booksInfo, setBooksInfo] = useState<IBook>(book);
  const [authorsList, setAuthorsList] = useState<IAuthor[]>(authors);
  const [categoriesList, setCategoriesList] = useState<ICategory[]>(categories);

  /**
   * Установка значения поля
   * @param key
   * @param value
   */
  const setValue = (key: BookFormFieldType, value: string) => {
    setError('');
    setForm((prev: IBookCreate) => ({ ...prev, [key]: value }));
  };

  /** Получение свежих данных о книгах */
  const getBook = async (): Promise<void> => {
    const result = await bookService.getByAlias(book.alias);
    setBooksInfo(result);
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
   * Отправка формы на редактирование книги
   * @param form обновленные данные книги
   */
  const onSubmit = async (form: IBookCreate) => {
    if (!user) {
      setError("Доступ запрещён");
      return;
    }
    const result = await bookService.update(user.token, form, booksInfo.id);
    if (result.message) {
      console.error(result);
      setError(result.message);
    } else {
      console.log('book updated');
      setError('');
      setForm({...initialForm});
      setIsEdit(false);
      await router.push(`/books/`);
    }
  };

  /** Прелоадинг данных книги в форму редактирования */
  const handleUpdateBook = () => {
    setForm({
      title: booksInfo.title,
      year: booksInfo.year.toString(),
      description: booksInfo.description,
      image: booksInfo.image,
      authorId: booksInfo.author.id,
      categoryId: booksInfo.category.id,
    });
    setIsEdit(true);
  };

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    if (userLocal) setUser(JSON.parse(userLocal));
    getBook();
    getAuthors();
    getCategories();
  }, []);

    return (
        <MainLayout>
            <Head>
                <title>{booksInfo ? booksInfo.title : 'Книга'} | Demo books app</title>
            </Head>
          <div className="row">
            <div className="col-sm-12 mt-3 mb-4">
              <h1>{booksInfo ? booksInfo.title : 'Книга не найдена'}</h1>
              {user && <button
                className="btn btn-primary"
                onClick={() => isEdit ? setIsEdit(!isEdit) : handleUpdateBook()}
              >{!isEdit ? 'Редактировать книгу' : 'Закрыть'}</button>}
            </div>
          </div>
            <div className="row mb-4">
              {booksInfo && booksInfo.image && !isEdit && <div className="col-sm-3">
                {booksInfo.image && <img
                  alt={booksInfo.title}
                  className="book-img"
                  style={{maxWidth: '100%'}}
                  src={booksInfo.image}
                />}
              </div>}
                <div className={(booksInfo && !booksInfo.image) || isEdit ? 'col-sm-12' : 'col-sm-9'}>
                  {!booksInfo ? (<p>{ booksInfo === null ? 'Загрузка...' : 'Книга не найдена' }</p>)
                    : (
                      isEdit ? (
                        <>
                          {error && <div className="alert alert-danger" role="alert">{error}</div>}
                          <BookForm
                            isUpdate
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
                        </>
                      ) :
                      <>
                        <p>Год: {booksInfo.year}</p>
                        <p>Автор: <Link href={`/authors/${booksInfo.author.id}`}>
                          <a>{booksInfo.author.lastName} {booksInfo.author.firstName} {booksInfo.author.middleName}</a>
                        </Link></p>
                        <p>Категория: <Link href={`/categories/${booksInfo.category.alias}`}>
                          <a>{booksInfo.category.title}</a>
                        </Link></p>
                        {booksInfo.description && <p>Описание: {booksInfo.description}</p>}
                      </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books: IBook[] = await bookService.getList();
  const aliases: string[] = books.map((book: IBook) => `/books/${book.alias}`);
  return {
    paths: aliases,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<IBookProps> = async ({ params }): Promise<any> => {
  if (!params) return { nonFound: true };
  const { alias } = params;
  const book: IBook = await bookService.getByAlias(alias as string);
  const authors: IAuthor[] = await authorService.getList();
  const categories: ICategory[] = await categoryService.getList();
  return { props: { book, authors, categories } };
}

interface IBookProps { book: IBook; }

export default Book;