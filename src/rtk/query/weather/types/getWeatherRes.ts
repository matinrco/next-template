export type GetWeatherRes = {
    current_condition: CurrentCondition[];
    nearest_area: NearestArea[];
    request: Request[];
    weather: Weather[];
};

type CurrentCondition = {
    FeelsLikeC: string;
    FeelsLikeF: string;
    cloudcover: string;
    humidity: string;
    localObsDateTime: string;
    observation_time: string;
    precipInches: string;
    precipMM: string;
    pressure: string;
    pressureInches: string;
    temp_C: string;
    temp_F: string;
    uvIndex: string;
    visibility: string;
    visibilityMiles: string;
    weatherCode: string;
    weatherDesc: WeatherDesc[];
    weatherIconUrl: WeatherIconUrl[];
    winddir16Point: string;
    winddirDegree: string;
    windspeedKmph: string;
    windspeedMiles: string;
};

type WeatherDesc = {
    value: string;
};

type WeatherIconUrl = {
    value: string;
};

type NearestArea = {
    areaName: AreaName[];
    country: Country[];
    latitude: string;
    longitude: string;
    population: string;
    region: Region[];
    weatherUrl: WeatherUrl[];
};

type AreaName = {
    value: string;
};

type Country = {
    value: string;
};

type Region = {
    value: string;
};

type WeatherUrl = {
    value: string;
};

type Request = {
    query: string;
    type: string;
};

type Weather = {
    astronomy: Astronomy[];
    avgtempC: string;
    avgtempF: string;
    date: string;
    hourly: Hourly[];
    maxtempC: string;
    maxtempF: string;
    mintempC: string;
    mintempF: string;
    sunHour: string;
    totalSnow_cm: string;
    uvIndex: string;
};

type Astronomy = {
    moon_illumination: string;
    moon_phase: string;
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
};

type Hourly = {
    DewPointC: string;
    DewPointF: string;
    FeelsLikeC: string;
    FeelsLikeF: string;
    HeatIndexC: string;
    HeatIndexF: string;
    WindChillC: string;
    WindChillF: string;
    WindGustKmph: string;
    WindGustMiles: string;
    chanceoffog: string;
    chanceoffrost: string;
    chanceofhightemp: string;
    chanceofovercast: string;
    chanceofrain: string;
    chanceofremdry: string;
    chanceofsnow: string;
    chanceofsunshine: string;
    chanceofthunder: string;
    chanceofwindy: string;
    cloudcover: string;
    humidity: string;
    precipInches: string;
    precipMM: string;
    pressure: string;
    pressureInches: string;
    tempC: string;
    tempF: string;
    time: string;
    uvIndex: string;
    visibility: string;
    visibilityMiles: string;
    weatherCode: string;
    weatherDesc: WeatherDesc2[];
    weatherIconUrl: WeatherIconUrl2[];
    winddir16Point: string;
    winddirDegree: string;
    windspeedKmph: string;
    windspeedMiles: string;
};

type WeatherDesc2 = {
    value: string;
};

type WeatherIconUrl2 = {
    value: string;
};
