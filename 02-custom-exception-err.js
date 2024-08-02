class InvalidFormatError extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidFormatError";
	}
}
class InvalidLengthError extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidLengthError";
	}
}

function validationCpf(cpf) {
	// biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
	if (isNaN(cpf)) {
		throw new InvalidFormatError("CPF must be a number");
	}

	if (cpf.length !== 11) {
		throw new InvalidLengthError("CPF must have 11 digits");
	}
}

for (const cpf of ["123", "abc", "12345678901"]) {
	try {
		validationCpf(cpf);
		console.log("CPF is valid");
	} catch (error) {
		if (
			error instanceof InvalidFormatError ||
			error instanceof InvalidLengthError
		) {
			console.log(error.message);
			continue;
		}
		console.log("Error:", error.message);
	}
}
