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

        /// <summary>
        /// Retrieves all games
        /// </summary>
        /// <returns></returns>
        public List<Game> GetAll(){
            return _games.Find(game => true).ToList();
        }

        /// <summary>
        /// Gets games by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public List<Game> GetByName(string name)
        {
            return _games.Find(game => game.Name.Contains(name)).ToList();
        }

        /// <summary>
        /// Gets game by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Game GetById(string id){
            return _games.Find(game => game.id == id ).SingleOrDefault();
        }

        /// <summary>
        /// Creates a new game
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        public Game Create(Game game){
            _games.InsertOne(game);
            return game;
        }

        /// <summary>
        /// Removes a game by id
        /// </summary>
        /// <param name="id"></param>
        public void Remove(string id){
            _games.DeleteOne(game => game.id == id);
        }

        /// <summary>
        /// Updates a game
        /// </summary>
        /// <param name="id"></param>
        /// <param name="game"></param>
        public void Update(string id,Game game){
            //User already declared id in the http request, so add it if it doesn't exist.
            if (game.id == null)
            {
                game.id = id;
            }
            _games.ReplaceOne(dbGame => dbGame.id == id, game);
        }
    }
}