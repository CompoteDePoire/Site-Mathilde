const souvenirs = document.querySelectorAll(".souvenir");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

souvenirs.forEach((souvenir) => {
    observer.observe(souvenir);
});

const sections = document.querySelectorAll(".souvenir");
const points = document.querySelectorAll(".fil-conducteur a");

function mettrePointActif() {
    let sectionLaPlusProche = null;
    let distanceLaPlusPetite = Infinity;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const centreSection = rect.top + rect.height / 2;
        const centreEcran = window.innerHeight / 2;

        const distance = Math.abs(centreSection - centreEcran);

        if (distance < distanceLaPlusPetite) {
            distanceLaPlusPetite = distance;
            sectionLaPlusProche = section;
            }
        });

        points.forEach((point) => {
            point.classList.remove("actif");
        });

        if (sectionLaPlusProche) {

        let idSection = sectionLaPlusProche.id;

        if (sectionLaPlusProche.classList.contains("quotidien")) {
            idSection = "quotidien";
        } else if (!idSection) {
         const titre = sectionLaPlusProche.previousElementSibling;

        if (titre && titre.classList.contains("souvenir-titre")) {
            idSection = titre.id;
        }
        }

        const pointActif = document.querySelector(
            `.fil-conducteur a[href="#${idSection}"]`
        );

        if (pointActif) {
        pointActif.classList.add("actif");
        }
    }
}

window.addEventListener("scroll", mettrePointActif);

mettrePointActif();

const boutonLettre = document.querySelector(".bouton-lettre");

if (boutonLettre) {
    boutonLettre.addEventListener("click", (event) => {
        event.preventDefault();

        const destination = boutonLettre.href;

        document.body.classList.add("page-transition");

        setTimeout(() => {
            window.location.href = destination;
        }, 600);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxVideo = document.getElementById("lightbox-video");
    const fermer = document.querySelector(".lightbox-fermer");

    const photos = document.querySelectorAll(".souvenir-media img");

    photos.forEach((photo) => {

        photo.addEventListener("click", () => {

            lightboxImage.src = photo.src;
            lightboxImage.alt = photo.alt;

            lightboxImage.style.display = "block";
            lightboxVideo.style.display = "none";

            lightbox.style.display = "flex";
        });

    });

    fermer.addEventListener("click", () => {

        lightbox.style.display = "none";

        lightboxImage.src = "";
        lightboxVideo.src = "";

    });

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            lightbox.style.display = "none";

            lightboxImage.src = "";
            lightboxVideo.src = "";

        }

    });

    const boutonsVideo = document.querySelectorAll(".video-agrandir");

    boutonsVideo.forEach((bouton) => {

        bouton.addEventListener("click", () => {

            const video = bouton.parentElement.querySelector("iframe");

            lightboxVideo.src = video.src;

            lightboxVideo.style.display = "block";
            lightboxImage.style.display = "none";

            lightbox.style.display = "flex";
        });

    });

});

