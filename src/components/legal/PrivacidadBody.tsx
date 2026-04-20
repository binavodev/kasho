export function PrivacidadBody(): React.ReactElement {
  return (
    <>
      <p className="mb-4 font-heading text-[13px] font-semibold uppercase tracking-widest text-kasho-green">
        Legal
      </p>
      <h1>Política de Privacidad</h1>
      <p className="kasho-meta">Última actualización: abril de 2026 · kashoai.com</p>

      <div className="kasho-highlight">
        <p>
          En Kasho cuidamos tu información con la misma seriedad con la que
          cuidas tu negocio. Esta política explica qué datos recopilamos, para
          qué los usamos y cómo los protegemos.
        </p>
      </div>

      <h2>1. ¿Quién es responsable de tus datos?</h2>
      <p>
        Kasho SAS, empresa colombiana, es la responsable del tratamiento de los
        datos personales recopilados a través de kashoai.com y de la plataforma
        Kasho. Puedes contactarnos en{" "}
        <a href="mailto:hola@kashoai.com">hola@kashoai.com</a> para cualquier
        asunto relacionado con tu privacidad.
      </p>

      <hr className="kasho-divider" />

      <h2>2. Qué información recopilamos</h2>
      <p>Recopilamos únicamente la información necesaria para prestarte el servicio:</p>

      <table className="kasho-table">
        <thead>
          <tr>
            <th>Tipo de dato</th>
            <th>Ejemplos</th>
            <th>Para qué lo usamos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Datos de cuenta</strong>
            </td>
            <td>Nombre, correo electrónico, nombre del negocio</td>
            <td>Crear y gestionar tu cuenta</td>
          </tr>
          <tr>
            <td>
              <strong>Datos de uso</strong>
            </td>
            <td>Conversaciones atendidas, métricas de respuesta</td>
            <td>Mostrarte resultados en el panel</td>
          </tr>
          <tr>
            <td>
              <strong>Datos de pago</strong>
            </td>
            <td>Información de facturación (no almacenamos datos de tarjetas)</td>
            <td>Procesar tu suscripción</td>
          </tr>
          <tr>
            <td>
              <strong>Contenido de negocio</strong>
            </td>
            <td>Catálogos, precios, textos que subas a Kasho</td>
            <td>Entrenar tu asistente personalizado</td>
          </tr>
          <tr>
            <td>
              <strong>Datos técnicos</strong>
            </td>
            <td>IP, tipo de navegador, dispositivo</td>
            <td>Seguridad y mejora del servicio</td>
          </tr>
        </tbody>
      </table>

      <hr className="kasho-divider" />

      <h2>3. Cómo usamos tu información</h2>
      <p>Usamos tus datos para:</p>
      <ul>
        <li>Prestarte el servicio de Kasho y personalizarlo según tu negocio.</li>
        <li>
          Enviarte reportes de resultados y notificaciones relevantes sobre tu
          cuenta.
        </li>
        <li>Mejorar la plataforma con base en el uso agregado y anonimizado.</li>
        <li>Cumplir con obligaciones legales y fiscales en Colombia.</li>
        <li>Responderte cuando nos escribes con dudas o solicitudes.</li>
      </ul>
      <p>
        No usamos tus datos para publicidad de terceros, ni los vendemos a
        nadie.
      </p>

      <hr className="kasho-divider" />

      <h2>4. Bases legales del tratamiento</h2>
      <p>
        Tratamos tus datos con base en la Ley 1581 de 2012 (Colombia) y sus
        decretos reglamentarios, en particular bajo las siguientes bases:
      </p>
      <ul>
        <li>
          <strong>Ejecución del contrato:</strong> para prestarte el servicio
          que contrataste.
        </li>
        <li>
          <strong>Consentimiento:</strong> para comunicaciones de marketing, si
          lo autorizaste.
        </li>
        <li>
          <strong>Obligación legal:</strong> cuando la ley colombiana nos lo
          exige.
        </li>
      </ul>

      <hr className="kasho-divider" />

      <h2>5. Con quién compartimos tus datos</h2>
      <p>
        Solo compartimos información con proveedores que nos ayudan a prestar el
        servicio, bajo acuerdos de confidencialidad:
      </p>
      <ul>
        <li>Plataformas de pago (para procesar tu suscripción).</li>
        <li>
          Proveedores de infraestructura en la nube (para alojar el servicio de
          forma segura).
        </li>
        <li>Herramientas de análisis internas (con datos anonimizados).</li>
      </ul>
      <p>
        Nunca vendemos ni alquilamos tu información a terceros con fines
        comerciales.
      </p>

      <hr className="kasho-divider" />

      <h2>6. Cuánto tiempo guardamos tus datos</h2>
      <p>
        Conservamos tus datos mientras tu cuenta esté activa. Si cancelas tu
        suscripción, eliminamos tu información dentro de los 90 días
        siguientes, salvo que la ley colombiana nos obligue a conservarla por
        más tiempo.
      </p>
      <p>
        Puedes solicitar la eliminación anticipada de tus datos escribiéndonos
        a <a href="mailto:hola@kashoai.com">hola@kashoai.com</a>.
      </p>

      <hr className="kasho-divider" />

      <h2>7. Tus derechos</h2>
      <p>De acuerdo con la Ley 1581 de 2012, tienes derecho a:</p>
      <ul>
        <li>Conocer qué datos tuyos tenemos y para qué los usamos.</li>
        <li>Pedir que corrijamos datos incorrectos o desactualizados.</li>
        <li>Solicitar que eliminemos tu información.</li>
        <li>Revocar el consentimiento que nos hayas dado.</li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio
          (SIC).
        </li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, escríbenos a{" "}
        <a href="mailto:hola@kashoai.com">hola@kashoai.com</a>. Respondemos en
        máximo 10 días hábiles.
      </p>

      <hr className="kasho-divider" />

      <h2>8. Seguridad</h2>
      <p>
        Usamos cifrado en tránsito (TLS) y en reposo para proteger tu
        información. Nuestros sistemas tienen controles de acceso y monitoreo
        continuo. Ningún sistema es 100% infalible, pero hacemos todo lo que está
        en nuestra mano para proteger tus datos.
      </p>

      <hr className="kasho-divider" />

      <h2>9. Cookies</h2>
      <p>
        Usamos cookies técnicas necesarias para el funcionamiento del servicio
        (sesión, preferencias). No usamos cookies de seguimiento de terceros con
        fines publicitarios.
      </p>
      <p>
        Puedes configurar tu navegador para rechazar cookies, aunque esto puede
        afectar algunas funciones de la plataforma.
      </p>

      <hr className="kasho-divider" />

      <h2>10. Cambios a esta política</h2>
      <p>
        Si modificamos esta política, te avisaremos por correo electrónico con al
        menos 15 días de anticipación si los cambios son relevantes. La versión
        vigente siempre estará disponible en kashoai.com.
      </p>

      <hr className="kasho-divider" />

      <h2>11. Contacto</h2>
      <p>Para cualquier pregunta sobre el manejo de tu información personal:</p>
      <ul>
        <li>
          Correo: <a href="mailto:hola@kashoai.com">hola@kashoai.com</a>
        </li>
        <li>
          Sitio web: <a href="https://kashoai.com">kashoai.com</a>
        </li>
      </ul>
    </>
  );
}
