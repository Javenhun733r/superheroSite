import SuperheroController from "./superheroController.js";
import {superheroService} from "../services/index.js";
const superheroController = new SuperheroController(superheroService);
export { superheroController };