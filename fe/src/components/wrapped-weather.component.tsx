import { useLocation } from "react-router-dom"
import Weather from "./weather.component"

/* https://github.com/remix-run/react-router/issues/8146 */
export default function WrappedWeatherComponent(props: any) {
    const location = useLocation();
  
    return <Weather location={location} {...props} />
};
