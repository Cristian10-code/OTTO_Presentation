// Function to go back to intro
function goToIntro() {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    const introVideo = document.getElementById('introVideo');
    const startBtn = document.getElementById('startBtn');
    
    mainContent.style.display = 'none';
    introScreen.style.display = 'flex';
    introScreen.style.opacity = '1';
    
    // Reiniciar y reproducir el video
    if (introVideo) {
        introVideo.currentTime = 0;
        introVideo.play();
    }
    
    // Ocultar botón y mostrarlo después de 3 segundos
    if (startBtn) {
        startBtn.classList.remove('show');
        startBtn.classList.add('hidden');
        setTimeout(() => {
            startBtn.classList.remove('hidden');
            startBtn.classList.add('show');
        }, 3000);
    }
    
    // Reset active timeline item
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
}

// Slide contents
const slideContents = {
    'bep-checker': {
        html: `
            <div class="slide-layout">
                <div class="laptop-container">
                    <div class="laptop">
                        <div class="laptop-screen">
                            <video class="laptop-video" controls>
                                <source src="OTTO_BEP_Revisor.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Revisor BIM</h2>
                    <h3>Verificación Inteligente de Estándares BEP</h3>
                    <p>Solución empresarial que revoluciona el control de calidad en proyectos BIM, automatizando la verificación de cumplimiento del Plan de Ejecución BIM (BEP) en modelos Revit. Elimine errores costosos y acelere sus entregas con verificación instantánea.</p>
                    <ul class="feature-list">
                        <li>🎯 Personalización flexible según sus estándares corporativos</li>
                        <li>📊 Informes ejecutivos detallados y trazables</li>
                        <li>⚡ Integración nativa con Revit - sin interrupciones de flujo</li>
                        <li>💰 Reducción del 90% en tiempo de revisión - ROI inmediato</li>
                    </ul>
                    <div class="action-buttons">
                        <button class="action-btn business-case-btn" onclick="window.open('https://ottoapis.com/producto/revisor-bim', '_blank')">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Precios Aplicación</span>
                        </button>
                        <button class="action-btn business-case-btn" onclick="window.open('BEP_V1.xlsx', '_blank')">
                            <i class="fas fa-file-excel"></i>
                            <span>Verificadores</span>
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    'arch-finishes': {
        html: `
            <div class="slide-layout">
                <div class="laptop-container">
                    <div class="laptop">
                        <div class="laptop-screen">
                            <video class="laptop-video" controls>
                                <source src="OTTO_WallFinishes.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Architectural Finishes</h2>
                    <h3>Automatización Avanzada de Materiales</h3>
                    <p>Sistema empresarial de última generación que transforma la aplicación y gestión de acabados arquitectónicos en modelos BIM. Optimice sus especificaciones de materiales y reduzca drásticamente el tiempo de modelado manual con tecnología de asignación inteligente.</p>
                    <ul class="feature-list">
                        <li>🏢 Aplicación automática basada en espacios y zonas</li>
                        <li>🎨 Asignación masiva de materiales con un clic</li>
                        <li>⏱️ Elimine por completo los procesos manuales repetitivos</li>
                        <li>🔍 Filtros avanzados para muros, pisos y cielos rasos personalizables</li>
                    </ul>
                    <div class="action-buttons">
                        <button class="action-btn business-case-btn" onclick="window.open('https://ottoapis.com/producto/architectural-finishes', '_blank')">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Precios Aplicación</span>
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    'voids': {
        html: `
            <div class="slide-layout">
                <div class="laptop-container">
                    <div class="laptop">
                        <div class="laptop-screen">
                            <video class="laptop-video" controls>
                                <source src="OTTO_FirestopVoids.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Voids</h2>
                    <h3>Prevención Inteligente de Conflictos MEP</h3>
                    <p>Plataforma de coordinación avanzada que automatiza la creación y gestión de vacíos estructurales entre disciplinas. Elimine costosos retrabajos en obra y conflictos de última hora con generación inteligente de penetraciones para instalaciones MEP.</p>
                    <ul class="feature-list">
                        <li>🛡️ Prevención proactiva de conflictos antes de construcción</li>
                        <li>🤖 Generación inteligente de vacíos con reconocimiento automático</li>
                        <li>🔥 Ubicación automatizada de sellos cortafuego según normativa</li>
                        <li>⚙️ Soporte completo: ductos, bandejas, busway y tuberías en muros y losas</li>
                    </ul>
                    <div class="action-buttons">
                        <button class="action-btn business-case-btn" onclick="window.open('https://ottoapis.com/producto/firestop-voids', '_blank')">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Precios Aplicación</span>
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    'excel-integration': {
    html: `
        <div class="slide-layout">
            <div class="laptop-container">
                <div class="laptop">
                    <div class="laptop-screen">
                        <video class="laptop-video" controls>
                            <source src="OTTO_ParameterTools.mp4" type="video/mp4">
                            Your browser does not support the video element.
                        </video>
                    </div>
                </div>
                <div class="laptop-base"></div>
            </div>
            <div class="content-section">
                <h2>Parameter Tool</h2>
                <h3>Gestión Inteligente de Parámetros BIM</h3>
                <p>Herramienta empresarial con interfaz intuitiva que simplifica y automatiza la asignación masiva de parámetros en modelos Revit. Optimice la nomenclatura y trazabilidad de todos sus elementos constructivos con un solo clic.</p>
                <ul class="feature-list">
                    <li>🎯 Asignación de valores únicos a familias de forma masiva</li>
                    <li>🔄 Reemplazo y actualización de valores existentes en lote</li>
                    <li>🔢 Generación automática de consecutivos (numéricos y alfanuméricos)</li>
                    <li>📋 Ejemplos de aplicación:
                        <ul class="no-checks">
                            <li>Pilotes: PIL-001, PIL-002, PIL-003...</li>
                            <li>Puertas: DOOR-101, DOOR-102...</li>
                            <li>Cualquier elemento: prefijo + consecutivo personalizable</li>
                        </ul>
                    </li>
                </ul>
                <div class="action-buttons">
                    <button class="action-btn business-case-btn" onclick="window.open('https://ottoapis.com/producto/parameter-tool', '_blank')">
                        <i class="fas fa-dollar-sign"></i>
                        <span>Precios Aplicación</span>
                    </button>
                </div>
            </div>
        </div>
    `
    },
    'sheet-checker': {
        html: `
            <div class="slide-layout">
                <div class="laptop-container">
                    <div class="laptop">
                        <div class="laptop-screen">
                            <video class="laptop-video" controls>
                                <source src="OTTO_XYZCoordinates.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>XYZ Coordinates</h2>
                    <h3>Geolocalización Automática de Elementos BIM</h3>
                    <p>Herramienta especializada que extrae y asigna automáticamente las coordenadas geográficas (N/S, E/W, Elevación) a todos los elementos de una categoría seleccionada. Optimice la documentación técnica y garantice la trazabilidad espacial de sus componentes constructivos.</p>
                    <ul class="feature-list">
                        <li>📍 Extracción automática de coordenadas N/S, E/W y Elevación</li>
                        <li>📂 Selección flexible por categoría de familia</li>
                        <li>⚡ Asignación masiva a todos los elementos de la categoría</li>
                        <li>🏗️ Casos de uso:
                            <ul class="no-checks">
                                <li>Coordenadas de pilotes para replanteo en obra</li>
                                <li>Ubicación de cajas de inspección sanitaria</li>
                                <li>Georreferenciación de elementos estructurales</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        `
    },
    'bep-revisor-civil': {
        html: `
            <div class="slide-layout">
                <div class="laptop-container">
                    <div class="laptop">
                        <div class="laptop-screen">
                            <video class="laptop-video" controls>
                                <source src="OTTO_BEPRevisorCivil3D.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>BEP Revisor Civil 3D</h2>
                    <h3>Verificación Inteligente de Estándares BEP</h3>
                    <p>Solución empresarial que revoluciona el control de calidad en proyectos BIM, automatizando la verificación de cumplimiento del Plan de Ejecución BIM (BEP) en modelos de Civil 3D. Elimine errores costosos y acelere sus entregas con verificación instantánea.</p>
                    <ul class="feature-list">
                        <li>🎯 Personalización flexible según sus estándares corporativos</li>
                        <li>📊 Informes ejecutivos detallados y trazables</li>
                        <li>⚡ Integración nativa con Civil 3D - sin interrupciones de flujo</li>
                        <li>💰 Reducción del 90% en tiempo de revisión - ROI inmediato</li>
                    </ul>
                    <div class="action-buttons">
                        <button class="action-btn business-case-btn" onclick="window.open('https://ottoapis.com/producto/bep-revisor-civil', '_blank')">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Precios Aplicación</span>
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    'databasesync': {
        html: `
            <div class="slide-layout">
                <div class="laptop-container">
                    <div class="laptop">
                        <div class="laptop-screen">
                            <video class="laptop-video" controls>
                                <source src="OTTO_DataBaseSync.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>DataBaseSync Civil 3D</h2>
                    <h3>Gestión Masiva de Parámetros BIM</h3>
                    <p>Herramienta empresarial que transforma la edición de propiedades en Civil 3D, permitiendo exportar parámetros a Excel para su modificación masiva y posterior reimportación al modelo. Elimine la tediosa edición manual elemento por elemento y acelere la parametrización de sus proyectos.</p>
                    <ul class="feature-list">
                        <li>🔄 Exportación masiva de parámetros a formato Excel editable</li>
                        <li>✏️ Modificación eficiente en hojas de cálculo - sin abrir Civil 3D</li>
                        <li>📥 Reimportación inteligente que actualiza el modelo automáticamente</li>
                        <li>⏱️ Reducción del 95% en tiempo de parametrización - ROI inmediato</li>
                    </ul>
                    <div class="action-buttons">
                        <button class="action-btn business-case-btn" onclick="window.open('https://ottoapis.com/producto/psets-sync-civil', '_blank')">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Precios Aplicación</span>
                        </button>
                    </div>
                </div>
            </div>
        `
    },
    'bep-web': {
        html: `
            <div class="slide-layout">
                <div class="laptop-container">
                    <div class="laptop">
                        <div class="laptop-screen">
                            <video class="laptop-video" controls>
                                <source src="OTTO_AplicacionesFuturas.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Futuras Aplicaciones</h2>
                    <p>Proyectos actualmente en desarrollo para ampliar nuestras soluciones digitales</p>
                    
                    <div class="future-apps-vertical">
                        <div class="future-app-section">
                            <h3>🏗️ Revit - Hangers</h3>
                            <p>Aplicación especializada para la ubicación automática de soportería en proyectos MEP.</p>
                            <ul class="feature-list">
                                <li>📊 Ubicación inteligente de <strong>soportes y colgantes</strong></li>
                                <li>📝 Elevación del LOD de modelos a <strong>LOD 350</strong></li>
                            </ul>
                        </div>                        
                        <div class="future-app-section">
                            <h3>🛣️ Civil 3D</h3>
                            <p>Herramientas de automatización para gestión de información en proyectos de infraestructura.</p>
                            <ul class="feature-list">
                                <li>📊 <strong>Property Data Manager:</strong> Llenado masivo de propiedades mediante Excel</li>
                                <li>📝 <strong>Sheet Verifier:</strong> Automatización de rótulos de planos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'digital-twins': {
        html: `
            <div class="slide-layout">
                <div class="laptop-container">
                    <div class="laptop">
                        <div class="laptop-screen">
                            <video class="laptop-video" controls>
                                <source src="OTTO_GemelosDigitales.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Digital Twins</h2>
                    <h3>Plataforma de Integración IoT</h3>
                    <p>Solución innovadora que integra modelos BIM con sensores IoT para crear gemelos digitales en tiempo real. Transforme la gestión de sus activos con monitoreo inteligente y análisis predictivo para optimizar el rendimiento de sus edificaciones.</p>
                    <ul class="feature-list">
                        <li>📡 Monitoreo en tiempo real de sistemas y equipos</li>
                        <li>🔧 Mantenimiento preventivo basado en datos</li>
                        <li>⚡ Optimización energética y reducción de costos operativos</li>
                        <li>📊 Dashboards interactivos con visualización 3D</li>
                    </ul>
                </div>
            </div>
        `
    },
    'closing': {
        html: `
            <div class="slide-layout full-width">
                <div class="content-section closing-content">
                    <h2>Gracias!</h2>
                    <p>Por su atención e interés en nuestras soluciones digitales</p>
                    <p><a href="https://www.ottoapis.com" target="_blank">www.ottoapis.com</a></p>
                    <div class="contact-info">
                        <p><strong>OTTO Team</strong></p>
                        <p>celular: 3508376096 / 3143839286</p>
                        <p>appsotto00@gmail.com / contacto@ottoapis.com</p>
                    </div>
                    <div class="social-links">
                        <a href="https://www.facebook.com/profile.php?id=61584977904094&locale=es_LA" target="_blank" title="Facebook">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/otto.appis/" target="_blank" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/otto-apis/" target="_blank" title="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        `
    }
};

// Function to start presentation
function startPresentation() {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.style.display = 'flex';
        
        // Activate first item (BEP Checker)
        const firstItem = document.querySelector('[data-slide="bep-checker"]');
        if (firstItem) {
            changeSlide('bep-checker');
        }
    }, 500);
}

