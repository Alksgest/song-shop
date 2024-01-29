import { useCallback, useEffect, useMemo, useState } from 'react';

export const useNotStrictPaginationApi = <T = unknown>(
	getData: (...params: any[]) => Promise<T[]>,
	elementsPerPage: number,
	isParamsRequired: boolean,
	params: unknown[],
	startPage: number = 1,
): [T[], number, (page: number) => void, boolean, boolean] => {
	const [currentPage, setCurrentPage] = useState(startPage);
	const [previousCurrentPage, setPreviousCurrentPage] = useState(startPage);

	const [nextPageData, setNextPageData] = useState<T[]>([]);
	const [prevPageData, setPrevPageData] = useState<T[]>([]);
	const [currentPageData, setCurrentPageData] = useState<T[]>([]);

	const hasPrev = useMemo(() => {
		return prevPageData?.length !== 0;
	}, [prevPageData.length]);

	const hasNext = useMemo(() => {
		return nextPageData?.length !== 0;
	}, [nextPageData]);

	const setPageFunc = useCallback(
		(page: number) => {
			if (page < 1) {
				return;
			}
			setCurrentPage(page);
			setPreviousCurrentPage(currentPage);
		},
		[currentPage],
	);

	/**
	 * Initial data load, when current and prevCurrent are equal
	 */
	useEffect(() => {
		if (isParamsRequired && !params) {
			return;
		}

		if (currentPage !== previousCurrentPage) {
			return;
		}

		getData(...[...params, { limit: elementsPerPage, page: currentPage }]).then((data) => {
			setCurrentPageData(data);
		});

		if(currentPage !== 1) {
			getData(...[...params, { limit: elementsPerPage, page: currentPage - 1 }]).then((data) => {
				setPrevPageData(data);
			});
		}

		getData(...[...params, { limit: elementsPerPage, page: currentPage + 1 }]).then((data) => {
			setNextPageData(data);
		});
	}, [currentPage, elementsPerPage, getData, isParamsRequired, params, previousCurrentPage]);

	/**
	 * Load next page data if step forward
	 */
	useEffect(() => {
		if (currentPage <= previousCurrentPage) {
			return;
		}

		setNextPageData([]);
		setCurrentPageData(nextPageData);
		setPrevPageData(currentPageData);

		getData(...[...params, { limit: elementsPerPage, page: currentPage + 1 }]).then((data) => {
			setNextPageData(data);
		});
	}, [currentPage, elementsPerPage, getData, params, previousCurrentPage]);

	/**
	 * Load prev page data if step backward
	 * In case if current page is 1 do not load zero page
	 */
	useEffect(() => {
		if (currentPage >= previousCurrentPage) {
			return;
		}

		setNextPageData(currentPageData);
		setCurrentPageData(prevPageData);

		if (currentPage === 1) {
			setPrevPageData([]);
		} else {
			getData(...[...params, { limit: elementsPerPage, page: currentPage - 1 }]).then((data) => {
				setPrevPageData(data);
			});
		}
	}, [currentPage, elementsPerPage, getData, isParamsRequired, params, previousCurrentPage]);

	return [currentPageData, currentPage, setPageFunc, hasNext, hasPrev];
};
