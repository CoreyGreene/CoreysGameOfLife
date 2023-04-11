using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Text.Json;

namespace CoreysGameOfLife.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //[HttpPost]
        //[Route("NewMethod")]
        //public string NewMethod([FromBody] JObject data)
        //{
        //    return "test123";
        //}
        public class MyDataModel
        {
            public string stringData { get; set; }

        }

        [HttpPost]
        [Route("NewMethod")]
        public IActionResult MyMethod([FromBody] MyDataModel data)
        {
            // Do something with the data
            return Ok();
        }

        // [HttpPost]
        // [Route("NewMethod")]
        // public IActionResult NewMethod([FromBody] JObject data)
        // {
        //     // Your code to process the JSON data here
        //
        //     // Return a JSON response
        //     return Ok(new
        //     {
        //         message = "success",
        //         result = data
        //     }) ;
        // }

        //[HttpGet]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = Random.Shared.Next(-20, 55),
        //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
    }
}