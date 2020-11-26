using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase {

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
            var game = _gamesService.FindById(id);
            return game;
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Put(string id,Game gameIn){
            var dbGame = _gamesService.FindById(gameIn.id);
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

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id){
            var game = _gamesService.FindById(id);

            if (game == null){
                return NotFound();
            }

            _gamesService.Remove(game.id);
            return NoContent();
        }

    }
}