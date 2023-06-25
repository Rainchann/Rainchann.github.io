import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let rt_chatting

export default class reviewsDAO {
  static async injectDB(conn) {
    if (rt_chatting) {
      return
    }
    try {
      rt_chatting = await conn.db("rt_chatting").collection("info")
      console.log("connecting to database...")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(username) {
    try {
      const reviewDoc = {
        username: username
      }
      console.log("adding")
      return await rt_chatting.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getReview(reviewId) {
    try {
      return await rt_chatting.findOne({ _id: ObjectId(reviewId) })
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await rt_chatting.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId) {

    try {
      const deleteResponse = await rt_chatting.deleteOne({
        _id: ObjectId(reviewId),
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  static async getrt_chattingByMovieId(movieId) {
    try {
      const cursor = await rt_chatting.find({ movieId: parseInt(movieId) })
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

}