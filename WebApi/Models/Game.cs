using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace WebApi.Models{
    public class Game{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
    }

}