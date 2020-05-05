const connection = require('../database/connections') 

module.exports = {
    async list(request, response){
        const ong_id = request.headers.authorization

        const incident = await connection('incident')
            .where('ong_id', ong_id)
            .select('*')

        return response.json(incident)
    }
}