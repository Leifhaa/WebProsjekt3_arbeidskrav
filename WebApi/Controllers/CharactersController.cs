using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CharactersController : ControllerBase
    {
        private readonly CharactersService _charactersService;

        public CharactersController(CharactersService charactersService)
        {
            _charactersService = charactersService;
        }

        [HttpGet]
        [Route("game/{id:length(24)}")]
        public ActionResult<List<Character>> GetComments(string id)
        {
            var game = _charactersService.getById(id);
            return game;
        }

    }
}