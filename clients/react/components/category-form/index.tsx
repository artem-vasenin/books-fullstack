import {ChangeEvent, FC, FormEvent} from "react";

import {ICategoryCreate} from '../../types/interfaces';

interface IFormProps {
	onSubmit: (form: ICategoryCreate) => void;
	form: ICategoryCreate;
	setFormField: (key: 'title' | 'description' | 'active', value: string | boolean) => void;
	update: number | null;
}

const CategoryForm: FC<IFormProps> = ({ onSubmit, form, setFormField, update }) => {

	/**
	 * Функция обработки отправки формы
	 * @param e - эвент формы
	 */
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
					placeholder="Заголовок"
					required
					value={form.title}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormField('title', e.target.value)}
				/>
			</div>
			<div className="form-group pb-3">
				<textarea
					className="form-control"
					placeholder="Описание"
					rows={6}
					required
					value={form.description}
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormField('description', e.target.value)}
				/>
			</div>
			<div className="form-check mb-3">
				<input
					className="form-check-input"
					type="checkbox"
					checked={form.active}
					id="defaultCheck1"
					name="active"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormField('active', e.target.checked)}
				/>
				<label className="form-check-label" htmlFor="defaultCheck1">
					Активность категории
				</label>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<button
						type="submit"
						className="btn btn-primary"
						disabled={!form.title || !form.description}
					>{update ? 'Обновить данные' : 'Создать категорию'}</button>
				</div>
			</div>
		</form>
	);
};

export default CategoryForm;