using MongoDB.Driver;
using WebApi.Models;
using System.Linq;
using System.Collections.Generic;

namespace WebApi.Services{
    public class GamesService{
        //A 'gateway' to the db
        private readonly IMongoCollection<Game> _games;

        public GamesService(IWebApiDatabaseSettings settings){
            //Connect to db
            var client = new MongoClient(settings.ConnectionString);
            
            //Connect to correct DB
            var database = client.GetDatabase( settings.DatabaseName);

            //Setup collection.
            _games = database.GetCollection<Game>(settings.GamesCollectionName);

        }

        //CRUD operations
        public List<Game> GetAll(){
            return _games.Find(game => true).ToList();
        }

        public Game FindById(string id){
            return _games.Find(game => game.id == id ).SingleOrDefault();
        }

        //Todo: Add remaining CRUD operations which is in part of PP presentation.
    }
}