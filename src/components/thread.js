export default class Thread {
    id;
    title;
    username;
    content;
    board;
    replies;
    img_src;
    date;
    img_filename;

    constructor(id, title, username, content, img_src, date) {
        this.id = id;
        this.title = title;
        this.username = username;
        this.content = content;
        this.img_src = img_src;
        this.date = date;
    }
}
