import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let _user_

export default class _user_DAO {
  static async injectDB(conn) {
    if (_user_) {
      return
    }
    try {
      _user_ = await conn.db("_user_").collection("_user_")
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
      return await _user_.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getReview(reviewId) {
    try {
      return await _user_.findOne({ _id: ObjectId(reviewId) })
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await _user_.updateOne(
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
      const deleteResponse = await _user_.deleteOne({
        _id: ObjectId(reviewId),
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  static async get_user_ByMovieId(movieId) {
    try {
      const cursor = await _user_.find({ movieId: parseInt(movieId) })
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

}