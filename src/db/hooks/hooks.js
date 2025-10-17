export const errorSaveHandler = (error, _data, next) => {
  const { code, name } = error;

  error.status = code === 11000 && name === 'MongoServerError' ? 409 : 400;
  next(error);
};

export const updateSettings = function (next) {
  this.setOptions({ new: true, runValidators: true });

  next();
};
