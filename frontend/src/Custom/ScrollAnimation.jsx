import { useEffect } from "react";

const ScrollAnimation = () => {
    useEffect(() => {
        const elements = document.querySelectorAll(".left-up, .right-up, .bottom-up, .zoom-up");

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains("left-up")) {
                        entry.target.classList.add("animate-left");
                    } else if (entry.target.classList.contains("right-up")) {
                        entry.target.classList.add("animate-right");
                    } else if (entry.target.classList.contains("bottom-up")) {
                        entry.target.classList.add("animate-bottom");
                    } else if (entry.target.classList.contains("zoom-up")) {
                        entry.target.classList.add("animate-zoom");
                    }

                    observer.unobserve(entry.target); // Stops observing after animation runs
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    return null;
};

export default ScrollAnimation;
