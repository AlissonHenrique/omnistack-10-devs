const Dev = require('../models/Dev')
const parseStringArray = require('../Utils/ParseStringArray')
module.exports = {

  async index(req, res) {
    const { latitude, longitude } = req.query
    const techsArray = parseStringArray(techs)
    const dev = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000

        }
      }
    })
    return res.json({ devs: [latitude, longitude] })
  }
}