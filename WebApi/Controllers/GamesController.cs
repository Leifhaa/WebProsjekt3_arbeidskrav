using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dto;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers{


    [ApiController]
    [Route("/api/[controller]")]
    public class GamesController : ControllerBase {

        /// <summary>
        /// A object to ensure atomic operations in rating.
        /// </summary>
        public static object RatingLock { get; set; } = new object();

        /// <summary>
        /// A lock to ensure atomic operations of ratings
        /// </summary>
        public static object QuantityLock { get; set; } = new object();



        private readonly GamesService _gamesService;
        private readonly CommentsService _commentsService;
        private readonly CharactersService _charactersService;

        public GamesController(GamesService gamesService, CommentsService commentsService, CharactersService charactersService){
            _gamesService = gamesService;
            _commentsService = commentsService;
            _charactersService = charactersService;
        }

        /// <summary>
        /// Retrieves all games.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<List<Game>> Get(){
            return _gamesService.GetAll();
        }


        /// <summary>
        /// Retrieves a game by it's id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public ActionResult<Game> GetGame(string id){
            var game = _gamesService.GetById(id);
            return game;
        }


        /// <summary>
        /// Creates or replaces a game
        /// </summary>
        /// <param name="id"></param>
        /// <param name="gameIn"></param>
        /// <returns></returns>
        [HttpPut("{id:length(24)}")]
        public IActionResult Put(string id,Game gameIn){
            var dbGame = _gamesService.GetById(id);
            if (dbGame == null){
                return NotFound();
            }

            _gamesService.Update(id, gameIn);
            return NoContent();
        }

        /// <summary>
        /// Creates a new game
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<Game> Post(Game game){
            _gamesService.Create(game);
            return game;
        }

        /// <summary>
        /// Rates a game
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("{id:length(24)}/rating")]
        public IActionResult Post(string id, GameRatingDto dto)
        {
            //Note: Lock should never be held for this long. As the rating should be atomic, I'm using lock it for simplicity.
            //A better alternative would be to use pessimistic or optimistic lock on db.
            lock (RatingLock)
            {
                var dbGame = _gamesService.GetById(id);
                if (dbGame == null)
                {
                    return NotFound();
                }

                dbGame.RatingSum += dto.Rating;
                dbGame.RatingCounter++;
                dbGame.RatingAvg = (double)dbGame.RatingSum / dbGame.RatingCounter;
                _gamesService.Update(dbGame.id,dbGame);
            }

            return Ok();
        }

        /// <summary>
        /// For purchasing a game (Ideally there would be a shop controller)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("{id:length(24)}/purchase")]
        public IActionResult Post(string id)
        {
            //Note: Lock should never be held for this long. As the rating should be atomic, I'm using lock it for simplicity.
            //A better alternative would be to use pessimistic or optimistic lock on db.
            lock (QuantityLock)
            {
                var dbGame = _gamesService.GetById(id);
                if (dbGame == null)
                {
                    return NotFound();
                }

                if (dbGame.Quantity < 1)
                {
                    return BadRequest();
                }

                dbGame.Quantity--;
                _gamesService.Update(dbGame.id, dbGame);
            }

            return Ok();
        }

        /// <summary>
        /// Deletes a game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id){
            var game = _gamesService.GetById(id);

            if (game == null){
                return NotFound();
            }

            //Cleanup characters and comments of game
            _commentsService.DeleteByGame(id);
            _charactersService.DeleteByGame(id);

            //Delete the game
            _gamesService.Remove(game.id);
            return NoContent();
        }

    }
}