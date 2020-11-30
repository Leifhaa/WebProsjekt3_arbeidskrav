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

        /// <summary>
        /// Retrieves character for a game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("games/{id:length(24)}")]
        public ActionResult<List<Character>> GetCharacters(string id)
        {
            var characters = _charactersService.getById(id);
            return characters;
        }


        /// <summary>
        /// Creates a new character for a game
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<Character> Post(Character character)
        {
            _charactersService.Create(character);
            return character;
        }


        /// <summary>
        /// Deletes a character
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var character = _charactersService.getById(id);

            if (character == null)
            {
                return NotFound();
            }

            _charactersService.Remove(id);
            return NoContent();
        }

    }
}