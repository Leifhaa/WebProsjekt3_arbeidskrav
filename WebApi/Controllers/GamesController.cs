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

    }
}