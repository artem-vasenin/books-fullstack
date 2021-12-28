/** Интерфейс категории книг */
export interface ICategory {
	id: number;
	title: string;
	alias: string;
	description: string;
	active: boolean;
	books: IBook[];
	message?: string;
}

/** Интерфейс dto создания категории книг */
export interface ICategoryCreate {
	title: string;
	description: string;
	active: boolean;
}

/** Интерфейс полей автора */
export interface IAuthor {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	description: string;
	image: string;
	books: IBook[];
	message?: string;
}

/** Интерфейс dto создания автора книг */
export interface IAuthorCreate {
	firstName: string;
	middleName: string;
	lastName: string;
	description: string;
	image: string;
}

export type AuthorFormFieldsType = 'firstName' | 'middleName' | 'lastName'	| 'description'	| 'image';

/** Интерфейс полей книги */
export interface IBook {
	alias: string;
	description: string;
	id: number;
	image: string;
	title: string;
	year: number;
	author: IAuthor;
	category: ICategory;
	message?: string;
}

/** Интерфейс создания книги */
export interface IBookCreate {
	"title": string;
	"year": string;
	"description": string;
	"image": string;
	"authorId": number;
	"categoryId": number;
}

export type BookFormFieldType = "title" | "year" | "description" | "image" | "authorId" | "categoryId";

/** Интерфейс полей пользователя */
export interface IUser {
	id: number;
	nickname: string;
	email: string;
	password: string;
	role: string;
	blocked: boolean;
	blockReason: string;
	token: string;
	message?: string;
}

/** Интерфейс полей формы входа */
export interface ILoginForm {
	email: string;
	password: string;
}

/** Интерфейс полей формы регистрации */
export interface IRegForm {
	nickname: string;
	email: string;
	password: string;
}