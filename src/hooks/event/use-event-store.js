import { useDispatch, useSelector } from "react-redux";
import {updateSection,nextPage,previousPage,resetForm,} from "../../store";

export const useEventStore = () => {
    const dispatch = useDispatch();
    const { sections, currentPage } = useSelector((state) => state.events);
  // Función para actualizar los datos de una sección
    const updateEventSection = (id,sectionData) => {
        dispatch(updateSection({id,sectionData}));
    };
    const goToNextPage = () => {
        dispatch(nextPage());
    }
    const goToPreviousPage = () => {
        dispatch(previousPage());
    }
    const resetEventForm = () => {
        dispatch(resetForm());
    };
    const validateEventForm = () => {
        const currentSection = sections.find((section) => section.id === currentPage);
        if (currentPage === 0) {
          const { fullName, email, phone } = currentSection.data;
          if (!fullName || !email || !phone) {
            return { valid: false, message: 'Por favor completa todos los campos de contacto.' };
          }
        } else if (currentPage === 1) {
          const { eventCategory, eventType, attendeesCount, eventSchedule } = currentSection.data;
          if (!eventCategory || !eventType || attendeesCount <= 0 || !eventSchedule) {
            return { valid: false, message: 'Por favor completa todos los campos del evento.' };
          }
        } else if (currentPage === 2) {
          const { exactAddress, placeReference, placeType, placeCapacity } = currentSection.data;
          if (!exactAddress || !placeReference || !placeType || placeCapacity <= 0) {
            return { valid: false, message: 'Por favor completa todos los campos del lugar.' };
          }
        } else if (currentPage === 3) {
          const { foodService, foodDetails } = currentSection.data;
          if (foodService && !foodDetails) {
            return { valid: false, message: 'Por favor especifica los detalles del servicio de comida.' };
          }
        }
        return { valid: true };
    };


    return {
        //el obj
        sections,
        // acciones 
        currentPage,
        updateEventSection,
        goToNextPage,
        goToPreviousPage,
        resetEventForm,
        validateEventForm,
        };


}