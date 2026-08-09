document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA DE POPOVERS EN HOVER (WhatsApp y Email) ---
    function setupPopoverHover(triggerId, popoverId) {
        const trigger = document.getElementById(triggerId);
        const popover = document.getElementById(popoverId);
        let timeout;

        if (trigger && popover) {
            // Abrir al entrar al botón (solo si no está abierto)
            trigger.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
                try {
                    if (!popover.matches(':popover-open')) {
                        popover.showPopover();
                    }
                } catch (e) {
                    /* Evita error de estado */
                }
            });

            // Ocultar con pequeño delay al salir
            trigger.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    try {
                        if (popover.matches(':popover-open')) {
                            popover.hidePopover();
                        }
                    } catch (e) {
                        /* Evita error de estado */
                    }
                }, 150);
            });

            // Mantener abierto si el cursor entra al popup
            popover.addEventListener('mouseenter', () => clearTimeout(timeout));

            popover.addEventListener('mouseleave', () => {
                try {
                    if (popover.matches(':popover-open')) {
                        popover.hidePopover();
                    }
                } catch (e) {
                    /* Evita error de estado */
                }
            });
        }
    }

    // Inicializar hover en ambos botones
    setupPopoverHover('contact-trigger', 'contact-popover');
    setupPopoverHover('email-trigger', 'email-popover');


    // --- 2. CERRAR POPOVERS AL HACER CLIC FUERA ---
    document.addEventListener('click', (e) => {
        const emailPopover = document.getElementById('email-popover');
        const emailTrigger = document.getElementById('email-trigger');
        const contactPopover = document.getElementById('contact-popover');
        const contactTrigger = document.getElementById('contact-trigger');

        if (emailPopover && emailPopover.matches(':popover-open') && !emailPopover.contains(e.target) && !emailTrigger.contains(e.target)) {
            emailPopover.hidePopover();
        }
        if (contactPopover && contactPopover.matches(':popover-open') && !contactPopover.contains(e.target) && !contactTrigger.contains(e.target)) {
            contactPopover.hidePopover();
        }
    });


    // --- 3. FUNCIONALIDAD COPIAR EMAIL ---
    const btnCopyEmail = document.getElementById('btn-copy-email');
    const emailText = document.getElementById('email-text');
    const copyText = document.getElementById('copy-text');

    if (btnCopyEmail && emailText && copyText) {
        btnCopyEmail.addEventListener('click', () => {
            const email = emailText.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                copyText.textContent = '¡COPIADO!';
                btnCopyEmail.style.backgroundColor = '#198754';

                setTimeout(() => {
                    copyText.textContent = 'COPIAR';
                    btnCopyEmail.style.backgroundColor = '#000000';
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        });
    }


    // --- 4. INTERSECTION OBSERVER (Fade-In al Scroll) ---
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));


    // --- 5. DESPLEGAR EXPERIENCIA ADICIONAL ---
    const toggleBtn = document.getElementById('btn-toggle-exp');
    const extraExp = document.getElementById('extra-experience');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    if (toggleBtn && extraExp) {
        toggleBtn.addEventListener('click', () => {
            extraExp.classList.toggle('show-extra');
            const isOpen = extraExp.classList.contains('show-extra');

            if (btnText) {
                btnText.textContent = isOpen ? 'Ver menos experiencia' : 'Ver más experiencia';
            }

            if (btnIcon) {
                btnIcon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
                btnIcon.style.transition = 'transform 0.3s ease';
            }

            if (isOpen) {
                setTimeout(() => {
                    extraExp.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 150);
            }
        });
    }
});


// --- FUNCIONES GLOBALES (Llamadas directamente desde HTML) ---
function irASeccion(idSeccion) {
    const destino = document.getElementById(idSeccion);
    if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
    }
};