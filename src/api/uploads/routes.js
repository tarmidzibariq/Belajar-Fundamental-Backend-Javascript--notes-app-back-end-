const routes = (handler) => [
  {
    method: 'POST',
    path: '/uploads/images',
    hander: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
];

module.exports = routes;
