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


        //Todo: REname to 'GetById'
        public Game FindById(string id){
            return _games.Find(game => game.id == id ).SingleOrDefault();
        }

        public Game Create(Game game){
            _games.InsertOne(game);
            return game;
        }

        public void Remove(string id){
            _games.DeleteOne(game => game.id == id);
        }

        public void Update(string id,Game game){
            _games.ReplaceOne(dbGame => dbGame.id == game.id, game);
        }
    }
}