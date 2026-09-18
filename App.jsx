import { useEffect, useState } from 'react'
import {
  BookOpenCheck,
  Boxes,
  CircleDollarSign,
  Compass,
  Database,
  Gauge,
  GitBranch,
  Lightbulb,
  Network,
  Palette,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Users,
  X
} from 'lucide-react'

const topics = [
  {
    id: 'strategy',
    title: 'Fundamentos y Estrategia',
    eyebrow: '01',
    icon: Compass,
    accent: 'amber',
    short: 'Valor, ciclo ITIL y gestión financiera.',
    position: 'top',
    items: [
      {
        title: 'Servicio TI',
        icon: ServerCog,
        text: 'Entrega valor facilitando resultados sin trasladar al cliente los costos y riesgos técnicos.'
      },
      {
        title: 'Ciclo de Vida ITIL',
        icon: RefreshCw,
        text: 'Estrategia, Diseño, Transición, Operación y Mejora Continua.'
      },
      {
        title: 'Creación de Valor',
        icon: Lightbulb,
        text: 'Se basa en utilidad —lo que hace el servicio— y garantía —qué tan bien lo hace—.'
      },
      {
        title: 'Gestión Financiera',
        icon: CircleDollarSign,
        text: 'Incluye contabilidad, presupuesto y facturación de los servicios de TI.'
      }
    ]
  },
  {
    id: 'design',
    title: 'Diseño del Servicio',
    eyebrow: '02',
    icon: Palette,
    accent: 'cyan',
    short: 'Servicios útiles, usables y eficientes.',
    position: 'top',
    items: [
      {
        title: 'Enfoque en el Usuario',
        icon: Users,
        text: 'Crea servicios útiles y usables para clientes, y eficientes para proveedores.'
      },
      {
        title: 'Lean Canvas',
        icon: Boxes,
        text: 'Valida proyectos TI con bloques como problema, solución, métricas y propuesta de valor.'
      },
      {
        title: 'Catálogo de Servicios',
        icon: BookOpenCheck,
        text: 'Mantiene un registro preciso y actualizado de los servicios disponibles y en producción.'
      },
      {
        title: 'Gestión de Proveedores',
        icon: Network,
        text: 'Controla que terceros cumplan los niveles de servicio y aporten valor.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Seguridad, Continuidad y Disponibilidad',
    eyebrow: '03',
    icon: ShieldCheck,
    accent: 'violet',
    short: 'Protección, riesgo, SLA y recuperación.',
    position: 'bottom',
    items: [
      {
        title: 'Seguridad de la Información',
        icon: ShieldCheck,
        text: 'Protege los datos mediante confidencialidad, integridad y disponibilidad.'
      },
      {
        title: 'Matriz de Riesgos',
        icon: Gauge,
        text: 'Nivel de riesgo = Probabilidad × Impacto o gravedad.'
      },
      {
        title: 'Disponibilidad y SLA',
        icon: Network,
        text: 'Mide downtime, tolerancia a fallos y cumplimiento de acuerdos de nivel de servicio.'
      },
      {
        title: 'Continuidad del Negocio',
        icon: RefreshCw,
        text: 'Define contingencia y recuperación para mantener funciones críticas ante incidentes graves.'
      }
    ]
  },
  {
    id: 'transition',
    title: 'Transición del Servicio',
    eyebrow: '04',
    icon: GitBranch,
    accent: 'rose',
    short: 'Pruebas, despliegue, activos y conocimiento.',
    position: 'bottom',
    items: [
      {
        title: 'Construcción y Despliegue',
        icon: ServerCog,
        text: 'Prueba e implementa servicios nuevos o modificados de manera controlada.'
      },
      {
        title: 'Versiones y Ramificación',
        icon: GitBranch,
        text: 'Usa ramas y repositorios colaborativos sin afectar el sistema principal.'
      },
      {
        title: 'Gestión de Activos · SACM',
        icon: Database,
        text: 'Documenta activos y configuraciones en una CMDB para controlar la infraestructura.'
      },
      {
        title: 'Gestión del Conocimiento',
        icon: BookOpenCheck,
        text: 'Recopila, analiza y comparte información útil para tomar mejores decisiones.'
      }
    ]
  }
]

const conceptExamples = {
  'Servicio TI': 'Una mesa de ayuda restablece el acceso al correo del personal. El usuario recibe el resultado que necesita sin administrar servidores, licencias ni respaldos.',
  'Ciclo de Vida ITIL': 'Una nueva plataforma inicia con la estrategia, se diseña y prueba, pasa a operación y luego se mejora con métricas de uso y satisfacción.',
  'Creación de Valor': 'Una app de citas aporta utilidad al permitir reservar en línea y garantía al estar disponible, ser rápida y proteger los datos del paciente.',
  'Gestión Financiera': 'TI calcula cuánto cuesta por usuario el correo corporativo, asigna un presupuesto anual y reporta el consumo de cada área.',
  'Enfoque en el Usuario': 'Antes de rediseñar el portal de soporte, el equipo entrevista a usuarios y simplifica el formulario de ocho campos a tres.',
  'Lean Canvas': 'Para validar un chatbot interno, el equipo define el problema, segmento de usuarios, propuesta de valor, métricas y costos antes de desarrollarlo.',
  'Catálogo de Servicios': 'El portal publica “Alta de usuario” con descripción, responsable, horario, requisitos y tiempo estimado de atención.',
  'Gestión de Proveedores': 'La empresa revisa mensualmente si su proveedor de internet cumplió el 99.9 % de disponibilidad acordado y aplica penalidades si corresponde.',
  'Seguridad de la Información': 'Los expedientes se cifran, solo personal autorizado puede modificarlos y existen copias disponibles ante una falla.',
  'Matriz de Riesgos': 'La caída del servidor tiene probabilidad media e impacto alto; la matriz la clasifica como riesgo prioritario y exige mitigación.',
  'Disponibilidad y SLA': 'Un servicio estuvo disponible 99.7 % del mes, pero el SLA exige 99.9 %; se registra el incumplimiento y se revisa su causa.',
  'Continuidad del Negocio': 'Si el centro de datos principal falla, el sistema de ventas se activa en una sede alterna dentro del tiempo de recuperación acordado.',
  'Construcción y Despliegue': 'Una actualización se prueba en un entorno controlado, obtiene aprobación y se publica durante una ventana de mantenimiento.',
  'Versiones y Ramificación': 'El equipo desarrolla una función en una rama separada, la revisa y la integra a la rama principal después de superar las pruebas.',
  'Gestión de Activos · SACM': 'La CMDB relaciona un servidor con sus aplicaciones, responsable, ubicación y contratos para evaluar el impacto de un cambio.',
  'Gestión del Conocimiento': 'Después de resolver un incidente recurrente, el equipo documenta síntomas, causa y solución para acelerar futuras atenciones.'
}

function TopicNode({ topic }) {
  const Icon = topic.icon

  return (
    <article className="topic-card">
      <div className="topic-topline">
        <span className="topic-number">{topic.eyebrow}</span>
        <span className="topic-icon"><Icon size={21} strokeWidth={1.8} /></span>
      </div>
      <h2>{topic.title}</h2>
      <p>{topic.short}</p>
    </article>
  )
}

function ConceptNode({ item, onSelect, isActive }) {
  const Icon = item.icon

  return (
    <button
      className={`concept-node${isActive ? ' is-active' : ''}`}
      type="button"
      onClick={() => onSelect(item)}
      aria-haspopup="dialog"
      aria-pressed={isActive}
    >
      <span className="concept-icon"><Icon size={17} strokeWidth={1.8} /></span>
      <div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <span className="concept-action">Ver ejemplo</span>
      </div>
    </button>
  )
}

function TopicBranch({ topic, onSelectConcept, selectedTitle }) {
  return (
    <section
      className={`topic-branch branch-${topic.position} ${topic.accent}`}
      aria-labelledby={`topic-${topic.id}`}
    >
      <div className="topic-node-wrap" id={`topic-${topic.id}`}>
        <TopicNode topic={topic} />
      </div>
      <div className="concept-list">
        {topic.items.map((item) => (
          <ConceptNode
            item={item}
            key={item.title}
            isActive={selectedTitle === item.title}
            onSelect={(selectedItem) => onSelectConcept(selectedItem, topic)}
          />
        ))}
      </div>
    </section>
  )
}

function ExampleCard({ selection, onClose }) {
  const Icon = selection.item.icon

  return (
    <aside className={`example-card ${selection.topic.accent}`} role="dialog" aria-modal="false" aria-labelledby="example-title">
      <button className="example-close" type="button" onClick={onClose} aria-label="Cerrar ejemplo">
        <X size={18} />
      </button>
      <div className="example-heading">
        <span className="example-icon"><Icon size={19} /></span>
        <div>
          <small>EJEMPLO PRÁCTICO · {selection.topic.title}</small>
          <h2 id="example-title">{selection.item.title}</h2>
        </div>
      </div>
      <p>{conceptExamples[selection.item.title]}</p>
    </aside>
  )
}

export default function App() {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const totalConcepts = topics.reduce((sum, topic) => sum + topic.items.length, 0)
  const topTopics = topics.filter((topic) => topic.position === 'top')
  const bottomTopics = topics.filter((topic) => topic.position === 'bottom')

  useEffect(() => {
    if (!selectedConcept) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedConcept(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedConcept])

  const selectConcept = (item, topic) => setSelectedConcept({ item, topic })

  return (
    <main className="app-shell">
      <div className="grain" aria-hidden="true" />

      <header className="page-header">
        <div>
          <p className="kicker">GESTIÓN DE SERVICIOS TI · MAPA VISUAL</p>
          <h1>ITIL en una sola vista</h1>
        </div>
        <div className="header-meta" aria-label="Resumen del mapa">
          <span>{topics.length} bloques</span>
          <span>{totalConcepts} conceptos</span>
        </div>
      </header>

      <section className="mindmap" aria-label="Mapa visual de temas ITIL">
        <div className="map-row row-top">
          {topTopics.map((topic) => (
            <TopicBranch
              topic={topic}
              key={topic.id}
              onSelectConcept={selectConcept}
              selectedTitle={selectedConcept?.item.title}
            />
          ))}
        </div>

        <div className="center-stage">
          <span className="map-bus bus-top" aria-hidden="true" />
          <div className="center-node">
            <span className="center-icon"><Network size={25} /></span>
            <div>
              <small>MAPA CENTRAL</small>
              <h2>Gestión de Servicios TI</h2>
              <p>Valor · Diseño · Seguridad · Transición</p>
            </div>
          </div>
          <span className="map-bus bus-bottom" aria-hidden="true" />
        </div>

        <div className="map-row row-bottom">
          {bottomTopics.map((topic) => (
            <TopicBranch
              topic={topic}
              key={topic.id}
              onSelectConcept={selectConcept}
              selectedTitle={selectedConcept?.item.title}
            />
          ))}
        </div>
      </section>

      <footer className="page-footer">
        <span>Selecciona un concepto para ver un ejemplo práctico.</span>
        <span>React + JSX</span>
      </footer>

      {selectedConcept && (
        <ExampleCard selection={selectedConcept} onClose={() => setSelectedConcept(null)} />
      )}
    </main>
  )
}
