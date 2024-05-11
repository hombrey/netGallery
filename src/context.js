window.addEventListener("contextmenu", customContextMenu);
window.addEventListener("click", respondToClick);
const contextElement = document.getElementById("context-menu");

function customContextMenu(event) {
	event.preventDefault();

	contextElement.style.top = event.offsetY + "px";
	contextElement.style.left = event.offsetX + "px";
	// contextElement.classList.add("active");
	contextElement.setAttribute("class","active")
	console.log("show context menu")
} // function customContextMenu

function respondToClick() {
	contextElement.setAttribute("class","inactive")
} // function respondToClick()
