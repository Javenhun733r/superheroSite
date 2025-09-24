import {superheroRepository} from "../repo/index.js";
import SuperheroService from "./superheroService.js";
const superheroService = new SuperheroService(superheroRepository);
export {superheroService};
