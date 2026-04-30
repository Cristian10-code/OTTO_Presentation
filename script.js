// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.timeline-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const toggle = document.getElementById('menuToggle');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    
    // Change icon
    const icon = toggle.querySelector('i');
    if (sidebar.classList.contains('open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

function closeSidebarIfMobile() {
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.timeline-sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const toggle = document.getElementById('menuToggle');
        
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            const icon = toggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    }
}

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

const ROI_HOURLY_RATE = 20000;

const roiState = {
    projects: 1,
    models: 30,
    reviews: 5
};

const roiScenarios = [
    {
        id: 'revisor-bim',
        title: '1. Revisor BIM (Revit)',
        saving: '99.9%',
        description: 'Automatización de la revisión del BEP en modelos multidisciplinarios.',
        metricHeader: 'Métrica de Auditoría',
        manualHeader: 'Revisión Manual',
        autoHeader: 'Automatización OTTO',
        modelLabel: 'Cantidad de modelos por proyecto',
        frequencyLabel: 'Cantidad de revisiones por modelo',
        timeLabel: 'Horas dedicadas por revisión',
        costModelLabel: 'Costo revisión / modelo',
        costProjectLabel: 'Costo revisión / proyecto',
        manualHours: 4,
        autoHours: 0.00007
    },
    {
        id: 'firestop-voids',
        title: '2. Firestop Voids (Revit)',
        saving: '99.3%',
        description: 'Generación automática de vacíos para sellos cortafuegos en muros, pisos y vigas vinculados a MEP.',
        metricHeader: 'Métrica de Coordinación MEP',
        manualHeader: 'Proceso Manual',
        autoHeader: 'Automatización OTTO',
        modelLabel: 'Cantidad de modelos por proyecto',
        frequencyLabel: 'Cantidad de revisiones por modelo',
        timeLabel: 'Horas dedicadas por revisión',
        costModelLabel: 'Costo revisión / modelo',
        costProjectLabel: 'Costo revisión / proyecto',
        manualHours: 8,
        autoHours: 0.005
    },
    {
        id: 'parameter-tool',
        title: '3. Parameter Tool (Revit)',
        saving: '99.8%',
        description: 'Llenado masivo de parámetros, reemplazo de valores y generación de consecutivos alfanuméricos.',
        metricHeader: 'Métrica de Gestión de Datos',
        manualHeader: 'Edición Manual',
        autoHeader: 'Automatización OTTO',
        modelLabel: 'Cantidad de modelos por proyecto',
        frequencyLabel: 'Ciclos de actualización de datos',
        timeLabel: 'Horas dedicadas por ciclo',
        costModelLabel: 'Costo edición / modelo',
        costProjectLabel: 'Costo edición / proyecto',
        manualHours: 6,
        autoHours: 0.01
    },
    {
        id: 'xyz-coordinates',
        title: '4. XYZCoordinates (Revit)',
        saving: '99.9%',
        description: 'Asignación automática de coordenadas georreferenciadas a categorías y elementos seleccionados.',
        metricHeader: 'Métrica de Replanteo',
        manualHeader: 'Proceso Manual',
        autoHeader: 'Automatización OTTO',
        modelLabel: 'Cantidad de modelos por proyecto',
        frequencyLabel: 'Cantidad de revisiones por modelo',
        timeLabel: 'Horas dedicadas por revisión',
        costModelLabel: 'Costo proceso / modelo',
        costProjectLabel: 'Costo proceso / proyecto',
        manualHours: 2,
        autoHours: 0.001
    },
    {
        id: 'bep-civil',
        title: '5. BEP Revisor Civil 3D',
        saving: '99.9%',
        description: 'Auditoría automática del cumplimiento del BEP en modelos de infraestructura de Civil 3D.',
        metricHeader: 'Métrica de Infraestructura',
        manualHeader: 'Revisión Manual',
        autoHeader: 'Automatización OTTO',
        modelLabel: 'Cantidad de modelos (DWG)',
        frequencyLabel: 'Cantidad de revisiones por DWG',
        timeLabel: 'Horas dedicadas por revisión',
        costModelLabel: 'Costo revisión / DWG',
        costProjectLabel: 'Costo revisión / proyecto',
        manualHours: 5,
        autoHours: 0.0005
    },
    {
        id: 'database-sync',
        title: '6. DataBaseSync Civil 3D',
        saving: '99.7%',
        description: 'Sincronización bidireccional entre Civil 3D y Excel para edición masiva de propiedades.',
        metricHeader: 'Métrica de Sincronización',
        manualHeader: 'Proceso Manual',
        autoHeader: 'Automatización OTTO',
        modelLabel: 'Cantidad de modelos (DWG)',
        frequencyLabel: 'Ciclos de sincronización',
        timeLabel: 'Horas dedicadas por ciclo',
        costModelLabel: 'Costo sincro / DWG',
        costProjectLabel: 'Costo sincro / proyecto',
        manualHours: 8,
        autoHours: 0.02
    }
];

function formatCop(value) {
    const hasDecimal = Math.abs(value % 1) > 0;
    const decimals = hasDecimal && value < 100 ? 1 : 0;
    return `$${new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value)} COP`;
}

function formatHours(value, maxDecimals = 2) {
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: maxDecimals
    }).format(value);
}

