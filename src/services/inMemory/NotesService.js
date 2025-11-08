const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { Pool } = require('pg');
const { mapDBToModel } = require('../../utils');


class NotesService {
    constructor() {
        this._pool = new Pool();
    }

    async addNote({ title,  body, tags }) 
    {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO notes VALUES( $1, $2, $3, $4, $5, $6 ) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt]
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return result.rows[0].id;

        // const newNote = {
        //   title,
        //   body,
        //   tags,
        //   id,
        //   createdAt,
        //   updatedAt,
        // };

        // this._notes.push(newNote);

        // const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

        // if (!isSuccess) {
        //   throw new InvariantError('Catatan gagal ditambahkan');
        // }

        // return id;
    }

    async getNotes() {
        const result = await this._pool.query('SELECT * FROM notes');
        return result.rows.map(mapDBToModel);
    }

    async getNoteById(id) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }

        return result.rows.map(mapDBToModel)[0];
        // const note = this._notes.filter((n) => n.id === id)[0];

        // if (!note) {
        //     throw new NotFoundError('Catatan tidak ditemukan');
        // }
        // return note;
    }

    async editNoteById(id, { title, body, tags }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
            values : [title, body, tags, updatedAt, id],
        };
        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }
        // const index = this._notes.findIndex((note) => note.id === id);

        // if (index === -1) {
        //     throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        // }

        // const updatedAt = new Date().toISOString();

        // this._notes[index] = {
        //     ...this._notes[index],
        //     title,
        //     body,
        //     tags,
        //     updatedAt,
        // };
    }

    async deleteNoteById(id) {
        const query = {
            text: ' DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
        // const index = this._notes.findIndex((note) => note.id === id);

        // if (index === -1) {
        //     throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        // }

        // this._notes.splice(index, 1);
    }
}

module.exports = NotesService;