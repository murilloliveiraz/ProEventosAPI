import { Evento } from "./Evento";
import { Palestrante } from "./Palestrante";

export interface RedeSocial {
  id : Number;
  nome : string;
  URL : string;
  eventoId? : Number;
  evento : Evento;
  palestranteId? : Number;
  palestrante : Palestrante;
}
