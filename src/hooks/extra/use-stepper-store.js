import { useDispatch, useSelector } from 'react-redux';
import { nextPage, previousPage, goToPage } from '../../store';

export const useStepperStore = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(s => s.stepper.currentPage);

  return {
    currentPage,
    goToNextPage: () => dispatch(nextPage()),
    goToPreviousPage: () => dispatch(previousPage()),
    goToPage: idx => dispatch(goToPage(idx))
  };
};
