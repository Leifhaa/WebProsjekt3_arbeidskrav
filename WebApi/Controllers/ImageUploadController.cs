using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageUploadController : ControllerBase
    {
        //Lib for e.g helping the domains filepath's of our API.
        private readonly IWebHostEnvironment _hosting;

        //Max img size (taken from the appsettings.json)
        private readonly long _imgSizeLimit = 3000000;

        public ImageUploadController(IWebHostEnvironment hosting)
        {
            _hosting = hosting;
        }

        [HttpPost]
        [Route("games")]
        public void UploadImage(IFormFile file)
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
            }
            
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
            id = Path.GetRandomFileName();

            //3. Make sure size is not to huge.
            if (file.Length > _imgSizeLimit)
            {
                return false;
            }

            return true;
        }
    }
}