// Function to go back to intro
function goToIntro() {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    
    mainContent.style.display = 'none';
    introScreen.style.display = 'flex';
    introScreen.style.opacity = '1';
    
    // Reset active timeline item
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
}

// Function to open Business Case
function openBusinessCase() {
    window.open('Business Case AVT vs API/BC.html', '_blank');
}

// Function to open Workflow in viewer.diagrams.net with embedded content
async function openWorkflow() {
    try {
        // Fetch el archivo HTML local
        const response = await fetch('WorkFlow/Diagram Workflow AVT vs API.drawio.html');
        const htmlText = await response.text();
        
        // Extraer el contenido del data-mxgraph
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const mxgraphDiv = doc.querySelector('.mxgraph');
        
        if (mxgraphDiv) {
            const dataString = mxgraphDiv.getAttribute('data-mxgraph');
            const data = JSON.parse(dataString);
            
            // Abrir en viewer.diagrams.net con el XML embebido
            const encodedXml = encodeURIComponent(data.xml);
            window.open(`https://viewer.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Diagram%20Workflow%20AVT%20vs%20API.drawio#R${encodedXml}`, '_blank');
        } else {
            // Fallback: abrir viewer vacío
            window.open('https://viewer.diagrams.net/', '_blank');
        }
    } catch (error) {
        console.error('Error al cargar el diagrama:', error);
        // Fallback: abrir el HTML local
        window.open('WorkFlow/Diagram Workflow AVT vs API.drawio.html', '_blank');
    }
}

