import React from "react";

const SalesforceLead = ({ module }) => {



	// replace salesforceLead with the property name you set your custom field to
	const { fields: { sFForm: salesforceLead = undefined } } = module;
	if (!salesforceLead) return null;

	const { leadOID, actionURL, formData, retURL, submitText } = JSON.parse(salesforceLead);

	return (
		<div className="relative px-8">
			<div className="max-w-xl mx-auto my-12 md:mt-18 lg:mt-20">
				<h1>{module.fields.title}</h1>
				<form action={actionURL} method="POST">
					<HiddenText name="oid" value={leadOID} />
					<HiddenText name="retURL" value={retURL} />
					{formData.map((field, index) => (
						renderFields(field, index)
					))}
					{/* // set default button to submit */}
					{formData.length &&
						<div className="mt-3 flex justify-end">
							<input type="submit"
								value={submitText ? submitText : "Submit"}
								className="py-2 px-3 rounded-md text-white focus:ring-gray-700 focus:ring outline-none bg-blue-400 hover:bg-blue-500" />
						</div>}

				</form>
			</div>
		</div>
	);
};



const InputText = ({ id, name, metaData }) => {
	return (
		<div className="grid grid-cols-2 gap-3 mt-3">
			<label htmlFor={id}>
				{name}
			</label>
			<input id={id} maxLength={metaData.maxlength} name={id} type={metaData.type} />
		</div>
	)
}

const Select = ({ id, name, metaData }) => {
	return (
		<div className="grid grid-cols-2 gap-3 mt-3">
			<label htmlFor={id}>{name}</label>
			<select id={id} name={id}>
				<option value="">--None--</option>_
				{metaData.options.map((option) => (
					<option value={option}>{option}</option>
				))}
			</select>
		</div>
	)
}

const Textarea = ({ id, name, metaData }) => {
	return (
		<div className="grid grid-cols-2 gap-3 mt-3">
			<label htmlFor={id}>{name}</label>
			<textarea name={id}></textarea>
		</div>
	)
}

const Checkbox = ({ id, name, metaData }) => {
	return (
		<div className="checkbox-field">
			<label for={id}>{name}</label>
			<input id={id} name={id} type={metaData.type} value={metaData.value} />
		</div>
	)
}

const HiddenText = ({ name, value }) => {
	return (
		<input type="hidden" name={name} value={value} />
	)
}

const renderFields = (param, index) => {
	if (!param.isSelected) return null;
	switch (param.metaData.type) {
		case 'text':
			return <InputText {...param} key={index} />;
		case 'textarea':
			return <Textarea {...param} key={index} />;
		case 'select':
			return <Select {...param} key={index} />;
		case 'checkbox':
			return <Checkbox {...param} key={index} />;
		default:
			return null;
	}
}

export default SalesforceLead;