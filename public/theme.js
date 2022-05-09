// YOU CAN CHANGE THE DEFAULT THEME BY CHANGING THE korng
if(!localStorage.theme) localStorage.theme = "korng";
document.getElementById("theme").href = "themes/" + localStorage.theme + ".css";