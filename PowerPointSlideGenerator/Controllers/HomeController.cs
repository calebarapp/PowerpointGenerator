using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PowerPointSlideGenerator.Models;
using System.Collections.Generic;

namespace PowerPointSlideGenerator.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // Gets images from the ImagesApiController service and returns to the AJAX Request.
        [HttpGet]
        public string GetImages(string Keywords) {
            ImagesApiController service = new ImagesApiController();
            string results = service.GetImages(Keywords);
            return results;
        }

        public void SlideContent(string name, string title, List<string> images)
        {
            Slide slide = new Slide(name, title, images);

        }

    }
}
