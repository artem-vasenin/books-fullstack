import Head from 'next/head'
import Link from 'next/link'
import {FC} from 'react';

import {IAuthor, ICategory} from '../types/interfaces';
import MainLayout from '../components/layouts/main.layout';
import authorService from "../services/author.service";
import categoryService from "../services/category.service";

/** Главная страница со списком авторов и категорий книг */
const Home:FC<{categories: ICategory[], authors: IAuthor[]}> = ({categories, authors}) => (
  <MainLayout>
    <div>
      <Head>
        <title>Книжная полка</title>
      </Head>
      <div className="row">
        <div className="col-sm-12 mb-4 mt-3">
          <h1>Книжная полка</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 mb-4">
          <h3>Категории</h3>
          {categories.length
            ? (
              <div className="list-group">
                {categories.map((cat: ICategory) => (
                  <Link href={`categories/${cat.alias}`} key={cat.id}>
                    <a className="list-group__link">{cat.title}</a>
                  </Link>
                ))}
              </div>
            ) : <div>Список категорий пуст</div>
          }
        </div>
        <div className="col-sm-12 col-md-6 mb-4">
          <h3>Авторы</h3>
          {authors.length
            ? (
              <div className="list-group">
                {authors.map((auth: IAuthor) => (
                  <Link href={`authors/${auth.id}`} key={auth.id}>
                    <a className="list-group__link">{auth.firstName} {auth.lastName}</a>
                  </Link>
                ))}
              </div>
            ) : <div>Список авторов пуст</div>
          }
        </div>
      </div>
    </div>
  </MainLayout>
);

export async function getStaticProps() {
  const categories: ICategory[] = await categoryService.getList();
  const authors: IAuthor[] = await authorService.getList();
  return { props: { categories, authors } };
}

export default Home;
