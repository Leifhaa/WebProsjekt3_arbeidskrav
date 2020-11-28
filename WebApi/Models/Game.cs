using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace WebApi.Models{
    public class Game{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        /// <summary>
        /// Name of the game
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Desctiption about the game
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Price of the game
        /// </summary>
        public double Price { get; set; }
        /// <summary>
        /// Image name of the game
        /// </summary>
        public string Image { get; set; }
        /// <summary>
        /// Category of the game.
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        /// Ratings of the game by customers
        /// </summary>
        /// 
        public double Rating { get; set; }
        /// <summary>
        /// Number of games in stock in store
        /// </summary>
        public int Quantity { get; set; }
        /// <summary>
        /// Customer comments on the game.
        /// </summary>
        public IEnumerable<string> Comments { get; set; }

    }

}