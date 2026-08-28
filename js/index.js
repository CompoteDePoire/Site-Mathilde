const liens = document.querySelectorAll("a");

liens.forEach((lien) => {
    lien.addEventListener("click", (event) => {

        const destination = lien.href;

        if (destination.includes("histoire.html")) {
            event.preventDefault();

            document.body.classList.add("page-transition");

            setTimeout(() => {
                window.location.href = destination;
            }, 500);
        }
    });
});