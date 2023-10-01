import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Home from "./components/home.component";
import WrappedWeatherComponent from "./components/wrapped-weather.component";

type Props = {};

type State = {};

export default class App extends Component<Props, State> {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/weather" element={<WrappedWeatherComponent />}/>
                <Route path="/login" element={<Login />} />
            </Routes>
        );
    }
};
