import React from "react";
import { MetaHeader } from "~~/components/MetaHeader";

const imprint = () => {
  return (
    <>
      <MetaHeader title="imprint - MantaCare" description="Imprint of MantaCare" />
      <div className="imprint-container p-16">
        <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>Imprint</h1>
        <p> </p>

        <h2>Information according to § 5 TMG</h2>
        <p>
          Max Mustermann
          <br />
          Musterweg 123
          <br />
          12345 Musterstadt
          <br />
          Deutschland
        </p>

        <h2>Contact</h2>
        <p>
          <br />
          E-Mail: info@mantacare.org
        </p>

        <h2>Responsible for the content according to § 55 Abs. 2 RStV</h2>
        <p>
          Max Mustermann
          <br />
          Address as above
        </p>

        <h3 style={{ fontWeight: "bold", fontSize: "24x" }}>Liability for content</h3>
        <p>
          The contents of our pages have been compiled with the utmost care. However, we cannot guarantee the accuracy,
          completeness completeness and topicality of the contents. As a service provider we are responsible according
          to § 7 Abs.1 TMG, we are responsible for our own content on these pages in accordance with the general laws.
          According to §§ 8 to 10 TMG However, as a service provider, we are not obliged to monitor transmitted or
          stored third-party information or to or to investigate circumstances that indicate illegal activity.
          Obligations to removal or blocking of the use of information in accordance with general legislation remain
          unaffected by this. However, liability in this respect is only possible from the time of knowledge of a
          specific infringement. possible. As soon as we become aware of such infringements, we will remove this content
          immediately.
        </p>

        <h3 style={{ fontWeight: "bold", fontSize: "24x" }}>Liability for links</h3>
        <p>
          Our website contains links to external third-party websites over whose content we have no influence. Therefore
          we cannot assume any liability for this external content. The respective provider or operator of the linked
          The respective provider or operator of the pages is always responsible for the content of the linked pages.
          The linked pages were checked for checked for possible legal violations at the time of linking. Illegal
          contents were not recognizable at the time time of linking. However, permanent monitoring of the content of
          the linked pages is not possible without specific evidence of an infringement. If we become aware of any legal
          infringements, we will remove such links immediately.
        </p>

        <h3 style={{ fontWeight: "bold", fontSize: "24x" }}>Copyright</h3>
        <p>
          The content and works created by the site operators on these pages are subject to German copyright law.
          copyright law. The duplication, processing, distribution and any kind of utilization outside the limits of
          copyright law require the of copyright law require the written consent of the respective author or creator.
          Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content
          on not created by the operator, the copyrights of third parties are respected. In particular third-party
          content is marked as such. Should you nevertheless become aware of a copyright infringement we request that
          you notify us accordingly. As soon as we become aware of any legal infringements, we will remove such content
          immediately.
        </p>

        <h3 style={{ fontWeight: "bold", fontSize: "24x" }}>Privacy policy</h3>
        <p>
          The use of our website is generally possible without providing personal data. As far as on our personal data
          (e.g. name, address or e-mail addresses) are collected on our website, this is done as far as possible, always
          on a voluntary basis. This data will not be passed on to third parties without your express passed on to third
          parties. We would like to point out that data transmission over the Internet (e.g. when communicating by by
          e-mail) can have security gaps. Complete protection of data against access by third parties is not possible.
          is not possible. The use of contact data published in the context of the imprint obligation by third parties
          for the sending of unsolicited advertising and information material is hereby expressly prohibited.
          contradicted. The operators of this website expressly reserve the right to take legal action in the event of
          the unsolicited sending of advertising information, such as spam e-mails.
        </p>
      </div>
    </>
  );
};

export default imprint;
