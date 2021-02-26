const App = Vue.createApp({}); // Create Vue instance with default config

const Content = {
    data() {
        return {
            // The list containing the page' threads
            threadList: [
                { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
                // { id : 1, title : "niigiaignanuyf", username : "Anonymous", content : "kek"},
                // { id : 2, title : "based department calls", username : "Anonymous", content : "freetards seething over this"},
                // { id : 3, title : "really", username : "Anonymous", content : ">gnome"},
                // { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
                // { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
                // { id : 0, title : "hahahihi", username : "Anonymous", content : "discuss"},
                // { id : 1, title : "niigiaignanuyf", username : "Anonymous", content : "kek"},
                // { id : 2, title : "based department calls", username : "Anonymous", content : "freetards seething over this"},
                // { id : 3, title : "really", username : "Anonymous", content : ">gnome"},
                // { id : 1, title : "niigiaignanuyf", username : "Anonymous", content : "kek"},
                // { id : 2, title : "based department calls", username : "Anonymous", content : "freetards seething over this"},
                // { id : 3, title : "really", username : "Anonymous", content : ">gnome"},
                // { id : 1, title : "niigiaignanuyf", username : "Anonymous", content : "kek"},
                // { id : 2, title : "based department calls", username : "Anonymous", content : "freetards seething over this"},
                // { id : 3, title : "really", username : "Anonymous", content : ">gnome"},
            ] ,
        }
    }
};

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

// YOU HAVE TO MOUNT IT AND SAVE THE REFERENCE TO IT TOO
let mainContent = content.mount(".content");

const Header = {
    // The bindings for the header
    data() {
        return {
            header_board_name : "/g/ - Technology",
            header_img_src : "../images/header/header.jpg",
            header_start_thread_text : "Start a New Thread",
            header_ad_img_src : "../images/header/header_cat.jpg",

            // Thread options
            isNewThreadButtonClicked: false,
            new_thread_options_name_title : "Name",
            new_thread_options_name_input_placeholder: "Anonymous",
            new_thread_options_subject_title: "Subject",
            new_thread_options_content_title: "Comment",
            new_thread_options_post_button_text: "Post",
            // v-model 2-way bindings
            new_thread_name_input_value: "Anonymous",
            new_thread_title_input_value: "",
            new_thread_content_input_value: "",
        }
    },

    // The entry point
    mounted() {
        console.log("Mounted");
    },

    methods: {
        showNewThreadOptions() {
            console.log("showing new thread options");
            this.isNewThreadButtonClicked = !this.isNewThreadButtonClicked;
        },

        postNewThread() {
            console.log(`post new thread by ${this.new_thread_name_input_value} with subject ${this.new_thread_title_input_value} and content: ${this.new_thread_content_input_value}`);

            // Add to the threadList
            mainContent.threadList.push({ id : 0, title: this.new_thread_title_input_value, username : this.new_thread_name_input_value, content : this.new_thread_content_input_value });

            console.table(mainContent.threadList);

            // Hide the thread options
            this.isNewThreadButtonClicked = false;

            // Reset the thread options
            this.new_thread_name_input_value = "Anonymous";
            this.new_thread_title_input_value = "";
            this.new_thread_content_input_value = "";
        }
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

// COMPONENTS //

// Thread Component

// content.component("thread_title",{
//     props: ["title", "username"],
//     template: `<span class="thread_title">
//                 <p id="title_text">{{ title }}</p>
//                 <p class="title_username">{{ username }}</p>
//               </span>`
// });

// INITIALIZE THE BINDINGS //

// Bind to the board header
Vue.createApp(Header).mount(".header");
Vue.createApp(Utilities).mount(".utilities");
