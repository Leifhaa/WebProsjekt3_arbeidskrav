using System.Collections.Generic;
using MongoDB.Driver;
using WebApi.Models;

namespace WebApi.Services
{
    public class CommentsService
    {
        //A 'gateway' to the db
        private readonly IMongoCollection<Comment> _comments;


        public CommentsService(IWebApiDatabaseSettings settings)
        {
            //Connect to db
            var client = new MongoClient(settings.ConnectionString);

            //Connect to correct DB
            var database = client.GetDatabase(settings.DatabaseName);

            //Setup collection.
            _comments = database.GetCollection<Comment>(settings.CommentsCollectionName);
        }

        /// <summary>
        /// Creates a comment for a game
        /// </summary>
        /// <param name="comment"></param>
        /// <returns></returns>
        public Comment Create(Comment comment)
        {
            _comments.InsertOne(comment);
            return comment;
        }

        /// <summary>
        /// Retrieves all comments for a game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Comment> GetAll(string id)
        {
            var comments = _comments.Find(c => c.Game_id == id).ToList();
            return comments;
        }
    }
}