
import {Gnome} from "./Gnome";

export default class LevelProgress {

    private gnomes: Array<Gnome>;

    constructor(gnomes: Array<Gnome>) {
        this.gnomes = gnomes;
    }

    public isDay() {
        return this.countNudes() == this.gnomes.length;
    }

    private countNudes() {
        let countNude = 0;
        for (let i = 0; i < this.gnomes.length; i++) {
            if (this.gnomes[i].isNude()) {
                countNude++;
            }
        }

        return countNude;
    }
}
