using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageUploadController : ControllerBase
    {
        //Lib for e.g helping the domains filepath's of our API.
        private readonly IWebHostEnvironment _hosting;

        private readonly GamesService _gameService;


        //Max img size
        private readonly long _imgSizeLimit = 3000000;

        public ImageUploadController(IWebHostEnvironment hosting, GamesService gameService)
        {
            _hosting = hosting;
            _gameService = gameService;
        }

        /// <summary>
        /// Uploads a image of a game. Returns the generated id
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("games")]
        public ActionResult<string> UploadGameImage(IFormFile file)
        {
            string imgId;
            if (IsSafe(file, out imgId))
            {
                string wwwrootPath = _hosting.WebRootPath;
                //Get the absolute path of a image file.
                string absolutePath = Path.Combine($"{wwwrootPath}/images/games/{imgId}");

                //use filestream to save the img
                using (var fs = new FileStream(absolutePath, FileMode.Create))
                {
                    file.CopyTo(fs);
                }
                return Ok(imgId);
            }
            return BadRequest();
        }

        /// <summary>
        /// Uploads a image of a game. Returns the generated id
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("characters/games/{id:length(24)}")]
        public ActionResult<string> UploadCharacterImage(string id,IFormFile file)
        {
            string imgId;
            if (IsSafe(file, out imgId))
            {
                //make sure user is uploading for a valid game
                if (_gameService.GetById(id) == null)
                {
                    return BadRequest();
                }
                //We know that user has given valid id now.


                string wwwrootPath = _hosting.WebRootPath;
                //Get the absolute path of a image file.
                string dirPath = Path.Combine($"{wwwrootPath}/images/characters/games/{id}");
                string imgPath = Path.Combine($"{dirPath}/{imgId}");

                if (!Directory.Exists(dirPath))
                {
                    //Create directory if doesn't exist
                    Directory.CreateDirectory(dirPath);
                }

                //use filestream to save the img
                using (var fs = new FileStream(imgPath, FileMode.Create))
                {
                    file.CopyTo(fs);
                }
                return Ok(imgId);
            }
            return BadRequest();
        }


        /// <summary>
        /// Checks if it's safe to save the file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="id">The generated id of the file</param>
        /// <returns>False if not safe</returns>
        public bool IsSafe(IFormFile file, out string id)
        {
            //1. Check that we recieved a img file
            List<string> permittedExtensions = new List<string>{".jpg", ".png"};
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(ext) || !permittedExtensions.Contains(ext))
            {
                // The extension is invalid ... discontinue processing the file
                id = null;
                return false;
            }
            //2. User should never be allowed to choose the name of the file. Create a name by it's id.
            id = Guid.NewGuid() + ".jpg"; ;

            //3. Make sure size is not to huge.
            if (file.Length > _imgSizeLimit)
            {
                return false;
            }

            return true;
        }
    }
}