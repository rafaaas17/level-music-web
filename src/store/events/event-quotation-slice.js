import {createSlice} from '@reduxjs/toolkit';
import { sections } from '../../shared/constants/custom/nav-sections';

export const eventQuotationSlice = createSlice({
    name: 'eventQuotation',
    initialState: {
      sections: [
        {
          id: 0, // Identificador de la sección
          data: {
            fullName: '',
            email: '',
            phone: '',
          },
        },
        {
          id: 1,
          data: {
            eventCategory: '',
            eventType: '',
            attendeesCount: 0,
            eventSchedule: '',
            eventDescription: '',
          },
        },
        {
          id: 2,
          data: {
            exactAddress: '',
            placeReference: '',
            placeType: '',
            placeCapacity: '',
          },
        },
        {
          id: 3,
          data: {
            foodService: false,
            foodDetails: '',
            additionalServices: '',
          },
        },
      ],
      currentPage: 0, 
        
    },
    reducers: {
        // Reducer para actualizar los datos de cada sección
        updateSection: (state, { payload }) => {
          const { id, data } = payload;
          const sectionIndex = state.sections.findIndex((section) => section.id === id); // Encuentra el índice de la sección
          if (sectionIndex !== -1) {
            // Crea una copia del estado para garantizar la inmutabilidad
            state.sections[sectionIndex] = {
              ...state.sections[sectionIndex],
              data: {
                ...state.sections[sectionIndex].data,
                ...data, // Actualiza los datos de la sección
              },
            };
            console.log('Estado actualizado:', state.sections[sectionIndex]);
          } else {
            console.error(`No se encontró la sección con id: ${id}`);
          }
        },
        // Reducer para avanzar a la siguiente página
        nextPage: (state) => {
          if (state.currentPage < state.sections.length - 1) {
            state.currentPage += 1;
          }
        },
        // Reducer para retroceder a la página anterior
        previousPage: (state) => {
          if (state.currentPage < state.sections.length - 1) {
            state.currentPage += 1;
          }
        },
        // Reducer para reiniciar el formulario
        resetForm: (state) => {
          state.sections.forEach((section) => {
            Object.keys(section.data).forEach((key) => {
              section.data[key] = typeof section.data[key] === 'boolean' ? false : '';
            });
          });
          state.currentPage = 0;
        },
      },


});

export const { updateSection, nextPage, previousPage, resetForm } = eventQuotationSlice.actions;