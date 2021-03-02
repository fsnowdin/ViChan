export default class Board {
    name;
    topic;

    constructor(name, topic) {
        this.name = name;
        this.topic = topic;
    }

    static getBoardList() {
        return  [
            new Board("g", "Technology"),
            new Board("a", "Anime & Manga"),
            new Board("b", "Random"),
            new Board("r9k", "ROBOT9001"),
            new Board("v", "Video Games"),
        ];;
    }
}
