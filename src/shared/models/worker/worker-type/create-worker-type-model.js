export const createWorkerTypeModel = (workerType) => ({
  name: workerType.name,
  description: workerType.description,
  status: workerType.status || 'Activo',
});