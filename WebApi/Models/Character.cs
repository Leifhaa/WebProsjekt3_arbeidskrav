using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Models
{
    public class Character
    {
        /// <summary>
        /// Id of a comment
        /// </summary>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        /// <summary>
        /// Image of the character
        /// </summary>
        public string Image { get; set; }

        /// <summary>
        /// Name of the character
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The race of the character
        /// </summary>
        public string Race { get; set; }
        /// <summary>
        /// The gameId which the character belongs to
        /// </summary>
        public string GameId { get; set; }
    }
}