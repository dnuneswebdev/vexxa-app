/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCallback, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
}

export function PaginationComponent({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  siblingsCount = 1,
}: PaginationComponentProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Generate page numbers array based on current page and siblings count
  const generatePaginationItems = useCallback(() => {
    // Always show first page, last page, current page, and siblings
    const items: (number | "ellipsis")[] = [];

    // Add first page
    items.push(1);

    // Calculate range for siblings
    const leftSibling = Math.max(2, currentPage - siblingsCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingsCount);

    // Add ellipsis if needed before current page range
    if (leftSibling > 2) {
      items.push("ellipsis");
    }

    // Add pages between left and right siblings
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        // Skip first and last page as they're always added
        items.push(i);
      }
    }

    // Add ellipsis if needed after current page range
    if (rightSibling < totalPages - 1) {
      items.push("ellipsis");
    }

    // Add last page if not already added
    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  }, [currentPage, totalPages, siblingsCount]);

  const paginationItems = useMemo(
    () => generatePaginationItems(),
    [generatePaginationItems]
  );

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {/* <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem> */}

        {paginationItems.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={currentPage === item}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(item as number);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          >
            teste
          </PaginationNext>
        </PaginationItem> */}
      </PaginationContent>
    </Pagination>
  );
}
