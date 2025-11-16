import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { PaginationButton } from '../PaginationButton/PaginationButton'
interface PaginationProps {
  currentPage: number
  totalPages: number
  search: (page: number) => Record<string, unknown>
}
export default function Pagination({
  currentPage,
  totalPages,
  search,
}: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 1
    const range = []

    range.push(1);

    const start = Math.max(2, currentPage - delta)
    const end = Math.min(totalPages - 1, currentPage + delta)

    if (currentPage - delta > 2) {
      range.push('...') // Add '...' if there's a gap
    }

    for (let i = start; i <= end; i++) {
      range.push(i)
    }

    if (currentPage + delta < totalPages - 1) {
      range.push('...') // Add '...' if there's a gap
    }

    if (totalPages > 1) {
      range.push(totalPages); // Always show last page
    }

    return range
  }

  const pageNumbers = getPageNumbers()

  return <nav className="flex items-center justify-center gap-2 mt-5 ">
    <PaginationButton search={search(currentPage - 1 || 1)} isDisabled={currentPage === 1}>
      < IconArrowLeft />
    </PaginationButton>

    {pageNumbers.map((page, index) =>
      page === "..." ? (
        <span key={index} className="flex items-center justify-center size-9 text-gray-500">
          ...
        </span>
      ) : (
        <PaginationButton key={index} search={search(Number(page))} isActive={currentPage === page}>
          {page}
        </PaginationButton>
      ),
    )}

    <PaginationButton search={search(currentPage + 1)} isDisabled={currentPage === totalPages}>
      < IconArrowRight />
    </PaginationButton>
  </nav>
}
