import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

import { IAuthor, IBook } from "../../types/interfaces";
import MainLayout from "../../components/layouts/main.layout";
import authorService from "../../services/author.service";

/** Страница детальной информации по автору */
const Author: FC<{ author: IAuthor }> = ({ author }) => {
  const [authorItem, setAuthorItem] = useState<IAuthor>(author);

  /** Получение свежих данных автора по его id */
  const getAuthor = async (): Promise<void> => {
    const result = await authorService.getById(author.id.toString());
    setAuthorItem(result);
  };

  useEffect(() => {
    getAuthor();
  }, []);

  if (!author && !authorItem) return null;

  return (
    <MainLayout>
      <div className="row">
        <div className="col-sm-12">
          <h1>{authorItem ? `${authorItem.lastName} ${authorItem.firstName} ${authorItem.middleName}` : "Автор не найден"}</h1>
        </div>
        {authorItem.image ? (
          <>
            <div className="col-sm-4">
              <div className="image-wrapper">
                <img src={authorItem.image} alt="Author photo" />
              </div>
            </div>
            <div className="col-sm-8">
              <div>{authorItem.description}</div>
            </div>
          </>
        ) : (
          <div className="col-sm-12">
            <div>{authorItem.description}</div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-sm-12 mt-4">
          <div className="list-group">
            {authorItem.books.length ? authorItem.books.map((book: IBook) => (
              <Link href={`/books/${book.alias}`} key={book.id}>
                <a className="list-group__link">{book.title}</a>
              </Link>
            )) : (<p>Список книг пуст...</p>)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const authors: IAuthor[] = await authorService.getList();
  const ids: string[] = authors.map((auth: IAuthor) => `/authors/${auth.id}`);
  return {
    paths: ids,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<IAuthorProps> = async ({ params }) => {
  if (!params) return { notFound: true };
  const { id } = params;
  const author: IAuthor = await authorService.getById(id as string);
  return {
    props: { author },
    revalidate: 1
  };
};

interface IAuthorProps {
  author: IAuthor;
}

export default Author;