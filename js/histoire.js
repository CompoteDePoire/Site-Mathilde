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
        const pointActif = document.querySelector(
            `.fil-conducteur a[href="#${sectionLaPlusProche.id}"]`
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