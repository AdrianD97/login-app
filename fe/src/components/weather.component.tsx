import { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import weatherService from "../services/weather.service";

type Props = {
	location: { state: { latitude: number; longitude: number; } } | undefined;
};

type State = {
  	isLoggedIn: boolean;
    data: {
        latitude: number;
        longitude: number;
        generationtime_ms: number;
        utc_offset_seconds: number;
        timezone: string;
        timezone_abbreviation: string;
        elevation: number;
    }
    message?: string;
	location?: {
		latitude: number;
		longitude: number;
	};
};

export default class Weather extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoggedIn: false,
            data: {
                latitude: 0,
                longitude: 0,
                generationtime_ms: 0,
                utc_offset_seconds: 0,
                timezone: "",
                timezone_abbreviation: "",
                elevation: 0
            },
            message: "",
			location: props.location?.state
		};
	}

	componentDidMount() {
        const isLoggedIn: boolean = authService.isLoggedIn();

		if (!isLoggedIn) {
			return;
		}

		const { latitude, longitude } = this.state.location || { latitude: 0, longitude: 0 };

		weatherService.get(latitude, longitude).then((data) => {
			this.setState({
				isLoggedIn,
				data,
				message: ""
			});
		}).catch((error) => {
			const resMessage = (error.response && error.response.data &&
				error.response.data.message) || error.message ||
				error.toString();

			this.setState({
				isLoggedIn,
				message: resMessage,
				data: {
                    latitude: 0,
                    longitude: 0,
                    generationtime_ms: 0,
                    utc_offset_seconds: 0,
                    timezone: "",
                    timezone_abbreviation: "",
                    elevation: 0
                }
			});
		});
	}

	logout() {
		authService.logout();
	}

	render() {
		const { isLoggedIn, data, message } = this.state;

		return (
			<div>
				{ isLoggedIn && !message && (
					<div className="container">
						<header className="jumbotron">
							<Link to={'/login'} onClick={this.logout}>Logout</Link>{" "}
							<Link to={'/'}>Home</Link>{" "}
                            <Link to={'/weather'}>Weather</Link>
						</header>

						<div>
                            <p>
								<strong>latitude:</strong>{" "}
								{data.latitude}
							</p>
                            <p>
								<strong>longitude:</strong>{" "}
								{data.longitude}
							</p>
                            <p>
								<strong>generationtime_ms:</strong>{" "}
								{data.generationtime_ms}
							</p>
                            <p>
								<strong>utc_offset_seconds:</strong>{" "}
								{data.utc_offset_seconds}
							</p>
                            <p>
								<strong>timezone:</strong>{" "}
								{data.timezone}
							</p>
                            <p>
								<strong>timezone_abbreviation:</strong>{" "}
								{data.timezone_abbreviation}
							</p>
                            <p>
								<strong>elevation:</strong>{" "}
								{data.elevation}
							</p>
						</div>
					</div>
					)
                }

                { isLoggedIn && message && (
					<div className="form-group">
						<div className="alert alert-danger" role="alert">
							{message}
						</div>
					</div>
				)}

                { !isLoggedIn && (
					<div className="container">
						<header className="jumbotron">
							<Link to={'/login'}>Login</Link>
						</header>
					</div>
				)}
			</div>
		);
	}
};

