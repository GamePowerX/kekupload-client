export interface Theme {
	name: string;
	file: string;
}

const themes: Theme[] = [
	{ name: "Korng", file: "korng" },
	{ name: "The matrix", file: "matrix" },
	{ name: "Ayu dark", file: "ayu_dark" },
	{ name: "Light", file: "light" },
	{ name: "Darker", file: "darker" },
	{ name: "Beautiful", file: "beautiful" },
	{ name: "Moonlight", file: "moonlight" }
];

export default themes;