// Function to change slide content
function changeSlide(slideId) {
    const slideContent = document.getElementById('slideContent');
    const content = slideContents[slideId];
    
    if (content) {
        slideContent.style.opacity = '0';
        setTimeout(() => {
            slideContent.innerHTML = content.html;
            // Set video volume to 60%
            const videos = slideContent.querySelectorAll('video');
            videos.forEach(video => video.volume = 0.45);
            slideContent.style.opacity = '1';
        }, 300);
    }
}

// Event listeners for timeline items
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all
            timelineItems.forEach(el => el.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            
            // Change slide content
            const slideId = this.getAttribute('data-slide');
            changeSlide(slideId);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeItem = document.querySelector('.timeline-item.active');
        if (!activeItem) return;
        
        let targetItem = null;
        
        if (e.key === 'ArrowDown') {
            targetItem = activeItem.nextElementSibling;
        } else if (e.key === 'ArrowUp') {
            targetItem = activeItem.previousElementSibling;
        }
        
        if (targetItem && targetItem.classList.contains('timeline-item')) {
            targetItem.click();
        }
    });
    
    // Initialize with first slide
    const firstSlide = document.querySelector('.timeline-item[data-slide="bep-checker"]');
    if (firstSlide) {
        changeSlide('bep-checker');
    }
});

// Mostrar botón después de 3 segundos
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    
    setTimeout(() => {
        if (startBtn) {
            startBtn.classList.remove('hidden');
            startBtn.classList.add('show');
        }
    }, 5500); // 3000ms = 3 segundos
});