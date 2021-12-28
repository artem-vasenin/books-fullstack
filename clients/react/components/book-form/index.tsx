import {ChangeEvent, FC, FormEvent} from "react";

import { BookFormFieldType, IBookCreate } from '../../types/interfaces';

interface IFormAuthor {
	firstName: string;
	lastName: string;
	middleName: string;
	id: number;
}

interface IFormCategory {
	title: string;
	id: number;
}

interface IFormProps {
	onSubmit: (form: IBookCreate) => void;
	form: IBookCreate;
	setFormField: (key: BookFormFieldType, value: string) => void;
	authors: IFormAuthor[];
	categories: IFormCategory[];
	isUpdate?: boolean;
}

const BookForm: FC<IFormProps> = ({ onSubmit, form, setFormField , authors, categories, isUpdate}) => {

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(form);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group pb-3">
				<div className="row">
					<div className="col-sm-12 col-md-9">
						<input
							type="text"
							className="form-control"
							placeholder="Заголовок"
							required
							value={form.title}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setFormField('title', e.target.value)}
						/>
					</div>
					<div className="col-sm-12 col-md-3">
						<input
							type="text"
							className="form-control"
							placeholder="Год"
							required
							value={form.year}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setFormField('year', e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className="form-group pb-3">
				<textarea
					className="form-control"
					placeholder="Описание"
					rows={6}
					value={form.description}
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormField('description', e.target.value)}
				/>
			</div>
			<div className="form-group pb-3">
				<label htmlFor="author">Автор</label>
				<select
					className="form-control"
					id="author"
					value={form.authorId}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormField('authorId', e.target.value)}
				>
					{authors && authors.length && authors.map((a: IFormAuthor) => (
						<option value={a.id} key={a.id}>{a.lastName} {a.firstName} {a.middleName}</option>
					))}
				</select>
			</div>
			<div className="form-group pb-3">
				<label htmlFor="category">Категория</label>
				<select
					className="form-control"
					id="category"
					value={form.categoryId}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormField('categoryId', e.target.value)}
				>
					{categories && categories.length && categories.map((c: IFormCategory) => (
						<option value={c.id} key={c.id}>{c.title}</option>
					))}
				</select>
			</div>
			<div className="form-group pb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Ссылка на фото"
					value={form.image}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormField('image', e.target.value)}
				/>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<button
						type="submit"
						className="btn btn-primary"
						disabled={
							!form.title || (!form.year || +form.year > 2022 || +form.year < 1000)
							|| !form.description || !form.image || !form.authorId || !form.categoryId
						}
					>{isUpdate ? 'Обновить данные' : 'Добавить книгу'}</button>
				</div>
			</div>
		</form>
	);
};

export default BookForm;