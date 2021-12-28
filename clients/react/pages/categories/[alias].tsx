import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import { FC, useEffect, useState } from "react";
import {ParsedUrlQuery} from "querystring";
import Head from "next/head";
import Link from "next/link";

import { IBook, ICategory } from "../../types/interfaces";
import MainLayout from "../../components/layouts/main.layout";
import categoryService from '../../services/category.service';

/** Страница списка книг полученных по алиасу категории */
const Book:FC<{category: ICategory}> = ({ category }): JSX.Element => {
  const [categoryItem, setCategoryItem] = useState<ICategory>(category);

  /** Получение свежих данных категнории по ее алиасу */
  const getCategory = async (): Promise<void> => {
    const result = await categoryService.getByAlias(category.alias);
    setCategoryItem(result);
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>{categoryItem ? categoryItem.title : "Категория не найдена"} | Demo books app</title>
      </Head>
      <div className="row">
        <div className="col-sm-12">
          {categoryItem
            ? <>
              <h1>{categoryItem.title}</h1>
              {categoryItem.description && <div className="mb-4">{categoryItem.description}</div>}
              <div className="list-group">
                {categoryItem.books && categoryItem.books.length ? categoryItem.books.map((book: IBook) => (
                  <Link href={`/books/${book.alias}`} key={book.id}>
                    <a className="list-group__link">{book.title}</a>
                  </Link>
                )) : (<p>Список книг пуст...</p>)
                }
              </div>
            </>
            : <p>{categoryItem === null ? "Загрузка..." : "Категория не найдена"}</p>}
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: ICategory[] = await categoryService.getList();
  const aliases: string[] = categories.map((cat: ICategory) => `/categories/${cat.alias}`);
  return {
    paths: aliases,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ICategoryProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) return { notFound: true };
    const { alias } = params;
    const category: ICategory = await categoryService.getByAlias(alias as string);
    return { props: { category } };
}

interface ICategoryProps { category: ICategory; }

export default Book;