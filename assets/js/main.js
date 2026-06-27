const toggle = document.querySelector(".toggle");

const menu = document.querySelector(".menu");

const bars = document.querySelectorAll(".toggle span");

const items = document.querySelectorAll("li");

const cursor = document.querySelector(".cursor");

let open = false;

gsap.set(items, {
    opacity: 0,
    y: 80,
});

toggle.addEventListener("click", () => {
    open = !open;

    if (open) {
        gsap.to(menu, {
            clipPath: "circle(150% at 92% 8%)",
            duration: 1.1,
            ease: "power4.inOut",
        });

        gsap.to(".toggle", {
            rotation: 180,
            duration: 0.7,
            ease: "back.out(1.8)",
        });

        gsap.to(items, {
            y: 40,
            opacity: 1,
            duration: 0.5,
            stagger: 0.3,
            ease: "power3.inOut",
        });

        gsap.to(bars[0], {
            y: 12,
            rotation: 45,
            duration: 0.45,
            ease: "power3.out",
        });

        gsap.to(bars[1], {
            opacity: 0,
            scaleX: 0,
            duration: 0.25,
        });

        gsap.to(bars[2], {
            y: -12,
            rotation: -45,
            duration: 0.45,
            ease: "power3.out",
        });
    } else {
        gsap.to(menu, {
            clipPath: "circle(0% at 92% 8%)",
            duration: 1,
            ease: "power4.inOut",
        });

        gsap.to(".toggle", {
            rotation: -180,
            duration: 0.7,
            ease: "back.in(1.8)",
        });

        gsap.set(items, {
            opacity: 0,
            y: 80,
            duration: 0.5,
            stagger: 0.15,
            ease: "power3.in",
        });

        gsap.to(bars[0], {
            y: 0,
            rotation: 0,
            duration: 0.45,
            ease: "power3.out",
        });

        gsap.to(bars[1], {
            opacity: 1,
            scaleX: 1,
            duration: 0.35,
            delay: 0.1,
        });

        gsap.to(bars[2], {
            y: 0,
            rotation: 0,
            duration: 0.45,
            ease: "power3.out",
        });
    }
});

document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,

        y: e.clientY,

        duration: 0.5,

        ease: "power3.out",
    });
});

function scramble(element) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const original = element.dataset.text;

    let iteration = 0;

    const interval = setInterval(() => {
        element.innerText = original

            .split("")

            .map((letter, index) => {
                if (index < iteration) {
                    return original[index];
                }

                return letters[Math.floor(Math.random() * letters.length)];
            })

            .join("");

        iteration += 1 / 3;

        if (iteration >= original.length) {
            clearInterval(interval);

            element.innerText = original;
        }
    }, 30);
}

items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        scramble(item);

        gsap.fromTo(
            item,
            {
                x: -10,
            },
            {
                x: 10,
                repeat: 5,
                yoyo: true,
                duration: 0.03,
            }
        );
    });
});
