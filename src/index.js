const Header = {
    // The bindings for the header
    data() {
        return {
            header_board_name : "/g/ - Technology",
            header_img_src : "../images/header/header.jpg",
            header_start_thread_text : "Start a New Thread",
            header_ad_img_src : "../images/header/header_cat.jpg",
        }
    },

    // The entry point
    mounted() {
        console.log("Mounted");
    },

    change_board_name(name) {
        this.header_board_name = name;
    }
};

const Utilities = {
    data() {
        return {
            search_box_placeholder_text : "Search OPs",
            catalog_button_text : "Catalog",
            archive_button_text : "Archive"
        }
    }
}


const Content = {
    data() {
        return {
            // The list containing the page' threads
            threadList: [
                { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
                { id : 1, title : "niigiaignanuyf", username : "Anonymous", content : "kek"},
                { id : 2, title : "based department calls", username : "Anonymous", content : "freetards seething over this"},
                { id : 3, title : "really", username : "Anonymous", content : ">gnome"},
                { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
                { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
                { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
                { id : 1, title : "niigiaignanuyf", username : "Anonymous", content : "kek"},
                { id : 2, title : "based department calls", username : "Anonymous", content : "freetards seething over this"},
                { id : 3, title : "really", username : "Anonymous", content : ">gnome"},
                { id : 1, title : "niigiaignanuyf", username : "Anonymous", content : "kek"},
                { id : 2, title : "based department calls", username : "Anonymous", content : "freetards seething over this"},
                { id : 3, title : "really", username : "Anonymous", content : ">gnome"},
                { id : 1, title : "niigiaignanuyf", username : "Anonymous", content : "kek"},
                { id : 2, title : "based department calls", username : "Anonymous", content : "freetards seething over this"},
                { id : 3, title : "really", username : "Anonymous", content : ">gnome"},
            ]
        }
    }
}

// INITIALIZE THE BINDINGS //

// Bind to the board header
Vue.createApp(Header).mount(".header");
Vue.createApp(Utilities).mount(".utilities");

// COMPONENTS //
let content = Vue.createApp(Content);
content.component("thread", {
    props: ["title", "username", "content"],
    template: `<div class="thread">
                <span class="thread-title">
                  <p class="title-text">{{ title }}</p>
                  <p class="title-username">{{ username }}</p>
                </span>
                <p class="thread-content">{{ content }}</p>
              </div>`
});
content.mount(".content");

// content.component("thread_title",{
//     props: ["title", "username"],
//     template: `<span class="thread_title">
//                 <p id="title_text">{{ title }}</p>
//                 <p class="title_username">{{ username }}</p>
//               </span>`
// });
