using System.Text.Json.Serialization;

public class StatsDto
{
    [JsonPropertyName("societes")]
    public int Societes { get; set; }

    [JsonPropertyName("sites")]
    public int Sites { get; set; }

    [JsonPropertyName("villes")]
    public int Villes { get; set; }

    [JsonPropertyName("operateurs")]
    public int Operateurs { get; set; }

    [JsonPropertyName("produits")]
    public int Produits { get; set; }

    [JsonPropertyName("inventaires")]
    public int Inventaires { get; set; }
}