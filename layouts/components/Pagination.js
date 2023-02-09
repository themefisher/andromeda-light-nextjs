import Link from "next/link";
import React from "react";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

const Pagination = ({ section, currentPage, totalPages }) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="mb-4 flex justify-center space-x-1"
          aria-label="Pagination"
        >
          {/* previous */}
          {hasPrevPage ? (
            <Link
              href={
                indexPageLink
                  ? `${section ? "/" + section : "/"}`
                  : `${section ? "/" + section : ""}/page/${currentPage - 1}`
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body"
            >
              <TfiAngleLeft />
            </Link>
          ) : (
            <span
              className={`${
                !hasPrevPage && "opacity-0"
              } inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body`}
            >
              <TfiAngleLeft />
            </span>
          )}

          {/* page index */}
          {pageList.map((pagination, i) => (
            <React.Fragment key={`page-${i}`}>
              {pagination === currentPage ? (
                <span
                  aria-current="page"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-white`}
                >
                  {pagination}
                </span>
              ) : (
                <Link
                  href={
                    i === 0
                      ? `${section ? "/" + section : "/"}`
                      : `${section ? "/" + section : ""}/page/${pagination}`
                  }
                  passHref
                  aria-current="page"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-md px-4 py-2 font-medium text-primary hover:bg-primary hover:text-body`}
                >
                  {pagination}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          {hasNextPage ? (
            <Link
              href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body"
            >
              <TfiAngleRight />
            </Link>
          ) : (
            <span
              className={`${
                !hasNextPage && "opacity-0"
              } inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body`}
            >
              <TfiAngleRight />
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
