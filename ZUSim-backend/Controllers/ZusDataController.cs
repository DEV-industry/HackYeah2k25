using Microsoft.AspNetCore.Mvc;
using ZUSimBackend.Services;

namespace ZUSimBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ZusDataController : ControllerBase
    {
        private readonly ZusDataService _zusDataService;

        public ZusDataController(ZusDataService zusDataService)
        {
            _zusDataService = zusDataService;
        }

        [HttpGet("forecast")]
        public IActionResult GetForecast()
        {
            var data = _zusDataService.LoadData();
            return Ok(data);
        }
    }
}
