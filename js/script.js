/* --------------------------  Page Loader ------------------------*/
window.addEventListener("load", () => {
	document.querySelector(".main").classList.remove("hidden");
	document.querySelector(".home-section").classList.add("active");

	document.querySelector(".page-loader").classList.add("fade-out");
	setTimeout(() => {
		document.querySelector(".page-loader").style.display = "none";
	}, 200);
});

window.addEventListener("hashchange", () => {
	let linkItem = document.querySelectorAll(".nav-outer .link-item");
	let currentUrl = new URL(document.URL).hash;
	currentUrl = currentUrl.replace("#", "").toUpperCase();

	linkItem.forEach((link) => {
		if (link.classList.contains("active")) {
			link.classList.remove("active");
		}
		if (link.innerHTML === currentUrl) {
			link.classList.add("active")
		}
	})
})

/*---------------------------- Toggle Navbar ---------------------- */
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
	// hideSection();
	toggleNavbar();
	document.body.classList.toggle("hide-scrolling");
});

function hideSection() {
	document.querySelector("section.active").classList.toggle("fade-out");
}

function toggleNavbar() {
	document.querySelector(".header").classList.toggle("active");
}

/* ------------------------- Active Section ---------------------------- */
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("link-item") && e.target.hash !== "") {
		// activate the overlay to prevent multiple clicks
		document.querySelector(".overlay").classList.add("active");
		navToggler.classList.add("hide");

		if (e.target.classList.contains("nav-item")) {
			toggleNavbar();
		} else {
			hideSection();
			document.body.classList.add("hide-scrolling");
		}

		setTimeout(() => {
			document.querySelector("section.active").classList.remove("active", "fade-out");
			document.querySelector(e.target.hash).classList.add("active");
			window.scrollTo(0, 0);
			document.body.classList.remove("hide-scrolling");
			navToggler.classList.remove("hide");
			document.querySelector(".overlay").classList.remove("active");
		}, 500);
	}
});

/* ------------------- About Tabs -------------------- */
// const tabsContainer = document.querySelector(".about-tabs");
// aboutSection = document.querySelector(".about-section");

// tabsContainer.addEventListener("click", (e) => {
// 	if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
// 		tabsContainer.querySelector(".active").classList.remove("active");
// 		e.target.classList.add("active");
// 		const target = e.target.getAttribute("data-target");
// 		aboutSection.querySelector(".tab-content.active").classList.remove("active");
// 		aboutSection.querySelector(target).classList.add("active");
// 	}
// });

/* ----------------- Portfolio Item Details Popup --------------------*/
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("view-project-btn")) {
		togglePortfolioPopup();
		document.querySelector(".portfolio-popup").scrollTo(0, 0);
		portfolioItemDetails(e.target.parentElement);
	}
});

function togglePortfolioPopup() {
	document.querySelector(".portfolio-popup").classList.toggle("open");
	document.body.classList.toggle("hide-scrolling");
	document.querySelector(".main").classList.toggle("fade-out");
}

document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

// hide popup when clicking outside of it
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("pp-inner")) {
		togglePortfolioPopup();
	}
});

function portfolioItemDetails(portfolioItem) {
	document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;
	document.querySelector(".pp-header h3").innerHTML = portfolioItem.querySelector(".portfolio-item-title").innerHTML;
	document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}


/* ----------------------- Responsive --------------------------------- */
if (window.matchMedia("(max-width: 991px)").matches) {
	if (document.querySelector(".nav-outer").classList.contains("active")) {
		document.querySelector(".nav-outer").classList.remove("active");
		document.querySelector(".nav-outer").classList.add("hide");
	}
}

/* ----------------------- Form Submit ------------------------------- */
document.getElementById("form").addEventListener("submit", function(e) {
	e.preventDefault();
	emailjs.sendForm("service_mp4e61c", "template_e60xggk", e.target, "user_jwooaAYDtk9Qy3gZrG7X4")
			.then((res) => {
				console.log("*Your message is successfully sent");
			})
			.catch((error) => {
				console.log("*Opps, Something went wrong. Check your internet connection.");
			});
	for(let i = 0; i<4; i++) {
		e.target[i].value = "";
	}
})
