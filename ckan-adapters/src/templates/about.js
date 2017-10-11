const template = `
<h1 class="title">The Real Time Data Hub</h1>
      <h2 class="subtitle">Realtime- and IoT-ready data platform as a central hub for urban data</h2>
      <section>
        <article>
          <h2 class="title is-4">Background</h2>
          <p>
            Smart Cities will become more and more depended on sensors and IT-controlled actors for example for the monitoring of traffic flow, supervising environment data and intelligent street lights. Vast amounts of data will be generated, which need to be aggregated and evaluated. This data is a powerful and efficient tool to make cities more flexible and adaptable. Therefore the data needs to be easily accessible for people and companies. New business models, processes and services can be built on top of the data.
          </p>
        </article>
        <article>
          <h2 class="title is-4">Open Data Platforms</h2>
          <p>
            Europe has already established a rich landscape of Open Data. The OpenDataMonitor lists over 170 data catalogues and the European Data Portal makes over 600.000 datasets accessible. FOKUS is and was involved in a number of national and international Open Data platform projects, such as the European Data Portal, GovData.de and Policy Compass. Currently most Open Data platforms are based on the same methodology. They are just serving the metadata and linking the actual data. The data is mostly static content like Excel or PDF files.
          </p>
        </article>
        <article>
          <h2 class="title is-4">Real Time data Hub</h2>
          <p>
            Sensor data and an established Open Data infrastructure form the Real Time Data Hub. Based on existing Open Data, M2M and IoT technologies an extended data platform was developed and evaluated. The well-established open source solution CKAN is used as basis and coupled with the IoT-Middleware OpenMTC. The platform collects, aggregates and harmonizes data from sensors, which are distributed all over the city. This real time data is accessible via an API and web frontend to be used by services, processes and people. Existing platforms can be upgraded – e.g. the Open Data portal of the city of Berlin. The platform is a central hub for real time and IoT-capable data.
          </p>
        </article>
      </section>
      <section>
        <div class="column is-half-desktop is-9-tablet is-12-mobile">
          <!-- Contact Card -->
          <div class="card">
            <div class="card-header">
              <p class="card-header-title">
                Contact
              </p>
              <span class="card-header-icon">
                <i class="material-icons">person</i>
              </span>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4 has-text-left">Fabian Kirstein</p>
                  <p class="subtitle is-6">Software Developer</p>
                </div>
              </div>

              <div class="content">
                <p>Fraunhofer Institut für Offene Kommunikationssysteme</p>
                <p>Digital Public Services (DPS)</p>
              </div>
            </div>
            <div class="card-footer">
              <a class="card-footer-item">
                <i class="material-icons">phone</i>
              </a>
              <a class="card-footer-item">
                <i class="material-icons">mail</i>
              </a>
            </div>
          </div>
          <!-- !Contact Card -->
        </div>
      </section>
`;
export default template;
