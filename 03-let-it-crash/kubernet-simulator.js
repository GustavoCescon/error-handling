import { spawn } from "node:child_process";
const INSTANCES = 3;

const prepareLog = (pid) => (msg) => console.log(`[${pid}] - ${msg}`);

function spinUpInstance() {
	const cp = spawn("node", ["server-let-it-crash.js"]);
	const log = prepareLog(cp.pid);
	log("Instance created...");
	//cp.stdout.on("data", (msg) => console.log(msg.toString().trim()));
	cp.on("exit", (code) => {
		//0 significa que terminou com sucesso
		//1 siginifca que terminou com error
		log(`Exited with code ${code}`);
		if (code === 0) {
			return;
		}
		spinUpInstance();
	});
}

for (let i = 0; i < INSTANCES; i++) {
	spinUpInstance();
}
