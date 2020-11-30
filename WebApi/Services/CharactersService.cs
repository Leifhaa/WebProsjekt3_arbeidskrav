using System.Collections.Generic;
using MongoDB.Driver;
using WebApi.Models;

namespace WebApi.Services
{
    public class CharactersService
    {
        //A 'gateway' to the db
        private readonly IMongoCollection<Character> _characters;


        public CharactersService(IWebApiDatabaseSettings settings)
        {
            //Connect to db
            var client = new MongoClient(settings.ConnectionString);

            //Connect to correct DB
            var database = client.GetDatabase(settings.DatabaseName);

            //Setup collection.
            _characters = database.GetCollection<Character>(settings.CharactersCollectionName);
        }

        /// <summary>
        /// Retrieves all comments for a game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Character> getById(string id)
        {
            var characters = _characters.Find(c => c.GameId == id).ToList();
            return characters;
        }


        public Character Create(Character character)
        {
            _characters.InsertOne(character);
            return character;
        }

        public void Remove(object id)
        {
            _characters.DeleteOne(game => game.id == id);
        }
    }
}