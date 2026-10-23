const AgenceTable = () => {
  return (
    <>
      <div>
        <div className="flex gap-[8%] leading-6.25 mb-[16%]">
          <div className="w-[30%]">
            <p>Expertise</p>
          </div>

          <div className="w-[30%]">
            <ul className="flex flex-col">
              <li>Stratégie</li>
              <li>Publicité</li>
              <li>Branding</li>
              <li>Design </li>
              <li>Contenu </li>
            </ul>
          </div>
        </div>

        <div className="flex leading-6.25">
          <div className="w-4/12">
            <p className="w-full">
              Nos projets_ naissent dans l’humilité, grandissent dans la
              curiosité et vivent grâce à la créativité sous toutes ses formes.
            </p>
          </div>

          <div className="w-[39%] pl-12">
            <p className="w-full">
              Notre création_ bouillonne dans un environnement où le talent a le
              goût d’exploser. Où on se sent libre d’être la meilleure version
              de soi-même.
            </p>
          </div>

          <div className="w-[28%] pl-10">
            <p className="w-full">
              Notre culture_ c’est l’ouverture aux autres. Point. Tout
              l’équipage participe à bâtir une agence dont on est fiers.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgenceTable;
