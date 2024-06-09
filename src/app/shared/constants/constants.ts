import { Capacity } from "src/app/domain/models/capacity";
import { Technology, TechnologyBasic } from "src/app/domain/models/technology";

export enum  ValidationMessage {
  NAME_REQUIRED = 'El nombre es obligatorio',
  NAME_MAXLENGTH = 'El nombre debe ser menor a 50 caracteres',
  NAME_MINLENGTH = 'El nombre debe ser mayor a 2 caracteres',
  NAME_PATTERN = 'No debe contener números ni caracteres especiales distintos de # y +',
  DESCRIPTION_REQUIRED = 'La descripción es obligatoria',
  DESCRIPTION_MAXLENGTH = 'La descripción debe ser menor a 90 caracteres',
  DESCRIPTION_MINLENGTH = 'La descripción debe ser mayor a 10 caracteres',
  DESCRIPTION_PATTERN = 'No debe contener caracteres especiales distintos de # y +',
}

export enum ValidationMessageCapacity {
  NAME_REQUIRED = 'El nombre es obligatorio',
  NAME_MAXLENGTH = 'El nombre debe ser menor a 50 caracteres',
  NAME_MINLENGTH = 'El nombre debe ser mayor a 7 caracteres',
  NAME_PATTERN = 'No debe contener números ni caracteres especiales distintos de # y +',
  DESCRIPTION_REQUIRED = 'La descripción es obligatoria',
  DESCRIPTION_MAXLENGTH = 'La descripción debe ser menor a 90 caracteres',
  DESCRIPTION_MINLENGTH = 'La descripción debe ser mayor a 10 caracteres',
  VALIDATION_TECHNOLOGIES = 'El numero de tecnologías debe ser mayor 3 y menor a 20',
}

export enum Pattern{
  NAME = '^[A-Za-zñÑ+#\\s]+$',
  DESCRIPTION = '^[A-Za-z0-9+#\\sáéíóúÁÉÍÓÚñÑ]+$'
}

export type ModelsApi = Technology | Capacity;
export type ModelsApiSelect = TechnologyBasic;


type FormatResponse = {
  [key: number]: string
}

export const ResponseErrorMesages: FormatResponse = {
   400: 'Parámetros de solicitud no válidos',
   401: 'No estás autorizado para esta acción',
   403: 'No tienes permiso para acceder a este recurso',
   404: 'Recurso no encontrado',
   409: 'El elemento que desea registrar ya existe',
}

export enum Models {
  TECHNOLOGY = 'tecnología',
  CAPACITY = 'capacidad',
  BOOTCAMP = 'bootcamp'
}

export enum ResponseMessages  {
  CREATE_MODEL = "Crear {model}",
  SUSSESS_MODEL = "¡{model} creada!",
  INVALID_FORM = 'El formulario no es valido, por favor comprueba si hay errores',
}

export const StyleButton = {
  CREATE: {
    showIcon: true,
    icon: 'fa-solid fa-plus',
    text: 'Crear'
  },
  SUSSESS: {
    showIcon: false,
    text: 'Aceptar'
  }
}
