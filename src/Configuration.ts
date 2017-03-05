/**
 * Global configuration for the game
 */
export default class Configuration {

    public debug() {
        return false;
    }

    public getGameWidth() {
        return 800;
    }

    public getGameHeight() {
        return 32 * 16;
    }

    public getSeaLevel() {
        return 450;
    }
}
