/**
 * LÓGICA DE ESTADO, ACESSIBILIDADE E COMPONENTES RENDERIZADOS VIA ARRAY
 * PROJETO: AGRO FORTE
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DE ACESSIBILIDADE DE FONTE E CONTRASTE
       ========================================================================== */
    let currentFontSize = 16;
    const rootElement = document.documentElement;
    const bodyElement = document.body;

    const btnFontInc = document.getElementById('btn-font-inc');
    const btnFontDec = document.getElementById('btn-font-dec');
    const btnContrast = document.getElementById('btn-contrast');

    btnFontInc.addEventListener('click', () => {
        if (currentFontSize < 24) {
            currentFontSize += 1;
            rootElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });

    btnFontDec.addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 1;
            rootElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });

    btnContrast.addEventListener('click', () => {
        bodyElement.classList.toggle('high-contrast');
    });

    /* ==========================================================================
       2. CARROSSEL DE SUSTENTABILIDADE (RENDERIZADO VIA ARRAY DE OBJETOS)
       ========================================================================== */
    const esgData = [
        {
            titulo: "Preservação Ativa",
            descricao: "Mantemos mais de 35% de áreas nativas intactas em todas as propriedades parceiras, superando as exigências globais."
        },
        {
            titulo: "Manejo Hídrico Inteligente",
            descricao: "Sistemas automatizados gotejadores reduzem em até 40% a captação de água, preservando aquíferos regionais."
        },
        {
            titulo: "Créditos de Carbono",
            descricao: "Neutralização certificada por auditorias internacionais independentes através do plantio contínuo e fixação direta no solo."
        }
    ];

    const carouselContainer = document.getElementById('carousel-container');
    let currentSlide = 0;

    function renderCarousel() {
        carouselContainer.innerHTML = `
            <div class="carousel-slide">
                <h4>${esgData[currentSlide].titulo}</h4>
                <p>"${esgData[currentSlide].descricao}"</p>
            </div>
            <button class="carousel-nav-btn carousel-prev" aria-label="Slide Anterior">‹</button>
            <button class="carousel-nav-btn carousel-next" aria-label="Próximo Slide">›</button>
        `;

        // Atribuição de eventos aos novos elementos gerados
        carouselContainer.querySelector('.carousel-prev').addEventListener('click', prevSlide);
        carouselContainer.querySelector('.carousel-next').addEventListener('click', nextSlide);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % esgData.length;
        renderCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + esgData.length) % esgData.length;
        renderCarousel();
    }

    // Inicializa componente
    if (carouselContainer) {
        renderCarousel();
    }

    /* ==========================================================================
       3. ACORDEÃO DO FAQ (RENDERIZADO VIA ARRAY DE OBJETOS)
       ========================================================================== */
    const faqData = [
        {
            pergunta: "Como o Agro Forte monitora a pegada de carbono?",
            resposta: "Utilizamos sensores de solo acoplados a algoritmos que medem o sequestro de carbono orgânico e controlamos rigidamente as emissões diretas do maquinário automatizado de frota."
        },
        {
            pergunta: "Quais tecnologias de precisão são aplicadas na colheita?",
            resposta: "Utilizamos telemetria avançada que mapeia a variabilidade espacial da lavoura, aplicando insumos exatamente onde há necessidade identificada por imagens multiespectrais."
        },
        {
            pergunta: "Como as diretrizes do Código Florestal são asseguradas?",
            resposta: "Toda a nossa malha produtiva está devidamente cadastrada no CAR (Cadastro Ambiental Rural) e passa por varreduras semanais de satélite para impedir qualquer forma de desmatamento ilegal."
        }
    ];

    const accordionContainer = document.getElementById('faq-accordion');

    function renderAccordion() {
        if (!accordionContainer) return;
        
        faqData.forEach((item, index) => {
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');
            
            accordionItem.innerHTML = `
                <button class="accordion-header" aria-expanded="false">${item.pergunta}</button>
                <div class="accordion-content">
                    <p>${item.resposta}</p>
                </div>
            `;
            
            accordionContainer.appendChild(accordionItem);
        });

        // Eventos de clique para gerenciar o estado expansível
        const headers = accordionContainer.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const content = this.nextElementSibling;
                const isActive = item.classList.contains('active');

                // Fecha todos os itens abertos antes
                accordionContainer.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                    i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                });

                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // Inicializa componente
    renderAccordion();
});