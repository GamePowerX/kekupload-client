import App from "./components/App.svelte";

const target = document.getElementById("app");
if (!target) {
	throw new Error("Could not find app root element");
}

const app = new App({
	target
});

export default app;
