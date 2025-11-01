 const hamburger = document.getElementById("hamburger");
        const menu = document.getElementById("mainMenu");
        const header = document.getElementById("header");

  
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            menu.classList.toggle("active");
        });


        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                menu.classList.remove("active");
            });
        });


        document.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener("click", () => {
                hamburger.classList.remove("active");
                menu.classList.remove("active");
            });
        });


        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
        