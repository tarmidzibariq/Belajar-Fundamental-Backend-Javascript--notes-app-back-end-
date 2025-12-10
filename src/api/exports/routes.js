const routes = (handler) => [
    {
        method: 'GET',
        path: '/exports/notes',
        handler: handler.postExportNotesHandler,
        options: {
            auth: 'notesapp_jwt',
        },
    },
];

module.exports = routes;