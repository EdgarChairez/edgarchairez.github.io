document.addEventListener('DOMContentLoaded', () => {
    // 1. Definición de variables de elementos del DOM
    const trigger = document.getElementById('contact-trigger');
    const popover = document.getElementById('contact-popover');
    const btnEmail = document.getElementById("email-btn");
    let timeout;

    // 2. Lógica del Popover (WhatsApp)
    if (trigger && popover) {
        trigger.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            popover.showPopover();
        });

        trigger.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                popover.hidePopover();
            }, 100);
        });

        popover.addEventListener('mouseenter', () => clearTimeout(timeout));
        popover.addEventListener('mouseleave', () => popover.hidePopover());
    }

    // 3. Cerrar popover al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (popover && !popover.contains(e.target) && !trigger.contains(e.target)) {
            popover.hidePopover();
        }
    });

    // Nota: Las funciones que llamas desde el HTML con 'onclick' 
    // (como irASeccion o copyEmail) deben estar FUERA del DOMContentLoaded
    // para que el HTML pueda "verlas" globalmente.

    // --- LÓGICA DE FADE-IN AL SCROLL ---
    const observerOptions = {
        root: null, // usa el viewport del navegador
        threshold: 0.1 // se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Una vez que aparece, dejamos de observarlo para ahorrar recursos
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos con la clase fade-in-section
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));
});

// FUNCIONES GLOBALES (Accesibles desde el HTML)
function irASeccion(idSeccion) {
    const destino = document.getElementById(idSeccion);
    if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
    }
}

function copyEmail() {
    const email = "chairezandres0@gmail.com";
    const toast = document.getElementById("copy-toast");
    const btn = document.getElementById("email-btn");

    navigator.clipboard.writeText(email).then(() => {
        toast.classList.add("show");
        const originalText = btn.innerText;
        btn.innerText = "¡Copiado!";

        setTimeout(() => {
            toast.classList.remove("show");
            btn.innerText = originalText;
        }, 2000);
    });
}