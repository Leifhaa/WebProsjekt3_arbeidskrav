using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CommentsController : ControllerBase
    {

        private readonly CommentsService _commentsService;

        public CommentsController(CommentsService commentsService)
        {
            _commentsService = commentsService;
        }

        [HttpGet]
        [Route("game/{id:length(24)}")]
        public ActionResult<List<Comment>> GetComments(string id)
        {
            var game = _commentsService.GetAll(id);
            return game;
        }

        [HttpPost]
        [Route("game/{id:length(24)}")]
        public IActionResult Post(string id, Comment comment)
        {
            _commentsService.Create(comment);
            return Ok();
        }

    }
}