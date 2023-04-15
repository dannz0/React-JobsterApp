import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((state) => state.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, i) => {
    return i + 1;
  });

  const nextPage = function () {
    let newPage = page + 1;

    if (newPage > numOfPages) {
      newPage = numOfPages;
    }

    dispatch(changePage(newPage));
  };

  const prevPage = function () {
    let newPage = page - 1;

    if (newPage < 1) {
      newPage = 1;
    }

    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      {page === 1 ? null : (
        <>
          <button type='button' className='prev-btn' onClick={prevPage}>
            <HiChevronDoubleLeft>prev</HiChevronDoubleLeft>
          </button>
        </>
      )}

      <div className='btn-container'>
        {pages.map((number) => {
          return (
            <button
              className={number === page ? 'pageBtn active' : 'pageBtn'}
              type='button'
              key={number}
              onClick={() => dispatch(changePage(number))}
            >
              {number}
            </button>
          );
        })}
      </div>
      {page === numOfPages ? null : (
        <>
          <button type='button' className='next-btn' onClick={nextPage}>
            <HiChevronDoubleRight>next</HiChevronDoubleRight>
          </button>
        </>
      )}
    </Wrapper>
  );
};
export default PageBtnContainer;
