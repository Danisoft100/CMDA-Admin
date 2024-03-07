import api from "../api/api";
import errorMiddleware from "./errorMiddleware";

const combinedMiddlewares = [api.middleware, errorMiddleware];

export default combinedMiddlewares;
