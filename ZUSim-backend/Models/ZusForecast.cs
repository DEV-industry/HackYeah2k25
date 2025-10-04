using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ZUSimBackend.Models
{
    public class ZusForecast
    {
        [JsonPropertyName("inflation_forecast")]
        public Dictionary<string, double> InflationForecast { get; set; } = new();

        [JsonPropertyName("real_wage_growth")]
        public Dictionary<string, double> RealWageGrowth { get; set; } = new();

        [JsonPropertyName("gdp_growth")]
        public Dictionary<string, double> GdpGrowth { get; set; } = new();

        [JsonPropertyName("fund_balance")]
        public Dictionary<string, double> FundBalance { get; set; } = new();

        [JsonPropertyName("population_forecast")]
        public Dictionary<string, double> PopulationForecast { get; set; } = new();
    }
}