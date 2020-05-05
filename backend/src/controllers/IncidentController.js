const connection = require('../database/connections')

module.exports = {
    async create(request, response){
        const {title, description, value} = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({id})
    },

    async list(request, response){
        const {page = 1} = request.query

        const [count] = await connection('incident').count()

        const incidents = await connection('incident')
            .join('ongs', 'ongs.id', '=', 'incident.ong_id')
            .select(['incident.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
            .limit(5)
            .offset((page-1)*5)
        
        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents)
    },

    async delete(request, response){
        const {id} = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incident')
            .where('id', id)
            .select('ong_id')
            .first()

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted'})
        }

        await connection('incident').where('id', id).delete()

        return response.status(204).send()
    }
}