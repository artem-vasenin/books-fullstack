import {ChangeEvent, FC, FormEvent} from "react";

import {AuthorFormFieldsType, IAuthorCreate} from '../../types/interfaces';

interface IFormProps {
	onSubmit: (form: IAuthorCreate) => void;
	form: IAuthorCreate;
	setFormField: (key: AuthorFormFieldsType, value: string) => void;
	update: number | null;
}

const AuthorForm: FC<IFormProps> = ({ onSubmit, form, setFormField, update }) => {

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(form);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group pb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Фамилия"
					required
					value={form.lastName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormField('lastName', e.target.value)}
				/>
			</div>
			<div className="form-group pb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Имя"
					required
					value={form.firstName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormField('firstName', e.target.value)}
				/>
			</div>
			<div className="form-group pb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Отчество"
					required
					value={form.middleName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormField('middleName', e.target.value)}
				/>
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
						disabled={!form.firstName || !form.lastName || !form.middleName}
					>{update ? 'Изменить данные' : 'Добавить автора'}</button>
				</div>
			</div>
		</form>
	);
};

export default AuthorForm;