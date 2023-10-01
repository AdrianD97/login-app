import { Component } from "react";
import User from "../types/user.type";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import userService from "../services/user.service";

type Props = {};

type State = {
	isLoggedIn?: boolean;
  	currentUser?: User;
	message?: string;
};

export default class Home extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			currentUser: undefined,
			message: ""
		};
	}

	componentDidMount() {
		const isLoggedIn: boolean = authService.isLoggedIn();

		if (!isLoggedIn) {
			return;
		}

		userService.getUserData().then((data) => {
			this.setState({
				isLoggedIn,
				currentUser: data,
				message: ""
			});
		}).catch((error) => {
			const resMessage = (error.response && error.response.data &&
				error.response.data.message) || error.message ||
				error.toString();

			this.setState({
				isLoggedIn,
				message: resMessage,
				currentUser: undefined
			});
		});
	}

	logout() {
		authService.logout();
	}

	render() {
		const { isLoggedIn, currentUser, message } = this.state;

		return (
			<div>
				{ isLoggedIn && currentUser && (
					<div className="container">
						<header className="jumbotron">
							<Link to={'/login'} onClick={this.logout}>Logout</Link>{" "}
							<Link to={'/'}>Home</Link>{" "}
							<Link to={'/weather'}
								state = {{
									latitude: currentUser.location.latitude,
									longitude: currentUser.location.longitude
								}
							}>Weather</Link>
						</header>

						<div>
							<p>
								<strong>First name:</strong>{" "}
								{currentUser.first_name}
							</p>
							<p>
								<strong>Last name:</strong>{" "}
								{currentUser.last_name}
							</p>
							<p>
								<strong>Username:</strong>{" "}
								{currentUser.username}
							</p>
							<p>
								<strong>Id:</strong>{" "}
								{currentUser.id}
							</p>
							<p>
								<strong>Email:</strong>{" "}
								{currentUser.email}
							</p>
							<p>
								<strong>Location:</strong>{" (lat: "}
								{currentUser.location.latitude}{", lng: "}
								{currentUser.location.longitude}{")"}
							</p>
						</div>
					</div>
				)}

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