function formatReviewHours(value) {
    if (value >= 1) {
        return formatHours(value, 2);
    }

    if (value >= 0.01) {
        return formatHours(value, 3);
    }

    return value.toFixed(5).replace(/0+$/, '').replace(/\.$/, '');
}

function buildRoiScenarioTable(scenario, index) {
    return `
        <details class="roi-expander" ${index === 0 ? 'open' : ''}>
            <summary>
                <span>${scenario.title}</span>
                <span class="roi-pill">Ahorro de tiempo: ${scenario.saving}</span>
            </summary>
            <p class="roi-expander-desc">${scenario.description}</p>
            <div class="roi-table-wrap">
                <table class="roi-table">
                    <thead>
                        <tr>
                            <th>${scenario.metricHeader}</th>
                            <th>${scenario.manualHeader}</th>
                            <th>${scenario.autoHeader}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cantidad de proyectos al año</td>
                            <td id="${scenario.id}-projects-manual">${roiState.projects}</td>
                            <td id="${scenario.id}-projects-auto">${roiState.projects}</td>
                        </tr>
                        <tr>
                            <td>${scenario.modelLabel}</td>
                            <td id="${scenario.id}-models-manual">${roiState.models}</td>
                            <td id="${scenario.id}-models-auto">${roiState.models}</td>
                        </tr>
                        <tr>
                            <td>${scenario.frequencyLabel}</td>
                            <td id="${scenario.id}-reviews-manual">${roiState.reviews}</td>
                            <td id="${scenario.id}-reviews-auto">${roiState.reviews}</td>
                        </tr>
                        <tr>
                            <td>${scenario.timeLabel}</td>
                            <td id="${scenario.id}-hours-manual">${formatReviewHours(scenario.manualHours)}</td>
                            <td id="${scenario.id}-hours-auto">${formatReviewHours(scenario.autoHours)}</td>
                        </tr>
                        <tr>
                            <td>Salario promedio por hora</td>
                            <td>${formatCop(ROI_HOURLY_RATE)}</td>
                            <td>${formatCop(ROI_HOURLY_RATE)}</td>
                        </tr>
                        <tr>
                            <td>${scenario.costModelLabel}</td>
                            <td id="${scenario.id}-cost-model-manual"></td>
                            <td id="${scenario.id}-cost-model-auto"></td>
                        </tr>
                        <tr>
                            <td>${scenario.costProjectLabel}</td>
                            <td id="${scenario.id}-cost-project-manual"></td>
                            <td id="${scenario.id}-cost-project-auto"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </details>
    `;
}

