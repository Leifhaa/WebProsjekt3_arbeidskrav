using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageUploadController : ControllerBase{

        //Lib for e.g helping the domains filepath's of our API.
        private readonly IWebHostEnvironment _hosting;

        public ImageUploadController(IWebHostEnvironment hosting){
            _hosting = hosting;
        }

        [HttpPost]
        [Route("[action]")]
        public void UploadImage(IFormFile file){
            string wwwrootPath = _hosting.WebRootPath;
            //Get the absolute path of a image file.
            string absolutePath = Path.Combine( $"{wwwrootPath}/images/{file.FileName}" );

            //use filestream to save the img
            using (var fs = new FileStream(absolutePath, FileMode.Create)){
                //Todo: Add security measurements (check slides)
                //which is: 1. Check that there's a img we've recieved (content type), 2. Never save file based on the user's decision. We create the names ourselfes (Guid.getGuid can generate random stirngs as img name)
                //3. Check file size. If too large, don't save?
                file.CopyTo(fs);
            }
        }        

    }
}