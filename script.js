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

const ROI_WEEKLY_HOURS = 44;
const ROI_MONTHLY_HOURS = 220;
const ROI_COST_REDUCTION_RATE = 0.95;
const ROI_DELIVERY_UNIT_CONFIG = {
    weeks: {
        label: 'Semanas',
        min: 1,
        max: 24,
        step: 1,
        hours: ROI_WEEKLY_HOURS
    },
    months: {
        label: 'Meses',
        min: 1,
        max: 12,
        step: 1,
        hours: ROI_MONTHLY_HOURS
    }
};

const roiCompensationState = {
    monthlySalary: 4300000
};

const defaultRoiState = {
    projects: 1,
    models: 30,
    reviews: 5,
    deliveryDuration: 4,
    deliveryUnit: 'weeks'
};

const roiScenarioStates = {};

const roiScenarios = [
    {
        id: 'revisor-bim',
        title: '1. Revisor BIM (Revit)',
        saving: '95.0%',
        priceUrl: 'https://ottoapis.com/producto/revisor-bim',
        description: 'Automatización de la revisión del BEP en modelos multidisciplinarios.',
        metricHeader: 'Métrica de Auditoría',
        manualHeader: 'Revisión Manual',
        autoHeader: 'Reducción de costos',
        modelLabel: 'Cantidad de modelos por proyecto',
        frequencyLabel: 'Cantidad de revisiones por modelo',
        timeLabel: 'Horas dedicadas por modelo',
        costModelLabel: 'Costo revisión / modelo',
        costProjectLabel: 'Costo revisión / proyecto',
        manualHours: 4,
        autoHours: 5 / 60,
        hideProjectsControl: true,
        hiddenTableFields: ['models', 'reviews', 'delivery'],
        deliveryWeeksControl: {
            label: 'Plazo de entrega'
        },
        manualHoursControl: {
            label: 'Horas dedicadas por modelo',
            min: 0,
            max: 8,
            step: 0.5
        }
    },
    {
        id: 'firestop-voids',
        title: '2. Firestop Voids (Revit)',
        saving: '40.0%',
        priceUrl: 'https://ottoapis.com/producto/firestop-voids',
        description: 'Generación automática de vacíos para sellos cortafuegos en muros, pisos y vigas vinculados a MEP, incluyendo el impacto del ruido de coordinación por clashes contra muros sin valor.',
        metricHeader: 'Métrica de Coordinación MEP',
        manualHeader: 'Proceso Manual',
        autoHeader: 'Reducción de costos',
        modelLabel: 'Cantidad de modelos por proyecto',
        frequencyLabel: 'Cantidad de revisiones por modelo',
        timeLabel: 'Horas dedicadas por revisión',
        costModelLabel: 'Costo revisión / modelo',
        costProjectLabel: 'Costo revisión / proyecto',
        manualHours: 8,
        autoHours: 0.005,
        coordinationNoise: {
            manualClashes: 798,
            autoClashes: 491,
            minutesPerClash: 1
        }
    },
    {
        id: 'parameter-tool',
        title: '3. Parameter Tool (Revit)',
        saving: '99.8%',
        priceUrl: 'https://ottoapis.com/producto/parameter-tool',
        description: 'Llenado masivo de parámetros, reemplazo de valores y generación de consecutivos alfanuméricos.',
        metricHeader: 'Detalle del proceso',
        manualHeader: 'Edición Manual',
        autoHeader: 'Reducción de costos',
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
        autoHeader: 'Reducción de costos',
        modelLabel: 'Cantidad de modelos por proyecto',
        frequencyLabel: 'Cantidad de revisiones por modelo',
        timeLabel: 'Horas dedicadas por revisión',
        costModelLabel: 'Costo proceso / modelo',
        costProjectLabel: 'Costo proceso / proyecto',
        manualHours: 2,
        autoHours: 0.001,
        showRoiInputs: false,
        showMetricsTable: false
    },
    {
        id: 'bep-civil',
        title: '5. BEP Revisor Civil 3D',
        saving: '95.0%',
        priceUrl: 'https://ottoapis.com/producto/bep-revisor-civil',
        description: 'Auditoría automática del cumplimiento del BEP en modelos de infraestructura de Civil 3D.',
        metricHeader: 'Métrica de Infraestructura',
        manualHeader: 'Revisión Manual',
        autoHeader: 'Reducción de costos',
        modelLabel: 'Cantidad de modelos (DWG)',
        frequencyLabel: 'Cantidad de revisiones por DWG',
        timeLabel: 'Horas dedicadas por modelo',
        costModelLabel: 'Costo revisión / DWG',
        costProjectLabel: 'Costo revisión / proyecto',
        manualHours: 5,
        autoHours: 0.0005,
        hideProjectsControl: true,
        hiddenTableFields: ['models', 'reviews', 'delivery'],
        deliveryWeeksControl: {
            label: 'Plazo de entrega'
        },
        manualHoursControl: {
            label: 'Horas dedicadas por modelo',
            min: 0,
            max: 8,
            step: 0.5
        }
    },
    {
        id: 'database-sync',
        title: '6. DataBaseSync Civil 3D',
        saving: '99.7%',
        priceUrl: 'https://ottoapis.com/producto/psets-sync-civil',
        description: 'Sincronización bidireccional entre Civil 3D y Excel para edición masiva de propiedades.',
        metricHeader: 'Métrica de Sincronización',
        manualHeader: 'Proceso Manual',
        autoHeader: 'Reducción de costos',
        modelLabel: 'Cantidad de modelos (DWG)',
        frequencyLabel: 'Ciclos de sincronización',
        timeLabel: 'Horas dedicadas por modelo',
        costModelLabel: 'Costo de llenado de parámetros / DWG',
        costProjectLabel: 'Costo de llenado de parámetros / proyecto',
        manualHours: 8,
        autoHours: 0.02,
        hideProjectsControl: true,
        hiddenTableFields: ['models', 'reviews', 'delivery'],
        deliveryWeeksControl: {
            label: 'Plazo de entrega'
        },
        manualHoursControl: {
            label: 'Horas dedicadas por modelo',
            min: 0,
            max: 8,
            step: 0.5
        }
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

function formatWeeks(value) {
    return `${value} ${value === 1 ? 'semana' : 'semanas'}`;
}

function formatMonths(value) {
    return `${value} ${value === 1 ? 'mes' : 'meses'}`;
}

function formatDeliveryDuration(value, unit) {
    return unit === 'months' ? formatMonths(value) : formatWeeks(value);
}

function formatPeopleCount(value) {
    if (value > 0 && value < 0.01) {
        return '< 0.01';
    }

    return formatHours(value, 2);
}

function formatPercentage(value, decimals = 1) {
    return `${new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value)}%`;
}

function getScenarioReductionRate(scenario) {
    const saving = Number.parseFloat(scenario?.saving);

    if (Number.isNaN(saving)) {
        return ROI_COST_REDUCTION_RATE;
    }

    return saving / 100;
}

function getCostReductionValue(cost, scenario) {
    return cost * getScenarioReductionRate(scenario);
}

function getResidualCostValue(cost, scenario) {
    return cost - getCostReductionValue(cost, scenario);
}

function formatManualCostDisplay(cost) {
    return `<span class="roi-cost-manual">${formatCop(cost)}</span>`;
}

function formatCostReductionDisplay(cost, scenario) {
    return `<span class="roi-cost-reduction-positive">${formatCop(getResidualCostValue(cost, scenario))}</span>`;
}

function buildCostLabel(label, scenario) {
    return `${label} <span class="roi-reduction-label">(${formatPercentage(getScenarioReductionRate(scenario) * 100)} de reducción)</span>`;
}

function getRoiHourlyRate() {
    return roiCompensationState.monthlySalary / ROI_MONTHLY_HOURS;
}

function getDeliveryUnitConfig(unit) {
    return ROI_DELIVERY_UNIT_CONFIG[unit] || ROI_DELIVERY_UNIT_CONFIG.weeks;
}

function getScenarioState(scenarioId) {
    if (!roiScenarioStates[scenarioId]) {
        const scenario = roiScenarios.find((item) => item.id === scenarioId);
        roiScenarioStates[scenarioId] = {
            ...defaultRoiState,
            ...(scenario && scenario.manualHoursControl ? { manualHours: scenario.manualHours } : {})
        };
    }

    return roiScenarioStates[scenarioId];
}

function getScenarioManualHours(scenario, state) {
    return typeof state.manualHours === 'number' ? state.manualHours : scenario.manualHours;
}

function shouldRenderScenarioField(scenario, field) {
    return !(scenario.hiddenTableFields || []).includes(field);
}

function normalizeScenarioDeliveryState(state) {
    const unitConfig = getDeliveryUnitConfig(state.deliveryUnit);

    if (!state.deliveryUnit || !ROI_DELIVERY_UNIT_CONFIG[state.deliveryUnit]) {
        state.deliveryUnit = 'weeks';
    }

    if (typeof state.deliveryDuration !== 'number' || Number.isNaN(state.deliveryDuration)) {
        state.deliveryDuration = unitConfig.min;
    }

    if (state.deliveryDuration < unitConfig.min) {
        state.deliveryDuration = unitConfig.min;
    }

    if (state.deliveryDuration > unitConfig.max) {
        state.deliveryDuration = unitConfig.max;
    }
}

function getPeopleRequired(hoursPerProject, deliveryDuration, deliveryUnit) {
    const availableHours = deliveryDuration * getDeliveryUnitConfig(deliveryUnit).hours;

    if (!availableHours) {
        return 0;
    }

    return hoursPerProject / availableHours;
}

function buildScenarioControlMarkup(scenario, field, label, min, max, step, formatValue) {
    const state = getScenarioState(scenario.id);
    const rawValue = state[field];
    const displayValue = formatValue ? formatValue(rawValue) : rawValue;

    return `
        <div class="roi-control-item">
            <label for="${scenario.id}-${field}-slider">${label}</label>
            <input id="${scenario.id}-${field}-slider" data-scenario-id="${scenario.id}" data-field="${field}" type="range" min="${min}" max="${max}" step="${step}" value="${state[field]}">
            <span class="roi-control-value" id="${scenario.id}-${field}-value">${displayValue}</span>
        </div>
    `;
}

function buildDeliveryControlMarkup(scenario, control) {
    const state = getScenarioState(scenario.id);
    normalizeScenarioDeliveryState(state);
    const unitConfig = getDeliveryUnitConfig(state.deliveryUnit);

    return `
        <div class="roi-control-item roi-control-item--delivery">
            <div class="roi-control-header">
                <label for="${scenario.id}-deliveryDuration-slider">${control.label}</label>
                <select id="${scenario.id}-deliveryUnit-select" class="roi-control-select" data-scenario-id="${scenario.id}" data-field="deliveryUnit">
                    <option value="weeks" ${state.deliveryUnit === 'weeks' ? 'selected' : ''}>Semanas</option>
                    <option value="months" ${state.deliveryUnit === 'months' ? 'selected' : ''}>Meses</option>
                </select>
            </div>
            <input id="${scenario.id}-deliveryDuration-slider" data-scenario-id="${scenario.id}" data-field="deliveryDuration" type="range" min="${unitConfig.min}" max="${unitConfig.max}" step="${unitConfig.step}" value="${state.deliveryDuration}">
            <span class="roi-control-value" id="${scenario.id}-deliveryDuration-value">${formatDeliveryDuration(state.deliveryDuration, state.deliveryUnit)}</span>
        </div>
    `;
}

function getFirestopCoordinationAnalysis(scenario, state, hourlyRate) {
    if (!scenario.coordinationNoise) {
        return null;
    }

    const { manualClashes, autoClashes, minutesPerClash } = scenario.coordinationNoise;
    const manualHours = getScenarioManualHours(scenario, state);
    const coordinationHoursManual = (manualClashes * minutesPerClash) / 60;
    const coordinationHoursAuto = (autoClashes * minutesPerClash) / 60;
    const coordinationCostProjectManual = coordinationHoursManual * state.models * state.reviews * state.projects * hourlyRate;
    const coordinationCostProjectAuto = coordinationHoursAuto * state.models * state.reviews * state.projects * hourlyRate;
    const baseCostProjectManual = manualHours * hourlyRate * state.models * state.reviews * state.projects;
    const baseCostProjectAuto = scenario.autoHours * hourlyRate * state.models * state.reviews * state.projects;

    return {
        manualClashes,
        autoClashes,
        minutesPerClash,
        coordinationHoursManual,
        coordinationHoursAuto,
        coordinationCostProjectManual,
        coordinationCostProjectAuto,
        totalCostProjectManual: baseCostProjectManual + coordinationCostProjectManual,
        totalCostProjectAuto: baseCostProjectAuto + coordinationCostProjectAuto
    };
}

function buildFirestopRoiContent(scenario) {
    const { manualClashes, autoClashes } = scenario.coordinationNoise;

    return `
        <div class="roi-firestop-panel">
            <div class="roi-firestop-media">
                <img src="imageVoids.png" alt="Comparativo de interferencias Firestop Voids" class="roi-firestop-image">
            </div>
            <div class="roi-firestop-insights">
                <div class="roi-firestop-stat">
                    <span class="roi-firestop-stat-label">Clashes detectados en Navisworks</span>
                    <div class="roi-firestop-stat-values">
                        <span class="roi-firestop-stat-before">Antes: ${manualClashes}</span>
                        <span class="roi-firestop-stat-after">Después: ${autoClashes}</span>
                    </div>
                </div>
                <ul class="feature-list roi-firestop-list">
                    <li>La disminución de interferencias reduce la cantidad de reuniones de coordinación dedicadas a revisar ruido contra muros.</li>
                    <li>Se reduce la generación de reportes repetitivos y el tiempo invertido en documentar clashes sin valor.</li>
                    <li>Extraección de cantidades de sellos cortafuegos.</li>
                </ul>
            </div>
        </div>
    `;
}

function buildParameterToolRoiContent() {
    return `
        <div class="roi-firestop-panel">
            <div class="roi-firestop-media">
                <img src="image-parameter-value.png" alt="Flujo automatizado de Parameter Tool" class="roi-firestop-image">
            </div>
            <div class="roi-firestop-insights">
                <div class="roi-firestop-stat">
                    <span class="roi-firestop-stat-label">Potencial de automatización del flujo</span>
                    <div class="roi-firestop-stat-values">
                        <span class="roi-potential-chip">Asignación masiva</span>
                        <span class="roi-potential-chip">Reemplazo en lote</span>
                        <span class="roi-potential-chip">Consecutivos inteligentes</span>
                    </div>
                </div>
                <ul class="feature-list roi-firestop-list">
                    <li>Centraliza la carga de valores sobre múltiples familias y parámetros en una sola operación.</li>
                    <li>Permite actualizar nomenclaturas y descripciones existentes sin recorrer manualmente el modelo.</li>
                    <li>Estandariza secuencias numéricas y alfanuméricas para mejorar trazabilidad, QA y consistencia documental.</li>
                </ul>
            </div>
        </div>
    `;
}

function buildXyzRoiContent() {
    return `
        <div class="roi-firestop-panel roi-xyz-panel">
            <div class="roi-firestop-media">
                <img src="XYZ_Coord_Gemini.png" alt="Visualización de coordenadas georreferenciadas para XYZ Coordinates" class="roi-firestop-image">
            </div>
            <div class="roi-firestop-insights">
                <div class="roi-firestop-stat">
                    <span class="roi-firestop-stat-label">Valor agregado para los modelos BIM</span>
                    <div class="roi-firestop-stat-values">
                        <span class="roi-firestop-stat-after">Mayor LOI</span>
                        <span class="roi-firestop-stat-after">Mayor precisión</span>
                    </div>
                </div>
                <ul class="feature-list roi-firestop-list">
                    <li>De forma ágil, la aplicación ubica las coordenadas de elementos de diferentes categorías seleccionadas por el usuario.</li>
                    <li>Aumenta el LOI de los modelos al incorporar información precisa de ubicación directamente sobre los elementos.</li>
                    <li>Mejora la calidad de la información para solicitudes recurrentes de coordenadas de cajas de inspección sanitaria, cajas eléctricas, pilotes y otros activos.</li>
                </ul>
            </div>
        </div>
    `;
}

function buildScenarioPriceButtonMarkup(scenario) {
    if (!scenario.priceUrl) {
        return '';
    }

    return `
        <div class="action-buttons roi-expander-actions">
            <button class="action-btn business-case-btn" onclick="window.open('${scenario.priceUrl}', '_blank')">
                <i class="fas fa-dollar-sign"></i>
                <span>Precios Aplicación</span>
            </button>
        </div>
    `;
}

function buildRoiScenarioTable(scenario, index) {
    const state = getScenarioState(scenario.id);
    const hourlyRate = getRoiHourlyRate();
    const firestopAnalysis = getFirestopCoordinationAnalysis(scenario, state, hourlyRate);
    const manualHours = getScenarioManualHours(scenario, state);
    const isParameterTool = scenario.id === 'parameter-tool';
    const pillLabel = scenario.id === 'firestop-voids'
        ? `Disminución de Interferencias: ${scenario.saving}`
        : isParameterTool
            ? 'Aumento de LOI'
            : scenario.id === 'xyz-coordinates'
            ? 'Aumento de LOI'
            : scenario.id === 'database-sync'
                ? 'Ahorro de tiempo y Aumento de LOI'
                : `Ahorro de tiempo: ${scenario.saving}`;
    const isFirestopScenario = scenario.id === 'firestop-voids';
    const parameterToolContent = isParameterTool ? buildParameterToolRoiContent() : '';
    const xyzInsightContent = scenario.id === 'xyz-coordinates' ? buildXyzRoiContent() : '';
    const showRoiInputs = scenario.showRoiInputs !== false;
    const showMetricsTable = scenario.showMetricsTable !== false;
    const scenarioBodyContent = isFirestopScenario ? buildFirestopRoiContent(scenario) : isParameterTool ? `
            ${parameterToolContent}
            ` : `
            ${xyzInsightContent}
            ${showRoiInputs ? `
            <div class="roi-controls roi-expander-controls">
                ${scenario.hideProjectsControl ? '' : buildScenarioControlMarkup(scenario, 'projects', 'Cantidad de proyectos al año', 1, 20, 1)}
                ${buildScenarioControlMarkup(scenario, 'models', scenario.modelLabel, 1, 500, 1)}
                ${buildScenarioControlMarkup(scenario, 'reviews', 'Cantidad de revisiones/ciclos por modelo', 1, 20, 1)}
                ${scenario.manualHoursControl ? buildScenarioControlMarkup(scenario, 'manualHours', scenario.manualHoursControl.label, scenario.manualHoursControl.min, scenario.manualHoursControl.max, scenario.manualHoursControl.step, (value) => `${formatHours(value, 1)} h`) : ''}
                ${scenario.deliveryWeeksControl ? buildDeliveryControlMarkup(scenario, scenario.deliveryWeeksControl) : ''}
            </div>
            ` : ''}
            ${showMetricsTable ? `
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
                        ${scenario.hideProjectsControl ? '' : `
                        <tr>
                            <td>Cantidad de proyectos al año</td>
                            <td id="${scenario.id}-projects-manual">${state.projects}</td>
                            <td id="${scenario.id}-projects-auto">${state.projects}</td>
                        </tr>
                        `}
                        ${shouldRenderScenarioField(scenario, 'models') ? `
                        <tr>
                            <td>${scenario.modelLabel}</td>
                            <td id="${scenario.id}-models-manual">${state.models}</td>
                            <td id="${scenario.id}-models-auto">${state.models}</td>
                        </tr>
                        ` : ''}
                        ${shouldRenderScenarioField(scenario, 'reviews') ? `
                        <tr>
                            <td>${scenario.frequencyLabel}</td>
                            <td id="${scenario.id}-reviews-manual">${state.reviews}</td>
                            <td id="${scenario.id}-reviews-auto">${state.reviews}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td>${scenario.timeLabel}</td>
                            <td id="${scenario.id}-hours-manual">${formatReviewHours(manualHours)}</td>
                            <td id="${scenario.id}-hours-auto">${formatReviewHours(scenario.autoHours)}</td>
                        </tr>
                        ${scenario.deliveryWeeksControl && shouldRenderScenarioField(scenario, 'delivery') ? `
                        <tr>
                            <td>Plazo de entrega</td>
                            <td id="${scenario.id}-delivery-duration-manual">${formatDeliveryDuration(state.deliveryDuration, state.deliveryUnit)}</td>
                            <td id="${scenario.id}-delivery-duration-auto">${formatDeliveryDuration(state.deliveryDuration, state.deliveryUnit)}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td>Horas dedicadas por proyecto</td>
                            <td id="${scenario.id}-hours-project-manual"></td>
                            <td id="${scenario.id}-hours-project-auto"></td>
                        </tr>
                        ${scenario.deliveryWeeksControl ? `
                        <tr>
                            <td>Personas requeridas para cumplir el plazo</td>
                            <td id="${scenario.id}-people-manual"></td>
                            <td id="${scenario.id}-people-auto"></td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td>${buildCostLabel(scenario.costModelLabel, scenario)}</td>
                            <td id="${scenario.id}-cost-model-manual"></td>
                            <td id="${scenario.id}-cost-model-auto"></td>
                        </tr>
                        <tr>
                            <td>${buildCostLabel(scenario.costProjectLabel, scenario)}</td>
                            <td id="${scenario.id}-cost-project-manual"></td>
                            <td id="${scenario.id}-cost-project-auto"></td>
                        </tr>
                        ${firestopAnalysis ? `
                        <tr class="roi-table-accent-row">
                            <td>Clashes contra muros sin valor / modelo</td>
                            <td id="${scenario.id}-noise-clashes-manual">${firestopAnalysis.manualClashes}</td>
                            <td id="${scenario.id}-noise-clashes-auto">${firestopAnalysis.autoClashes}</td>
                        </tr>
                        <tr>
                            <td>Minutos promedio por clash en reuniones e informes</td>
                            <td id="${scenario.id}-noise-minutes-manual">${formatHours(firestopAnalysis.minutesPerClash, 1)}</td>
                            <td id="${scenario.id}-noise-minutes-auto">${formatHours(firestopAnalysis.minutesPerClash, 1)}</td>
                        </tr>
                        <tr>
                            <td>Horas de coordinación no productiva / revisión</td>
                            <td id="${scenario.id}-noise-hours-manual">${formatHours(firestopAnalysis.coordinationHoursManual, 2)}</td>
                            <td id="${scenario.id}-noise-hours-auto">${formatHours(firestopAnalysis.coordinationHoursAuto, 2)}</td>
                        </tr>
                        <tr>
                            <td>Costo ruido de coordinación / proyecto</td>
                            <td id="${scenario.id}-noise-cost-project-manual">${formatCop(firestopAnalysis.coordinationCostProjectManual)}</td>
                            <td id="${scenario.id}-noise-cost-project-auto">${formatCop(firestopAnalysis.coordinationCostProjectAuto)}</td>
                        </tr>
                        <tr class="roi-table-accent-row">
                            <td>Costo total coordinación / proyecto</td>
                            <td id="${scenario.id}-total-cost-project-manual">${formatCop(firestopAnalysis.totalCostProjectManual)}</td>
                            <td id="${scenario.id}-total-cost-project-auto">${formatCop(firestopAnalysis.totalCostProjectAuto)}</td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
            ` : ''}
            `;

    return `
        <details class="roi-expander" ${index === 0 ? 'open' : ''}>
            <summary>
                <span>${scenario.title}</span>
                <span class="roi-pill">${pillLabel}</span>
            </summary>
            <p class="roi-expander-desc">${scenario.description}</p>
            ${scenarioBodyContent}
            ${buildScenarioPriceButtonMarkup(scenario)}
        </details>
    `;
}

function buildSuiteRoiHtml() {
    const scenarioHtml = roiScenarios.map((scenario, index) => buildRoiScenarioTable(scenario, index)).join('');

    return `
        <div class="slide-layout full-width roi-slide">
            <div class="content-section">
                <h2>Análisis de Eficiencia Operativa</h2>
                <h3>Suite OTTO para Revit y Civil 3D</h3>
                <p>
                    Ajusta los parámetros de negocio para simular impacto económico por volumen de trabajo.
                    Base de cálculo variable: salario mensual promedio de <strong id="roi-monthly-salary-inline">${formatCop(roiCompensationState.monthlySalary)}</strong>,
                    equivalente a <strong id="roi-hourly-rate-inline">${formatCop(getRoiHourlyRate())}</strong> por hora sobre ${ROI_MONTHLY_HOURS} h/mes y ${ROI_WEEKLY_HOURS} h/semana.
                </p>

                <div class="roi-controls roi-global-controls">
                    <div class="roi-control-item roi-salary-control">
                        <label for="roi-monthly-salary-slider">Salario mensual promedio Coordinador BIM</label>
                        <input id="roi-monthly-salary-slider" type="range" min="2500000" max="12000000" step="100000" value="${roiCompensationState.monthlySalary}">
                        <span class="roi-control-value" id="roi-monthly-salary-value">${formatCop(roiCompensationState.monthlySalary)}</span>
                        <span class="roi-control-meta" id="roi-hourly-rate-value">${formatCop(getRoiHourlyRate())} por hora sobre ${ROI_MONTHLY_HOURS} h/mes y ${ROI_WEEKLY_HOURS} h/semana</span>
                    </div>
                </div>


                <div class="roi-accordion">
                    ${scenarioHtml}
                </div>

                <div class="roi-conclusion">
                    <h3>Conclusión: Valor de la Suite OTTO</h3>
                    <ul class="feature-list">
                        <li>Ahorro económico directo: reducción de costos operativos en promedio superior al 95%.</li>
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

function setHtmlIfExists(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = value;
    }
}

function updateRoiMetrics() {
    let totalManualHoursYear = 0;
    let totalAutoHoursYear = 0;
    const hourlyRate = getRoiHourlyRate();

    setTextIfExists('roi-monthly-salary-inline', formatCop(roiCompensationState.monthlySalary));
    setTextIfExists('roi-hourly-rate-inline', formatCop(hourlyRate));
    setTextIfExists('roi-monthly-salary-value', formatCop(roiCompensationState.monthlySalary));
    setTextIfExists('roi-hourly-rate-value', `${formatCop(hourlyRate)} por hora sobre ${ROI_MONTHLY_HOURS} h/mes y ${ROI_WEEKLY_HOURS} h/semana`);

    roiScenarios.forEach((scenario) => {
        const state = getScenarioState(scenario.id);
        normalizeScenarioDeliveryState(state);
        const manualHours = getScenarioManualHours(scenario, state);
        const deliveryDuration = state.deliveryDuration;
        const deliveryUnit = state.deliveryUnit;
        const hoursProjectManual = manualHours * state.models * state.reviews;
        const hoursProjectAuto = scenario.autoHours * state.models * state.reviews;
        const costModelManual = manualHours * hourlyRate;
        const costProjectManual = costModelManual * state.models * state.reviews * state.projects;
        const peopleManual = getPeopleRequired(hoursProjectManual, deliveryDuration, deliveryUnit);
        const peopleAuto = getPeopleRequired(hoursProjectAuto, deliveryDuration, deliveryUnit);

        totalManualHoursYear += manualHours * state.models * state.reviews * state.projects;
        totalAutoHoursYear += scenario.autoHours * state.models * state.reviews * state.projects;

        setTextIfExists(`${scenario.id}-projects-value`, state.projects);
        setTextIfExists(`${scenario.id}-models-value`, state.models);
        setTextIfExists(`${scenario.id}-reviews-value`, state.reviews);
        if (scenario.manualHoursControl) {
            setTextIfExists(`${scenario.id}-manualHours-value`, `${formatHours(manualHours, 1)} h`);
        }
        if (scenario.deliveryWeeksControl) {
            const unitConfig = getDeliveryUnitConfig(deliveryUnit);
            const deliverySlider = document.getElementById(`${scenario.id}-deliveryDuration-slider`);
            const deliverySelect = document.getElementById(`${scenario.id}-deliveryUnit-select`);

            if (deliverySlider) {
                deliverySlider.min = String(unitConfig.min);
                deliverySlider.max = String(unitConfig.max);
                deliverySlider.step = String(unitConfig.step);
                deliverySlider.value = String(deliveryDuration);
            }

            if (deliverySelect) {
                deliverySelect.value = deliveryUnit;
            }

            setTextIfExists(`${scenario.id}-deliveryDuration-value`, formatDeliveryDuration(deliveryDuration, deliveryUnit));
        }

        setTextIfExists(`${scenario.id}-projects-manual`, state.projects);
        setTextIfExists(`${scenario.id}-projects-auto`, state.projects);
        setTextIfExists(`${scenario.id}-models-manual`, state.models);
        setTextIfExists(`${scenario.id}-models-auto`, state.models);
        setTextIfExists(`${scenario.id}-reviews-manual`, state.reviews);
        setTextIfExists(`${scenario.id}-reviews-auto`, state.reviews);

        setTextIfExists(`${scenario.id}-hours-manual`, formatReviewHours(manualHours));
        setTextIfExists(`${scenario.id}-hours-auto`, formatReviewHours(scenario.autoHours));
        setTextIfExists(`${scenario.id}-delivery-duration-manual`, formatDeliveryDuration(deliveryDuration, deliveryUnit));
        setTextIfExists(`${scenario.id}-delivery-duration-auto`, formatDeliveryDuration(deliveryDuration, deliveryUnit));
        setTextIfExists(`${scenario.id}-hours-project-manual`, `${formatHours(hoursProjectManual, 2)} h`);
        setTextIfExists(`${scenario.id}-hours-project-auto`, `${formatHours(hoursProjectAuto, 2)} h`);
        setTextIfExists(`${scenario.id}-people-manual`, formatPeopleCount(peopleManual));
        setTextIfExists(`${scenario.id}-people-auto`, formatPeopleCount(peopleAuto));

        setHtmlIfExists(`${scenario.id}-cost-model-manual`, formatManualCostDisplay(costModelManual));
        setHtmlIfExists(`${scenario.id}-cost-model-auto`, formatCostReductionDisplay(costModelManual, scenario));
        setHtmlIfExists(`${scenario.id}-cost-project-manual`, formatManualCostDisplay(costProjectManual));
        setHtmlIfExists(`${scenario.id}-cost-project-auto`, formatCostReductionDisplay(costProjectManual, scenario));

        const firestopAnalysis = getFirestopCoordinationAnalysis(scenario, state, hourlyRate);
        if (firestopAnalysis) {
            setTextIfExists(`${scenario.id}-noise-clashes-manual`, firestopAnalysis.manualClashes);
            setTextIfExists(`${scenario.id}-noise-clashes-auto`, firestopAnalysis.autoClashes);
            setTextIfExists(`${scenario.id}-noise-minutes-manual`, formatHours(firestopAnalysis.minutesPerClash, 1));
            setTextIfExists(`${scenario.id}-noise-minutes-auto`, formatHours(firestopAnalysis.minutesPerClash, 1));
            setTextIfExists(`${scenario.id}-noise-hours-manual`, formatHours(firestopAnalysis.coordinationHoursManual, 2));
            setTextIfExists(`${scenario.id}-noise-hours-auto`, formatHours(firestopAnalysis.coordinationHoursAuto, 2));
            setTextIfExists(`${scenario.id}-noise-cost-project-manual`, formatCop(firestopAnalysis.coordinationCostProjectManual));
            setTextIfExists(`${scenario.id}-noise-cost-project-auto`, formatCop(firestopAnalysis.coordinationCostProjectAuto));
            setTextIfExists(`${scenario.id}-total-cost-project-manual`, formatCop(firestopAnalysis.totalCostProjectManual));
            setTextIfExists(`${scenario.id}-total-cost-project-auto`, formatCop(firestopAnalysis.totalCostProjectAuto));
        }
    });

    const avgSaving = totalManualHoursYear > 0
        ? ((1 - (totalAutoHoursYear / totalManualHoursYear)) * 100)
        : 0;

    setTextIfExists('roi-highlight-saving', `${formatHours(avgSaving, 1)}%`);
    setTextIfExists('roi-highlight-manual-hours', `${formatHours(totalManualHoursYear, 2)} h`);
    setTextIfExists('roi-highlight-auto-hours', `${formatHours(totalAutoHoursYear, 2)} h`);
}

function bindRoiControls() {
    const salarySlider = document.getElementById('roi-monthly-salary-slider');
    const sliders = document.querySelectorAll('.roi-expander-controls input[type="range"]');
    const selects = document.querySelectorAll('.roi-expander-controls select');

    if (!salarySlider && !sliders.length && !selects.length) {
        return;
    }

    if (salarySlider) {
        salarySlider.addEventListener('input', (event) => {
            roiCompensationState.monthlySalary = Number(event.target.value);
            updateRoiMetrics();
        });
    }

    const handleInput = (event) => {
        const slider = event.target;
        const scenarioId = slider.dataset.scenarioId;
        const field = slider.dataset.field;

        if (!scenarioId || !field) {
            return;
        }

        const state = getScenarioState(scenarioId);
        state[field] = Number(slider.value);
        updateRoiMetrics();
    };

    sliders.forEach((slider) => {
        slider.addEventListener('input', handleInput);
    });

    selects.forEach((select) => {
        select.addEventListener('change', (event) => {
            const scenarioId = event.target.dataset.scenarioId;
            const field = event.target.dataset.field;

            if (!scenarioId || !field) {
                return;
            }

            const state = getScenarioState(scenarioId);
            state[field] = event.target.value;
            normalizeScenarioDeliveryState(state);
            updateRoiMetrics();
        });
    });

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
                                <span class="roi-pill">Aumento de LOI</span>
                            </summary>
                            <p class="roi-expander-desc">Llenado masivo de parámetros, reemplazo de valores y generación de consecutivos alfanuméricos.</p>
                            <div class="roi-firestop-panel">
                                <div class="roi-firestop-media">
                                    <img src="image-parameter-value.png" alt="Flujo automatizado de Parameter Tool" class="roi-firestop-image">
                                </div>
                                <div class="roi-firestop-insights">
                                    <div class="roi-firestop-stat">
                                        <span class="roi-firestop-stat-label">Potencial de automatización del flujo</span>
                                        <div class="roi-firestop-stat-values">
                                            <span class="roi-potential-chip">Asignación masiva</span>
                                            <span class="roi-potential-chip">Reemplazo en lote</span>
                                            <span class="roi-potential-chip">Consecutivos inteligentes</span>
                                        </div>
                                    </div>
                                    <ul class="feature-list roi-firestop-list">
                                        <li>Centraliza la carga de valores sobre múltiples familias y parámetros en una sola operación.</li>
                                        <li>Permite actualizar nomenclaturas y descripciones existentes sin recorrer manualmente el modelo.</li>
                                        <li>Estandariza secuencias numéricas y alfanuméricas para mejorar trazabilidad, QA y consistencia documental.</li>
                                    </ul>
                                </div>
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
                    <h2>Firestop Voids</h2>
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