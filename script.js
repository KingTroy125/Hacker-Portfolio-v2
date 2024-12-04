document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const panelContents = document.querySelectorAll('.panel-content');

    function setActivePanel(panelId) {
        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.panel === panelId);
        });

        panelContents.forEach(panel => {
            panel.classList.toggle('active', panel.id === panelId);
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panelId = this.dataset.panel;
            setActivePanel(panelId);
        });
    });

    // Set initial active panel
    setActivePanel('about');

    // Add typing animation to panel content
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing animation when switching panels
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const panel = mutation.target;
                if (panel.classList.contains('active')) {
                    const content = panel.innerHTML;
                    typeWriter(panel, content);
                }
            }
        });
    });

    panelContents.forEach(panel => {
        observer.observe(panel, { attributes: true });
    });
});