function buildSuiteRoiHtml() {
    const scenarioHtml = roiScenarios.map((scenario, index) => buildRoiScenarioTable(scenario, index)).join('');

    return `
        <div class="slide-layout full-width roi-slide">
            <div class="content-section">
                <h2>Análisis de Eficiencia Operativa y ROI</h2>
                <h3>Suite OTTO para Revit y Civil 3D</h3>
                <p>
                    Ajusta los parámetros de negocio para simular impacto económico por volumen de trabajo.
                    Base de cálculo fija: salario promedio por hora de <strong>${formatCop(ROI_HOURLY_RATE)}</strong>.
                </p>

                <div class="roi-controls">
                    <div class="roi-control-item">
                        <label for="roi-projects-slider">Cantidad de proyectos al año</label>
                        <input id="roi-projects-slider" type="range" min="1" max="20" step="1" value="${roiState.projects}">
                        <span class="roi-control-value" id="roi-projects-value">${roiState.projects}</span>
                    </div>
                    <div class="roi-control-item">
                        <label for="roi-models-slider">Cantidad de modelos por proyecto</label>
                        <input id="roi-models-slider" type="range" min="1" max="100" step="1" value="${roiState.models}">
                        <span class="roi-control-value" id="roi-models-value">${roiState.models}</span>
                    </div>
                    <div class="roi-control-item">
                        <label for="roi-reviews-slider">Cantidad de revisiones/ciclos por modelo</label>
                        <input id="roi-reviews-slider" type="range" min="1" max="20" step="1" value="${roiState.reviews}">
                        <span class="roi-control-value" id="roi-reviews-value">${roiState.reviews}</span>
                    </div>
                </div>

                <div class="roi-highlight-grid">
                    <div class="roi-highlight-item">
                        <span class="roi-highlight-label">Ahorro Promedio</span>
                        <span class="roi-highlight-value" id="roi-highlight-saving">99.5%</span>
                    </div>
                    <div class="roi-highlight-item">
                        <span class="roi-highlight-label">Horas Hombre / Año (Manual)</span>
                        <span class="roi-highlight-value" id="roi-highlight-manual-hours">0 h</span>
                    </div>
                    <div class="roi-highlight-item">
                        <span class="roi-highlight-label">Horas Hombre / Año (API OTTO)</span>
                        <span class="roi-highlight-value" id="roi-highlight-auto-hours">0 h</span>
                    </div>
                </div>

                <div class="roi-accordion">
                    ${scenarioHtml}
                </div>

                <div class="roi-conclusion">
                    <h3>Conclusión: Valor de la Suite OTTO</h3>
                    <ul class="feature-list">
                        <li>Ahorro económico directo: reducción de costos operativos en promedio superior al 99%.</li>
                        <li>Reducción de riesgos: disminución de RFI en obra por menor error manual de transcripción.</li>
                        <li>Calidad garantizada: cumplimiento consistente de estándares ISO 19650 y BEP del cliente.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function setTextIfExists(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function updateRoiMetrics() {
    let totalManualHoursYear = 0;
    let totalAutoHoursYear = 0;

    setTextIfExists('roi-projects-value', roiState.projects);
    setTextIfExists('roi-models-value', roiState.models);
    setTextIfExists('roi-reviews-value', roiState.reviews);

    roiScenarios.forEach((scenario) => {
        const costModelManual = scenario.manualHours * ROI_HOURLY_RATE;
        const costModelAuto = scenario.autoHours * ROI_HOURLY_RATE;
        const costProjectManual = costModelManual * roiState.models * roiState.reviews;
        const costProjectAuto = costModelAuto * roiState.models * roiState.reviews;

        totalManualHoursYear += scenario.manualHours * roiState.models * roiState.reviews * roiState.projects;
        totalAutoHoursYear += scenario.autoHours * roiState.models * roiState.reviews * roiState.projects;

        setTextIfExists(`${scenario.id}-projects-manual`, roiState.projects);
        setTextIfExists(`${scenario.id}-projects-auto`, roiState.projects);
        setTextIfExists(`${scenario.id}-models-manual`, roiState.models);
        setTextIfExists(`${scenario.id}-models-auto`, roiState.models);
        setTextIfExists(`${scenario.id}-reviews-manual`, roiState.reviews);
        setTextIfExists(`${scenario.id}-reviews-auto`, roiState.reviews);

        setTextIfExists(`${scenario.id}-hours-manual`, formatReviewHours(scenario.manualHours));
        setTextIfExists(`${scenario.id}-hours-auto`, formatReviewHours(scenario.autoHours));

        setTextIfExists(`${scenario.id}-cost-model-manual`, formatCop(costModelManual));
        setTextIfExists(`${scenario.id}-cost-model-auto`, formatCop(costModelAuto));
        setTextIfExists(`${scenario.id}-cost-project-manual`, formatCop(costProjectManual));
        setTextIfExists(`${scenario.id}-cost-project-auto`, formatCop(costProjectAuto));
    });

    const avgSaving = totalManualHoursYear > 0
        ? ((1 - (totalAutoHoursYear / totalManualHoursYear)) * 100)
        : 0;

    setTextIfExists('roi-highlight-saving', `${formatHours(avgSaving, 1)}%`);
    setTextIfExists('roi-highlight-manual-hours', `${formatHours(totalManualHoursYear, 2)} h`);
    setTextIfExists('roi-highlight-auto-hours', `${formatHours(totalAutoHoursYear, 2)} h`);
}

function bindRoiControls() {
    const projectsSlider = document.getElementById('roi-projects-slider');
    const modelsSlider = document.getElementById('roi-models-slider');
    const reviewsSlider = document.getElementById('roi-reviews-slider');

    if (!projectsSlider || !modelsSlider || !reviewsSlider) {
        return;
    }

    const handleInput = () => {
        roiState.projects = Number(projectsSlider.value);
        roiState.models = Number(modelsSlider.value);
        roiState.reviews = Number(reviewsSlider.value);
        updateRoiMetrics();
    };

    projectsSlider.addEventListener('input', handleInput);
    modelsSlider.addEventListener('input', handleInput);
    reviewsSlider.addEventListener('input', handleInput);

    updateRoiMetrics();
}

// Slide contents
const slideContents = {
    'suite-roi': {
        html: `
            <div class="slide-layout full-width roi-slide">
                <div class="content-section">
                    <h2>Análisis de Eficiencia Operativa y ROI</h2>
                    <h3>Suite OTTO para Revit y Civil 3D</h3>
                    <p>
                        Este análisis presenta el impacto económico de automatizar los principales procesos BIM y de infraestructura.
                        Base de cálculo para todos los casos: salario promedio por hora de <strong>$20,000 COP</strong>,
                        <strong>30 modelos por proyecto</strong> y <strong>5 revisiones/ciclos por modelo</strong>.
                    </p>

                    <div class="roi-highlight-grid">
                        <div class="roi-highlight-item">
                            <span class="roi-highlight-label">Ahorro Promedio</span>
                            <span class="roi-highlight-value">99.5%</span>
                        </div>
                        <div class="roi-highlight-item">
                            <span class="roi-highlight-label">Horas Hombre (Manual)</span>
                            <span class="roi-highlight-value">198 h</span>
                        </div>
                        <div class="roi-highlight-item">
                            <span class="roi-highlight-label">Ejecución con API</span>
                            <span class="roi-highlight-value">&lt; 5 min</span>
                        </div>
                    </div>

                    <div class="roi-accordion">
                        <details class="roi-expander" open>
                            <summary>
                                <span>1. Revisor BIM (Revit)</span>
                                <span class="roi-pill">Ahorro de tiempo: 99.9%</span>
                            </summary>
                            <p class="roi-expander-desc">Automatización de la revisión del BEP en modelos multidisciplinarios.</p>
                            <div class="roi-table-wrap">
                                <table class="roi-table">
                                    <thead>
                                        <tr>
                                            <th>Métrica de Auditoría</th>
                                            <th>Revisión Manual</th>
                                            <th>Automatización OTTO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Cantidad de proyectos al año</td><td>1</td><td>1</td></tr>
                                        <tr><td>Cantidad de modelos por proyecto</td><td>30</td><td>30</td></tr>
                                        <tr><td>Cantidad de revisiones por modelo</td><td>5</td><td>5</td></tr>
                                        <tr><td>Horas dedicadas por revisión</td><td>4</td><td>0.00007</td></tr>
                                        <tr><td>Salario promedio por hora</td><td>$20,000 COP</td><td>$20,000 COP</td></tr>
                                        <tr><td>Costo revisión / modelo</td><td>$80,000 COP</td><td>$1.4 COP</td></tr>
                                        <tr><td>Costo revisión / proyecto</td><td>$2,400,000 COP</td><td>$42 COP</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </details>

                        <details class="roi-expander">
                            <summary>
                                <span>2. Firestop Voids (Revit)</span>
                                <span class="roi-pill">Ahorro de tiempo: 99.3%</span>
                            </summary>
                            <p class="roi-expander-desc">Generación automática de vacíos para sellos cortafuegos en muros, pisos y vigas vinculados a MEP.</p>
                            <div class="roi-table-wrap">
                                <table class="roi-table">
                                    <thead>
                                        <tr>
                                            <th>Métrica de Coordinación MEP</th>
                                            <th>Proceso Manual</th>
                                            <th>Automatización OTTO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Cantidad de proyectos al año</td><td>1</td><td>1</td></tr>
                                        <tr><td>Cantidad de modelos por proyecto</td><td>30</td><td>30</td></tr>
                                        <tr><td>Cantidad de revisiones por modelo</td><td>5</td><td>5</td></tr>
                                        <tr><td>Horas dedicadas por revisión</td><td>8</td><td>0.005</td></tr>
                                        <tr><td>Salario promedio por hora</td><td>$20,000 COP</td><td>$20,000 COP</td></tr>
                                        <tr><td>Costo revisión / modelo</td><td>$160,000 COP</td><td>$100 COP</td></tr>
                                        <tr><td>Costo revisión / proyecto</td><td>$4,800,000 COP</td><td>$3,000 COP</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </details>

                        <details class="roi-expander">
                            <summary>
                                <span>3. Parameter Tool (Revit)</span>
                                <span class="roi-pill">Ahorro de tiempo: 99.8%</span>
                            </summary>
                            <p class="roi-expander-desc">Llenado masivo de parámetros, reemplazo de valores y generación de consecutivos alfanuméricos.</p>
                            <div class="roi-table-wrap">
                                <table class="roi-table">
                                    <thead>
                                        <tr>
                                            <th>Métrica de Gestión de Datos</th>
                                            <th>Edición Manual</th>
                                            <th>Automatización OTTO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Cantidad de proyectos al año</td><td>1</td><td>1</td></tr>
                                        <tr><td>Cantidad de modelos por proyecto</td><td>30</td><td>30</td></tr>
                                        <tr><td>Ciclos de actualización de datos</td><td>5</td><td>5</td></tr>
                                        <tr><td>Horas dedicadas por ciclo</td><td>6</td><td>0.01</td></tr>
                                        <tr><td>Salario promedio por hora</td><td>$20,000 COP</td><td>$20,000 COP</td></tr>
                                        <tr><td>Costo edición / modelo</td><td>$120,000 COP</td><td>$200 COP</td></tr>
                                        <tr><td>Costo edición / proyecto</td><td>$3,600,000 COP</td><td>$6,000 COP</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </details>

                        <details class="roi-expander">
                            <summary>
                                <span>4. XYZCoordinates (Revit)</span>
                                <span class="roi-pill">Ahorro de tiempo: 99.9%</span>
                            </summary>
                            <p class="roi-expander-desc">Asignación automática de coordenadas georreferenciadas a categorías y elementos seleccionados.</p>
                            <div class="roi-table-wrap">
                                <table class="roi-table">
                                    <thead>
                                        <tr>
                                            <th>Métrica de Replanteo</th>
                                            <th>Proceso Manual</th>
                                            <th>Automatización OTTO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Cantidad de proyectos al año</td><td>1</td><td>1</td></tr>
                                        <tr><td>Cantidad de modelos por proyecto</td><td>30</td><td>30</td></tr>
                                        <tr><td>Cantidad de revisiones por modelo</td><td>5</td><td>5</td></tr>
                                        <tr><td>Horas dedicadas por revisión</td><td>2</td><td>0.001</td></tr>
                                        <tr><td>Salario promedio por hora</td><td>$20,000 COP</td><td>$20,000 COP</td></tr>
                                        <tr><td>Costo proceso / modelo</td><td>$40,000 COP</td><td>$20 COP</td></tr>
                                        <tr><td>Costo proceso / proyecto</td><td>$1,200,000 COP</td><td>$600 COP</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </details>

                        <details class="roi-expander">
                            <summary>
                                <span>5. BEP Revisor Civil 3D</span>
                                <span class="roi-pill">Ahorro de tiempo: 99.9%</span>
                            </summary>
                            <p class="roi-expander-desc">Auditoría automática del cumplimiento del BEP en modelos de infraestructura de Civil 3D.</p>
                            <div class="roi-table-wrap">
                                <table class="roi-table">
                                    <thead>
                                        <tr>
                                            <th>Métrica de Infraestructura</th>
                                            <th>Revisión Manual</th>
                                            <th>Automatización OTTO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Cantidad de proyectos al año</td><td>1</td><td>1</td></tr>
                                        <tr><td>Cantidad de modelos (DWG)</td><td>30</td><td>30</td></tr>
                                        <tr><td>Cantidad de revisiones por DWG</td><td>5</td><td>5</td></tr>
                                        <tr><td>Horas dedicadas por revisión</td><td>5</td><td>0.0005</td></tr>
                                        <tr><td>Salario promedio por hora</td><td>$20,000 COP</td><td>$20,000 COP</td></tr>
                                        <tr><td>Costo revisión / DWG</td><td>$100,000 COP</td><td>$10 COP</td></tr>
                                        <tr><td>Costo revisión / proyecto</td><td>$3,000,000 COP</td><td>$300 COP</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </details>

                        <details class="roi-expander">
                            <summary>
                                <span>6. DataBaseSync Civil 3D</span>
                                <span class="roi-pill">Ahorro de tiempo: 99.7%</span>
                            </summary>
                            <p class="roi-expander-desc">Sincronización bidireccional entre Civil 3D y Excel para edición masiva de propiedades.</p>
                            <div class="roi-table-wrap">
                                <table class="roi-table">
                                    <thead>
                                        <tr>
                                            <th>Métrica de Sincronización</th>
                                            <th>Proceso Manual</th>
                                            <th>Automatización OTTO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Cantidad de proyectos al año</td><td>1</td><td>1</td></tr>
                                        <tr><td>Cantidad de modelos (DWG)</td><td>30</td><td>30</td></tr>
                                        <tr><td>Ciclos de sincronización</td><td>5</td><td>5</td></tr>
                                        <tr><td>Horas dedicadas por ciclo</td><td>8</td><td>0.02</td></tr>
                                        <tr><td>Salario promedio por hora</td><td>$20,000 COP</td><td>$20,000 COP</td></tr>
                                        <tr><td>Costo sincro / DWG</td><td>$160,000 COP</td><td>$400 COP</td></tr>
                                        <tr><td>Costo sincro / proyecto</td><td>$4,800,000 COP</td><td>$12,000 COP</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </details>
                    </div>

                    <div class="roi-conclusion">
                        <h3>Conclusión: Valor de la Suite OTTO</h3>
                        <ul class="feature-list">
                            <li>Ahorro económico directo: reducción de costos operativos en promedio del 99.5%.</li>
                            <li>Reducción de riesgos: disminución de RFI en obra hasta en 90% por eliminación de errores manuales.</li>
                            <li>Calidad garantizada: cumplimiento consistente de ISO 19650 y requerimientos BEP del cliente.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
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
        
        // Activate first item (ROI Suite)
        const firstItem = document.querySelector('[data-slide="suite-roi"]');
        if (firstItem) {
            changeSlide('suite-roi');
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
    const previewArea = document.querySelector('.preview-area');
    const content = slideContents[slideId];
    
    if (content) {
        slideContent.style.opacity = '0';
        setTimeout(() => {
            if (slideId === 'suite-roi') {
                slideContent.innerHTML = buildSuiteRoiHtml();
                bindRoiControls();
            } else {
                slideContent.innerHTML = content.html;
            }

            if (previewArea) {
                previewArea.classList.toggle('preview-top-align', slideId === 'suite-roi');
            }

            // Set video volume to 60%
            const videos = slideContent.querySelectorAll('video');
            videos.forEach(video => video.volume = 0.45);

            if (previewArea) {
                previewArea.scrollTop = 0;
            }

            slideContent.style.opacity = '1';
        }, 300);
    }
}

if (typeof document !== 'undefined') {
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
        const firstSlide = document.querySelector('.timeline-item[data-slide="suite-roi"]');
        if (firstSlide) {
            changeSlide('suite-roi');
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
}