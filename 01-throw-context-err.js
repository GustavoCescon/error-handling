import fs from "node:fs";

try {
	fs.readFile("not-found.txt", (err, result) => {
		if (err) {
			throw new Error("File not found");
		}
	});
} catch (error) {
	s;
	console.log("Nunca é chamado", error);
}
