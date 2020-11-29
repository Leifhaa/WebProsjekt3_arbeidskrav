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


        private readonly GamesService _gamesService;

        public GamesController(GamesService gamesService){
            _gamesService = gamesService;
        }

        [HttpGet]
        public ActionResult<List<Game>> Get(){
            //Todo: Return status code
            //TOdo :Trycatching.

            return _gamesService.GetAll();
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Game> GetGame(string id){
            var game = _gamesService.GetById(id);
            return game;
        }



        [HttpPut("{id:length(24)}")]
        public IActionResult Put(string id,Game gameIn){
            var dbGame = _gamesService.GetById(gameIn.id);
            if (dbGame == null){
                return NotFound();
            }

            _gamesService.Update(id, gameIn);
            return NoContent();
        }

        [HttpPost]
        public ActionResult<Game> Post(Game game){
            _gamesService.Create(game);
            return game;
        }

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

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id){
            var game = _gamesService.GetById(id);

            if (game == null){
                return NotFound();
            }

            _gamesService.Remove(game.id);
            return NoContent();
        }

    }
}