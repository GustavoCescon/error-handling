const UNKNOWN_ERROR = 1;

const knownErrors = [
	{ exitCode: UNKNOWN_ERROR, event: "uncaughtException" },
	{ exitCode: UNKNOWN_ERROR, event: "unhandledRejection" },
];

const log = (msg) => console.log(`[${process.pid}] - ${msg}`);

process.on("exit", (code) => {
	//fecha a porta de novos requests
	//e aguarda os usuarios conectador encerrarem os requests
	//daria um db.stop, server.close
	log("Server closed with success");
	log("DB closed with success");
	process.exit(code);
});

// biome-ignore lint/complexity/noForEach: <explanation>
knownErrors.forEach(({ exitCode, event }) => {
	process.on(event, (error) => {
		log(`Process exiting due to ${event}`, error.message);
		if (exitCode === UNKNOWN_ERROR) {
			//process.abort();
			process.abort(exitCode);
			return;
		}
		process.exit(exitCode);
	});
});

let counter = 0;
const connectToDb = async () => {
	const random = Math.random();
	if (random < 0.5) return Promise.reject("Could not connect to DB");

	log("DB connected with success");

	if (++counter > 3) process.exit(0);
};

setInterval(() => {
	connectToDb();
}, 200);
