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
                            <video class="laptop-video" controls muted>
                                <source src="OTTO_BEP_Revisor.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>BEP Revisor</h2>
                    <h3>Automated Compliance Verification</h3>
                    <p>Tool that automates the verification of BEP (BIM Execution Plan) requirements compliance in Revit models.</p>
                    <ul class="feature-list">
                        <li>Easy BEP customization</li>
                        <li>Detailed report generation</li>
                        <li>Direct Revit integration</li>
                        <li>90% reduction in review time</li>
                    </ul>
                    <div class="action-buttons">
                        <button class="action-btn business-case-btn" onclick="openBusinessCase()">
                            <i class="fas fa-chart-line"></i>
                            <span>View Business Case</span>
                        </button>
                        <button class="action-btn workflow-btn" onclick="openWorkflow()">
                            <i class="fas fa-project-diagram"></i>
                            <span>View Workflow</span>
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
                            <video class="laptop-video" controls muted>
                                <source src="ACM_EC_ArchFinish.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Architectural Finishes</h2>
                    <h3>Smart Material Application</h3>
                    <p>Automated system for applying and managing architectural finishes in BIM models.</p>
                    <ul class="feature-list">
                        <li>Room-based automatic application</li>
                        <li>Easy material assigment</li>
                        <li>Avoid manual process</li>
                        <li>Multiple filters for rooms and wall finishes</li>
                    </ul>
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
                            <video class="laptop-video" controls muted>
                                <source src="OTTO_FirestopVoids.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Voids Automation</h2>
                    <h3>Multi-Discipline Coordination</h3>
                    <p>Automation of void creation and management process between disciplines for MEP coordination.</p>
                    <ul class="feature-list">
                        <li>Prevent clash conflicts</li>
                        <li>Intelligent void generation</li>
                        <li>Firestop automated location</li>
                        <li>Voids for ducts, cabletray, busway and pipes on walls and floors</li>
                    </ul>
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
                        <video class="laptop-video" controls muted>
                            <source src="ACM_EC_DBExcel.mp4" type="video/mp4">
                            Your browser does not support the video element.
                        </video>
                    </div>
                </div>
                <div class="laptop-base"></div>
            </div>
            <div class="content-section">
                <h2>Dictionaries DB</h2>
                <h3>Data Management System</h3>
                <p>Bi-directional integration between Revit and Excel for efficient project data management.</p>
                <ul class="feature-list">
                    <li>Bulk information database import</li>
                    <li>Compatible with system families and loadable families</li>
                    <li>Total control over Revit families information                        
                        <li>Modify any parameter type:
                            <ul class="no-checks">
                                <li>OmniClass Table 21 - Elements</li>
                                <li>OmniClass Table 22 - Work Results</li>
                                <li>OmniClass Table 23 - Products</li>
                                <li>Assembly Code</li>
                                <li>Keynote</li>
                                <li>Material properties (kg/ml, density, etc.)</li>
                                <li>Manufacturer data</li>                                
                                <li>URL links and specifications</li>
                            </ul>
                        </li>
                    
                    </li>
                </ul>
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
                            <video class="laptop-video" controls muted>
                                <source src="Videos/ACM_EC_SheetRevisor.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Sheet Revisor</h2>
                    <h3>Drawing Standards Quality Assurance</h3>
                    <p>Automated verification tool for drawing standards and technical documentation.</p>
                    <ul class="feature-list">
                        <li>CAD standards verification</li>
                        <li>Scale Reviewer</li>
                        <li>Siteplan Checker</li>
                        <li>Batch processing of multiple sheets</li>
                    </ul>
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
                            <video class="laptop-video" controls muted>
                                <source src="Videos/ACM_EC_WEB_BEP_Revisor.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>BEP Checker Web</h2>
                    <h3>Cloud Platform</h3>
                    <p>Web version of BEP Checker with extended capabilities and access from anywhere.</p>
                    <ul class="feature-list">
                        <li>Direct connection with uploaded models</li>
                        <li>Real-time collaboration</li>
                        <li>Project metrics dashboard</li>
                        <li>BIM 360/ACC integration</li>
                    </ul>
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
                            <video class="laptop-video" controls muted>
                                <source src="ACM_EC_DigitalTwins.mp4" type="video/mp4">
                                Your browser does not support the video element.
                            </video>
                        </div>
                    </div>
                    <div class="laptop-base"></div>
                </div>
                <div class="content-section">
                    <h2>Digital Twins</h2>
                    <h3>IoT Integration Platform</h3>
                    <p>Integration of BIM models with IoT sensors to create real-time digital twins.</p>
                    <ul class="feature-list">
                        <li>Real-time monitoring</li>
                        <li>Preventive maintenance *</li>
                        <li>Energy optimization *</li>
                    </ul>
                </div>
            </div>
        `
    },
    'closing': {
        html: `
            <div class="slide-layout full-width">
                <div class="content-section closing-content">
                    <h2>Thank You!</h2>
                    <p>For your attention and interest in our digital solutions</p>
                    <div class="contact-info">
                        <p><strong>AECOM EC Team</strong></p>
                        <p>bayron.cuesta@aecom.com / christian.sarmiento@aecom.com</p>
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
    }, 5000); // 3000ms = 3 segundos
});