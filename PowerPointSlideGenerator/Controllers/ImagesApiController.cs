using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using HSNXT.Unirest.Net;
using HSNXT.Unirest.Net.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PowerPointSlideGenerator.Models;
using HttpRequest = HSNXT.Unirest.Net.HttpRequest;

namespace PowerPointSlideGenerator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesApiController : ControllerBase
    {

        private string ApiKey = "4c077f935dmsh561fe54be2c0d5ap16df5ajsnc9876cbb6d35";
        private string ApiUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q={0}&pageNumber={1}&pageSize={2}&autoCorrect={3}&safeSearch={4}";
        private int pageNumber = 1;
        private int pageSize = 30;
        private bool autoCorrect = true;
        private bool safeSearch = false;

        public string GetImages(string keywords)
        {
            // Create webrequest and format url string using class props. Get the respone of the request.
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(string.Format(ApiUrl, keywords, pageNumber, pageSize, autoCorrect, safeSearch));
            request.Headers["X-RapidAPI-Key"] = ApiKey;
            WebResponse response = request.GetResponse();
            // get the response body and convert to JSON.
            Stream dataStream = response.GetResponseStream();
            StreamReader sr = new StreamReader(dataStream);
            return sr.ReadToEnd();
        }

    }
}