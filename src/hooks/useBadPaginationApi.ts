import { useCallback, useEffect, useMemo, useState } from 'react';

export const useBadPaginationApi = <T = unknown>(
	getData: (...params: any[]) => Promise<T[]>,
	elementsPerPage: number,
	other: unknown[],
	isParamsRequired = false,
): [T[], number, (page: number) => void, boolean, boolean] => {
	const [currentPage, setCurrentPage] = useState(1);
	const [previousCurrentPage, setPreviousCurrentPage] = useState(1);

	const [nextPageData, setNextPageData] = useState<T[]>([]);
	const [prevPageData, setPrevPageData] = useState<T[]>([]);
	const [currentPageData, setCurrentPageData] = useState<T[]>([]);

	const hasPrev = useMemo(() => {
		return prevPageData.length !== 0;
	}, [prevPageData.length]);

	const hasNext = useMemo(() => {
		return nextPageData.length !== 0;
	}, [nextPageData]);

	const setPageFunc = useCallback(
		(page: number) => {
			setCurrentPage(page);
			setPreviousCurrentPage(currentPage);
		},
		[currentPage],
	);

	useEffect(() => {
		if (isParamsRequired && !other) {
			return;
		}

		if (currentPage === previousCurrentPage) {
			getData(...[...other, { limit: elementsPerPage, page: currentPage }]).then((data) => {
				setCurrentPageData(data);
			});

			getData(...[...other, { limit: elementsPerPage, page: currentPage - 1 }]).then((data) => {
				setPrevPageData(data);
			});

			getData(...[...other, { limit: elementsPerPage, page: currentPage + 1 }]).then((data) => {
				setNextPageData(data);
			});
		}

		if (currentPage > previousCurrentPage) {
			setPrevPageData(currentPageData);
			setCurrentPageData(nextPageData);

			getData(...[...other, { limit: elementsPerPage, page: currentPage + 1 }]).then((data) => {
				setNextPageData(data);
			});
		}

		if (currentPage < previousCurrentPage) {
			setNextPageData(currentPageData);
			setCurrentPageData(prevPageData);

			getData(...[...other, { limit: elementsPerPage, page: currentPage - 1 }]).then((data) => {
				setPrevPageData(data);
			});
		}
	}, [currentPage, elementsPerPage, getData, isParamsRequired, other, previousCurrentPage]);

	return [currentPageData, currentPage, setPageFunc, hasNext, hasPrev];
};
