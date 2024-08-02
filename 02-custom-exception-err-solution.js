function validationCpf(cpf) {
	const errors = [];
	// biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
	if (isNaN(cpf)) {
		errors.push({
			message: "CPF must be a number",
			name: "InvalidFormatError",
		});
	}

	if (cpf.length !== 11) {
		errors.push({
			message: "CPF must have 11 digits",
			name: "InvalidLengthError",
		});
	}

	return {
		valid: !errors.length,
		errors,
	};
}

for (const cpf of ["123", "abc", "12345678901"]) {
	const { valid, errors } = validationCpf(cpf);

	if (valid) {
		console.log("CPF is valid");
		continue;
	}

	// biome-ignore lint/complexity/noForEach: <explanation>
	errors.forEach(({ message, name }) => {
		console.log(`${name} - ${message}`);
	});
}
