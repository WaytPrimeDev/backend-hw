export const errorSaveHandler = (error, _data, next) => {
  error.status = 400;
  next(error);
};

export const updateSettings = function (next) {
  this.setOptions({ new: true, runValidators: true });

  next();
};
