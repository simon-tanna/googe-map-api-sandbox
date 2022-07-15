import { useState, useMemo, useCallback, useRef } from "react";
import {
	GoogleMap,
	Marker,
	DirectionsRenderer,
	Circle,
	MarkerClusterer,
} from "@react-google-maps/api";
import "./Map.css";
import Places from "./Places";

function Map() {
	const center = useMemo(() => ({ lat: -27.4705, lng: 153.026 }), []);
	const options = useMemo(
		() => ({
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[]
	);
	const mapRef = useRef(GoogleMap);
	const onLoad = useCallback((map) => (mapRef.current = map), []);
	const [place, setPlace] = useState(center);

	return (
		<div className="container">
			<div className="controls">
				<h1>Beer?</h1>
				<Places
					setPlace={(position) => {
						setPlace(position);
						mapRef.current?.panTo(position);
					}}
				/>
			</div>
			<div className="map">
				<GoogleMap
					zoom={12}
					center={center}
					mapContainerClassName="map-container"
					options={options}
					onLoad={onLoad}
				>
					{place && <Marker position={place} />}
				</GoogleMap>
			</div>
		</div>
	);
}

export default Map;
