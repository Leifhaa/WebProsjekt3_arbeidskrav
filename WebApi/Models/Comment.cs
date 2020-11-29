using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Models
{
    public class Comment
    {
        /// <summary>
        /// Id of a comment
        /// </summary>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        /// <summary>
        /// Author of the comment
        /// </summary>
        public string Author { get; set; }
        /// <summary>
        /// The body of the comment
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// The game which comment was written for.
        /// </summary>
        public string GameId { get; set; }
    }
}