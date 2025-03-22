import "./Pagination.css";

//création d'une fontion pour creer un tableau de nombre en fonction un début et une fin
const range = (start, end) => {
  return [
    ...Array(end - start)
      .keys()
      .map((element) => {
        return element + start;
      }),
  ];
};

//création du composant PaginationItem
const PaginationItem = ({ page, currentPage, onPageChange, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      className={`page-item ${page === currentPage ? "active" : ""} `}
      onClick={() => {
        onPageChange(page);
      }}
    >
      {page}
    </button>
  );
};
// création d'un fonction qui coupe le nombre de pages visible --> pagesCutCount(le nombre de page visible que l'on souhaite)
const getPagesCut = ({ pagesCount, pagesCutCount, currentPage }) => {
  // nombre de page au dessus et en dessous
  const ceilling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);

  //création de condition
  // si le nombre de pages est inférieur au nombre de pages visible souhaiter alors on fait commencer notre tableau a 1 et finir au nombre de page + 1
  if (pagesCount < pagesCutCount) {
    return { start: 1, end: pagesCount + 1 };

    //condition pour le debut de pagination
  } else if (currentPage >= 1 && currentPage <= ceilling)
    return { start: 1, end: pagesCutCount + 1 };
  // condition pour la fin de pagination
  else if (currentPage + floor >= pagesCount) {
    return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
  }
  //condition pour le milieu de pagination
  else {
    return { start: currentPage - ceilling + 1, end: currentPage + floor + 1 };
  }
};

const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  // calculer le nombre de pages totales
  const pagesCount = Math.ceil(total / limit);

  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 10, currentPage });
  // // création d'un tableau de page afin de pourvoir réaliser un map sur ce tableau pour créer la liste de chaque page
  // const tabPages = range(1, pagesCount + 1);
  const tabPages = range(pagesCut.start, pagesCut.end);

  // Création de variables pour la désactivation des bouttons
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return (
    <div>
      <div className="pagination">
        <PaginationItem
          page={"Première Page"}
          currentPage={currentPage}
          onPageChange={() => {
            onPageChange(1);
          }}
          isDisabled={isFirstPage}
        />
        <PaginationItem
          page={"<"}
          currentPage={currentPage}
          onPageChange={() => {
            onPageChange(currentPage - 1);
          }}
          isDisabled={isFirstPage}
        />

        {tabPages.map((page) => {
          return (
            <PaginationItem
              key={page}
              page={page}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          );
        })}

        <PaginationItem
          page={">"}
          currentPage={currentPage}
          onPageChange={() => {
            onPageChange(currentPage + 1);
          }}
          isDisabled={isLastPage}
        />

        <PaginationItem
          page={"Dernière Page"}
          currentPage={currentPage}
          onPageChange={() => {
            onPageChange(pagesCount);
          }}
          isDisabled={isLastPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
