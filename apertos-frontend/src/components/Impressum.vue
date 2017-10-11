<template>
  <div class="impressum columns is-marginless">
    <article class="column is-offset-1 is-10 content">
      <h1 class="title">Impressum</h1>
      <section class="address--fokus">
        <p>Dieses Portal wird betrieben vom</p>
        <p>
          <span class="is-bold">Fraunhofer-Institut für Offene Kommunikationssysteme FOKUS</span><br>
          Kaiserin-Augusta-Allee 31<br>
          10589 Berlin<br>
          <a href="https://www.fokus.fraunhofer.de" target="_blank">www.fokus.fraunhofer.de</a>
        </p>
      </section>
      <hr>
      <section class="address--fraunhofer tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <div class="tile is-child is-12">
            <p>Fraunhofer FOKUS ist eine rechtlich nicht selbständige Einrichtung der</p>
          </div>
          <div class="tile">
            <div class="tile is-child">
              <p>
                <span class="is-bold">Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e. V.</span><br>
                Hansastraße 27 c, 80686 München<br>
                Telefon:+49(0) 89 1205 - 0<br>
                Fax: +49(0) 89 1205-7531<br>
                <a href="https://www.fraunhofer.de" target="_blank">www.fraunhofer.de</a>
              </p>
            </div>
            <div class="tile is-child">
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a<br>
                Umsatzsteuergesetz: DE 129515865<br>
              </p>
              <p>
                Registergericht<br>
                Amtsgericht München<br>
                Eingetragener Verein<br>
                Register-Nr. VR 4461<br>
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr>
      <section>
        <h2 class="title is-4">Verantwortliche Redaktion</h2>
        <address>
          Fabian Kirstein, fabian [dot] kirstein [at] fokus [dot] fraunhofer [dot] de
        </address>
      </section>
      <hr>
      <section>
        <h2 class="title is-4">Vorstand</h2>
        <p>
          Prof. Dr. Reimund Neugebauer, Präsident, Unternehmenspolitik und Forschung<br>
          Prof. (Univ. Stellenbosch) Dr. Alfred Gossner, Finanzen, Controlling (inkl. Betriebswirtschaft, Einkauf, Liegenschaften), IT<br>
          Prof. Dr. Alexander Kurz, Personal, Recht und Verwertung<br>
        </p>
      </section>
      <hr>
      <section>
        <h2 class="title is-4">Nutzungsrechte</h2>
        <span>
          <p>
            &copy; Fraunhofer-Gesellschaft
          </p>
          <p>
            Alle Rechte vorbehalten. Die Urheberrechte dieser Webseite liegen vollständig bei der Fraunhofer-Gesellschaft.</p>
          <p>
            Ein Download oder Ausdruck dieser Veröffentlichungen ist ausschließlich für den persönlichen Gebrauch gestattet. Alle darüber hinaus gehenden Verwendungen, insbesondere die kommerzielle Nutzung und Verbreitung, sind grundsätzlich nicht gestattet und bedürfen der schriftlichen Genehmigung. Anfragen richten Sie bitte an folgende Adresse:</p>
          <p>
            Fraunhofer-Institut für Offene Kommunikationssysteme FOKUS<br>
            Kaiserin-Augusta-Allee 31<br>
            10589 Berlin
          </p>
          <p>
            Ein Download oder Ausdruck ist darüber hinaus lediglich zum Zweck der Berichterstattung über die Fraunhofer-Gesellschaft und Ihrer Institute nach Maßgabe untenstehender Nutzungsbedingungen gestattet:
          </p>
          <p>
            Grafische Veränderungen an Bildmotiven - außer zum Freistellen des Hauptmotivs - sind nicht gestattet. Es ist stets die Quellenangabe und übersendung von zwei kostenlosen Belegexemplaren an die oben genannte Adresse erforderlich. Die Verwendung ist honorarfrei.
          </p>
        </span>
      </section>
      <hr>
      <section>
        <h2 class="is-title is-4">Haftungshinweis</h2>
        <p>
          Wir übernehmen keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
        <p>
          Wir sind bemüht, das Webangebot stets aktuell und inhaltlich richtig sowie vollständig anzubieten. Dennoch ist das Auftreten von Fehlern nicht völlig auszuschließen. Das Fraunhofer-Institut bzw. die Fraunhofer-Gesellschaft übernimmt keine Haftung für die Aktualität, die inhaltliche Richtigkeit sowie für die Vollständigkeit der in ihrem Webangebot eingestellten Informationen. Dies bezieht sich auf eventuelle Schäden materieller oder ideeller Art Dritter, die durch die Nutzung dieses Webangebotes verursacht wurden.
        </p>
        <p>
          Geschützte Marken und Namen, Bilder und Texte werden auf unseren Seiten in der Regel nicht als solche kenntlich gemacht. Das Fehlen einer solchen Kennzeichnung bedeutet jedoch nicht, dass es sich um einen freien Namen, ein freies Bild oder einen freien Text im Sinne des Markenzeichenrechts handelt.
        </p>
      </section>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'impressum',
    data() {
      return {};
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .impressum {
    padding: 1.5em 0 1.5em 0;
    .is-bold {
      font-weight: bold;
    }
    address {
      font-style: normal;
    }
    .address--fraunhofer {
      padding: 1em 0 0 0;
    }
  }
</style>
