import HeroSlider from "../heroslider/HeroSlider";
import { heroSlides } from "../../content/hero-slides";

export default function Banner() {
  return <HeroSlider slides={heroSlides} />;
}