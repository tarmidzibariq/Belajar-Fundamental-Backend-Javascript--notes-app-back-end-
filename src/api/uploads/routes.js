const routes = (handler) => [
  {
    method: 'POST',
    path: '/uploads',
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
