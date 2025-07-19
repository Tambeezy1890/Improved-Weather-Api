
import Time from './Time.jsx'

function DisplayCard({ data }) {
  if (!data || !data.weather || !data.main) return null;

  return (
    <div className="card-details">
      <h2>{data.name}</h2>
      <p><strong>Temperature:</strong> {data.main.temp} °C</p>
      <p><strong>Feels like:</strong> {data.main.feels_like} °C</p>
      <p><strong>Weather:</strong> {data.weather[0].description}</p>
      <p><strong>Humidity:</strong> {data.main.humidity}%</p>
      <Time timezone={data.timezone} />
    </div>
  );
}

export default DisplayCard;
