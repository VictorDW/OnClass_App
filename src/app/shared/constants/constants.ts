
export enum  ValidationMessage {
  NAME_REQUIRED = 'El nombre es obligatorio',
  NAME_MAXLENGTH = 'El nombre debe ser menor a 50 caracteres',
  NAME_MINLENGTH = 'El nombre debe ser mayor a 3 caracteres',
  NAME_PATTERN = 'No debe contener numeros ni caracteres especiales distintos de # y +',
  DESCRIPTION_REQUIRED = 'La descripción es obligatoria',
  DESCRIPTION_MAXLENGTH = 'La descripción debe ser menor a 90 caracteres',
  DESCRIPTION_MINLENGTH = 'La descripción debe ser mayor a 10 caracteres',
  DESCRIPTION_PATTERN = 'No debe contener caracteres especiales distintos de # y +'
}



export enum Pattern{
  NAME = '^[A-Za-z+#\\s]+$',
  DESCRIPTION = '^[A-Za-z0-9+#\\sáéíóúÁÉÍÓÚñÑ]+$'
}
