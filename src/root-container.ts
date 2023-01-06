import "reflect-metadata";
import { dataContainerModule } from "@data/data-container-module";
import { Container } from "inversify";

let rootContainer = new Container();

rootContainer.load(dataContainerModule);

export { rootContainer };
