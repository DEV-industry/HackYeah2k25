using System.Text.Json;
using ZUSimBackend.Models;

namespace ZUSimBackend.Services
{
    public class ZusDataService
    {
        private readonly IWebHostEnvironment _env;

        public ZusDataService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public ZusForecast LoadData()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Data", "ZusForecast.json");

            var json = File.ReadAllText(filePath);

            var data = JsonSerializer.Deserialize<ZusForecast>(json);

            return data ?? new ZusForecast();
        }
    }
}